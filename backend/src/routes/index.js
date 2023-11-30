var express = require('express');
const {
	getTodos,
	createTodo,
	updateTodo,
	deleteTodo,
	getTodo,
} = require('../controllers/todo.controller');
router = express.Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodo);
router.post('/todos', createTodo);
router.patch('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;
8;
