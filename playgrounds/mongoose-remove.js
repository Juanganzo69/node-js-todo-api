const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then( (res) => {
//     console.log(res);
// });

Todo.findOneAndRemove({_id: '5963dfa9c8e52d3239a9871b'}).then( (todo) => {
       console.log(todo);
 });
 
// Todo.findByIdAndRemove('5963dfa9c8e52d3239a9871b').then( (todo) => {
//     console.log(todo);
// });