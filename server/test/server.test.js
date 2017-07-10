const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    texto : "Ejemplo 1"
},{
    _id: new ObjectID(),   
    texto : "Ejemplo 2"
}];

beforeEach( (done) => {
    Todo.remove({}).then( () => {
        Todo.insertMany(todos).then( () => done());
    });
});

describe('POST /todo', () => {
    it('Deberá crear un nuevo todo', (done) => {
        var texto = 'Limpiar mi cuarto';

        request(app)
            .post('/todos')
            .send({
                texto
            })
            .expect(200)
            .expect( (res) => {
                expect(res.body.texto).toBe(texto);
            })
            .end((err, res) => {
                if( err ){
                    return done(err);
                }

                Todo.find({texto}).then( (todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].texto).toBe(texto);
                    done();
                }).catch( (e) => done(e));
            });
    });

    it('Deberá verificar si los datos de entrada son válidos', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end(( err, res ) => {
                if(err){
                    return done(err);
                }

                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch( (e) => done(e) );
            });
    });
});

describe('GET /todos', () => {
    it('Deberá obtener todos los todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect( (res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Deberá retornar un todo', (done) => {
        request(app)
            .get(`/todos/${ todos[0]._id.toHexString() }`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.texto).toBe(todos[0].texto);
            })
            .end(done);
    });

    it('Deberá retornar error 404 si no existe el todo', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
        .get(`/todos/${ hexId }`)
        .expect(404)
        .end(done);
    });

    it('Deberá marcar error si el objectId es inválido', (done) => {
        request(app)
        .get('/todos/23dfs')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id' ,() => {
    it('Deberá borrar un todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${ hexId }`)
        .expect(200)
        .expect( (res) => {
           expect(res.body.todo._id).toBe(hexId);     
        })
        .end( (err, res) => {
            if(res){
                return done(err);
            }

            Todo.findById(hexId).then( (todo) => {
                expect(todo).toNotExist();
                done();
            }).catch( (e) => done(e));
        });
    });

    it('Deberá retornar error 404 si no existe el todo', (done) => {
        var hexId = new ObjectID().toHexString();

            request(app)
            .delete(`/todos/${ hexId }`)
            .expect(404)
            .end(done);
    });

    it('Deberá marcar error si el objectId es inválido', (done) => {
        request(app)
        .delete('/todos/23dfs')
        .expect(404)
        .end(done);
    });
}); 