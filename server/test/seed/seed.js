const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

var userId = new ObjectID();
var userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    texto : "Ejemplo 1",
    _creator : userId
},{
    _id: new ObjectID(),   
    texto : "Ejemplo 2",
    completado : true,
    completadoAt: 333,
    _creator : userTwoId
}];

const users = [{
    _id: userId,
    email:'juan1910@live.com.mx',
    password: 'Watusi06',
    tokens:[{
        access: 'auth',
        token: jwt.sign({ _id: userId, access: 'auth' }, '123abc').toString()
    }]
}, {
    _id: userTwoId,
    email: 'ejemplo@live.com',
    password:'yselacreyo',
    tokens:[{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, '123abc').toString()
    }]
}];

const llenarTodo = (done) => {
    Todo.remove({}).then( () => {
        Todo.insertMany(todos).then( () => done());
    });
};

const llenarUsers = ( done ) => {
    User.remove({}).then( () => {
        var userUno = new User(users[0]).save();
        var userDos = new User(users[1]).save();

        return Promise.all([userUno, userDos]);
    }).then( () => done());
};


module.exports = { todos, llenarTodo, users, llenarUsers };