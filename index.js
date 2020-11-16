// jshint esversion:6
require('./src/db/mongoose');
const User = require("./src/db/models");
const nodemailer = require('nodemailer');
const log4js = require('log4js');
const { request } = require('express');
const chalk = require('chalk');


log4js.configure({
  appenders: { log : { type: "file", filename: "logFile.json" } },
  categories: { default: { appenders: ["log"], level: "error" } }
});
 
const logger = log4js.getLogger("log");
logger.level = 'debug';

const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:"please add sender email address here",
        pass:"******"
    }
});



const user = new User({
    firstName:"asdkfj",
    lastName:"ssdfasf",
    email:"ash@gmail.com",
    password:"sdsfdgfdgsfs"
});



User.findOne({email : user.email},(error,foundMail) => {      
        if(!error){
            if(!foundMail){

                user.save().then( () => {
                    
                    logger.debug("User is signed up");

                    const mailOptions = {
                        from : "please add sender email address here",
                        to: user.email,
                        subject : "test for nodejs project",
                        text: "Welcome to our Organisation you are successfully registered"
                    };

                    transpoter.sendMail(mailOptions, (error, info) => {
                        if(!error) {
                           console.log(chalk.greenBright("Mail Send Successfully to:",chalk.yellow(user.email) + " " + info.response));
                           logger.debug("Welcome Mail Send Successfully to", user.email +" "+ info.response);
                        }else{
                            console.log(chalk.red("Mail was not send to: "), user.email +" " + error);
                            logger.error("Mail was not send to: ",user.email+" "+error.response);
                        }
                    });

                }).catch( (e) => {

                    if(e.errors.firstName){
                        console.log(chalk.red(e.errors.firstName.properties.message));
                        return logger.error(e.errors.firstName.properties.message);
                    }else if(e.errors.lastName){
                        console.log(chalk.red(e.errors.lastName.properties.message));
                        return logger.error(e.errors.lastName.properties.message);
                    }else if(e.errors.email){
                        console.log(chalk.red(e.errors.email.properties.message));
                        return logger.error(e.errors.email.properties.message);
                    }else{
                        console.log(chalk.red(e.errors.password.properties.message));
                        return logger.error(e.errors.password.properties.message);
                           
                    }
                    
                });

            }else{  

                logger.debug("User Exist");
                console.log(chalk.yellow("User exist"));

            }
         }

});

