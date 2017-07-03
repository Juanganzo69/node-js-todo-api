const { MongoClient, ObjectID } = require('mongodb');
//

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, db ) => {
    if( err ){
       return console.log('No se puede conectar a la base de datos');
    }
    console.log('Conectado a servidor de Mongodb');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completd: false
    // }, (err, result) => {
    //     if( err ){
    //         return console.log('No se puede insertar la nota');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     nombre: 'Juan de Dios',
    //     edad: 20,
    //     localidad: 'Mérida, Yucatán'
    // }, ( err, docs ) => {
    //     if( err ){
    //         return console.log('No se pudo gurdar la información');
    //     }
    //     //console.log(JSON.stringify(docs.ops, undefined, 2));
    //     console.log(docs.ops[0]._id.getTimestamp());
    // });

    db.close();
});