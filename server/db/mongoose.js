var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI, { useMongoClient: true });
// mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });



module.exports = { mongoose };