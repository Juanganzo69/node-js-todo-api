const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, llenarTodo, users, llenarUsers } = require('./seed/seed'); 


beforeEach( llenarUsers );
beforeEach( llenarTodo );

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

describe('PATCH /todos/:id', () =>{
    it('Deberá actualizar el todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var texto = 'Algo nuevo';

        request(app)
        .patch(`/todos/${ hexId }`)
        .expect(200)
        .send({
            completado: true,
            texto
        })
        .expect( (res) => {
            expect(res.body.todo.texto).toBe(texto);
            expect(res.body.todo.completado).toBe(true);
            expect(res.body.todo.completadoAt).toBeA('number');
        })
        .end(done);
    });

    it('Deberá limpiar el completadoAt cuando completado sea falso', (done) => {
        var hexId = todos[1]._id.toHexString();
        var texto = 'Algo nuevo!!';

        request(app)
        .patch(`/todos/${ hexId }`)
        .expect(200)
        .send({
            completado: false,
            texto
        })
        .expect( (res) => {
            expect(res.body.todo.texto).toBe(texto);
            expect(res.body.todo.completado).toBe(false);
            expect(res.body.todo.completadoAt).toNotExist();
        })
        .end(done);
    });
}); 

describe('GET /users/me', () => {
    it('Deberá retornar el usuario si está autentificado', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect( (res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('Deberá retornar error 401 si no está autentificado', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect( (res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe('GET /users', () => {
    it('Deberá crear un usuario', (done) => {
        
        var email = 'ejemplo3@gmail.com';
        var password = 'avena123';

        request(app)
        .post('/users')
        .send({
            email,
            password
        })
        .expect(200)
        .expect( (res) => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
        .end( (err) => {
            if(err){
                return done(err);
            }

            User.findOne({email}).then( (user) => {
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
            });
        });
    });

    it('Deberá retornar un error de validación si el request es inválido', (done) => {

        request(app)
        .post('/users')
        .send({
            password: 'ejemplo4@gmail',
            email : 'avena123'
        })
        .expect(400)
        .end(done);
    });

    it('No deberá crear un usuario si el email existe', (done) => {
        request(app)
        .post('/users')
        .send({
            email: users[0].email,
            password: 'Watuza09'
        })
        .expect(400)
        .end(done);
    });
}); 