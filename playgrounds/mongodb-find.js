const { MongoClient, ObjectID } = require('mongodb');
//

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, db ) => {
    if( err ){
       return console.log('No se puede conectar a la base de datos');
    }
    console.log('Conectado a servidor de Mongodb');

    // db.collection('Todos').find({_id: new ObjectID('59596c8bbdb8a1219bd81f7f')}).toArray().then( (docs) => {
    //     console.log('Datos:');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('No se puede recuperar la información', err);
    // });

    // db.collection('Todos').find().count().then( (count) => {
    //     console.log(`Numero de docs: ${ count }`);
    //     //console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('No se puede recuperar la información', err);
    // });

    db.collection('Users').find({nombre: 'Juan de Dios'}).toArray().then(( notas ) => {
        console.log(`Las notas de ${ notas[0].nombre } son: `);
        console.log(JSON.stringify(notas, undefined, 2));
    }).catch((err) => {
        console.log('No se puede conectar a la base de datos: ', err);
    })

    //db.close();
});