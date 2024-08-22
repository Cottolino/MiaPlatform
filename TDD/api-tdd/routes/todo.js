var express = require('express');
var router = express.Router();

const todos = [{id: 1, name: 'Giuseppe', completed: false}, {id: 2, name: 'Giovanni', completed: true}];

// todos/

router.get('/', function(req, res, next) {
  res.json(todos);
});

router.get('/:id', function(req, res, next) {
    const foundTodo = todos.find(todo => todo.id === Number(req.params.id));

    if(!foundTodo) {
        return res.status(404).json({error: 'todo not found'});
    }
    res.json(foundTodo);
});

router.post('/', function(req, res, next) {
    const {body} = req;
    if(typeof body.name !== 'string') {
        return res.status(422).json({error: 'name is required'});
    }
    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});



module.exports = router;
