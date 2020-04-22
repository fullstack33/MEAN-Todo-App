const router = require("express").Router();
const Todo = require('../models/todosModel');
const verifyToken = require('../middleware/auth')

router
  .route("/gettodos/:userId")
  .get( async (req, res) => {
    const data = await Todo.find({userId: req.params.userId})
    return res.status(200).send(data);
  });

router
  .route( '/')
  .post((req, res) => {
    console.log(req.body)
    todo = new Todo({
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body,
        dateTime: new Date().toLocaleString()
    })
    todo.save()
    return res.status(200).json(todo)
  });

router
    .route('/:id')
    .get(async (req, res) => {
        let id = req.params.id;
        let singleData = await Todo.find({_id: id});
        return res.status(200).json(singleData)
    })
    .put(async (req, res)=> {
        // console.log(req.body)
        await Todo.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});

        return res.status(200).send({message: "Updated"})
    })
    .delete(async (req, res) => {
        const response = await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).send(response)
    })


module.exports = router;
