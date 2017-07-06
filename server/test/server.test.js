const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

beforeEach( (done) => {
    Todo.remove({}).then( () => done());
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

                Todo.find().then( (todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch( (e) => done(e) );
            });
    });
});