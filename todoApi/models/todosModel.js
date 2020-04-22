const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    dateTime: {
        type: String
    }
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;