var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    texto: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    completadoAt: {
        type: Number,
        default : null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        
    } 
});

module.exports = { Todo };