const { MongoClient, ObjectID } = require('mongodb');
//

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, db ) => {
    if( err ){
       return console.log('No se puede conectar a la base de datos');
    }
    console.log('Conectado a servidor de Mongodb');

    // db.collection('Todos').findOneAndUpdate(
    // {
    //     _id: new ObjectID('595ac500a8cdcbb3c9476b62')
    // },
    // {
    //     $set: {
    //         completed: true
    //     }
    // },
    // {
    //     returnOriginal: false
    // }).then( (res) =>{
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate(
    {
        _id : new ObjectID('5959d18af302770b7cee13bf')
    },
    {
        $set: {
            nombre: 'Juan de Dios'
        },
        $inc : {
            edad : 1
        }
    },
    {
        returnOriginal : false
    }).then( (res) =>{
        console.log(res.value);
    });
    //db.close();
});