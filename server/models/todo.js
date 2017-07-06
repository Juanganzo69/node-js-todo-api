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
    } 
});

module.exports = { Todo };