const { MongoClient, ObjectID } = require('mongodb');
//

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, db ) => {
    if( err ){
       return console.log('No se puede conectar a la base de datos');
    }
    console.log('Conectado a servidor de Mongodb');

    // DeleteMany
    // db.collection('Todos').deleteMany({ text: 'Comer el luch' }).then( (result) =>{
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text : 'Comer el lunch'}).then( (res) => {
    //     console.log(res);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ completed: false }).then(( res ) => {
    //     console.log(res);
    // });

    // db.collection('Users').deleteMany({nombre: 'Juan de Dios'}).then( (res) => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndDelete({_id : new ObjectID('5959d180f302770b7cee13b5')}).then((res) => {
        console.log(res);
    });
    //db.close();
});