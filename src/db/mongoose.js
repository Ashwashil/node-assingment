// jshint esversion:6
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userData' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:','message:'));
db.once('open', function() {
        console.log("Database Connected Successfully");
});


