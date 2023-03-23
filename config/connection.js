// imports mongoose
const mongoose = require('mongoose');

// creates connection to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// exports mongoose connection
module.exports = mongoose.connection;