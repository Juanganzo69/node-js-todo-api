var { ObjectID } = require('mongodb');
var express = require('express');
var bodyParse = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParse.json());

app.post('/todos', ( req, res ) => {
    var todo = new Todo({
        texto: req.body.texto
    });

    todo.save().then( (doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', ( req, res ) => {
    Todo.find().then( (todos) =>  {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', ( req, res ) => {
    var id  = req.params.id;
    if( !ObjectID.isValid(id) ){
        return res.status(404).send();
    }

    Todo.findById(id).then( (todo) => {
        if( !todo ){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch( (e) => res.status(400).send());

});

app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
});

module.exports = { app };