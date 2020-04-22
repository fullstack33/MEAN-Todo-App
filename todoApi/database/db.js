const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/AngularTodosApp";
// const url = "mongodb://angular:angular123@ds145220.mlab.com:45220/angular-todo-api"

const db = () => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Database Connected ...!!!"))
    .catch(err => console.log("Error Occure", err))
}

module.exports = db;
