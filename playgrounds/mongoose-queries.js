const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '595ef1441c6f9e1fd3ff13f4';
var userId = '595c4d089376811913a0e34d';
// if( !ObjectID.isValid(id) ){
//     console.log('El id no es válido');
// }
// Todo.find({
//     _id: id
// }).then( (todos) => {
//     console.log('Todos: ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then( (todo) => {
//     console.log('Todo: ', todo);
// });

// Todo.findById(id)
// .then( (todo) => {
//     if(!todo){
//         return console.log('No existe el id');
//     }
//     console.log('Todo: ', todo);
// }).catch( (e) => console.log(e));

User.findById(userId).then( (user) => {
    if(!user){
        return console.log('NO existe el usuario');
    }

    console.log('Usuario: ', user)
}).catch( (e) => console.log(e));