const Todo = require('../model/todo');

exports.getTodos = async (req, res) => {
	try {
		const resp = await Todo.find();

		res.status(200).send({
			data: resp,
		});
	} catch (e) {
		res.status(500).send({
			error: 'server_error',
			details: e,
		});
	}
};

exports.getTodo = async (req, res) => {
	try {
		const data = await Todo.findById(req.params.id);

		if (!data) {
			res.status(404).send({
				error: 'todo_not_found',
			});
		} else {
			res.status(200).send({
				data,
			});
		}
	} catch (e) {
		res.status(500).send({
			error: 'server_error',
			details: e,
		});
	}
};

exports.createTodo = async (req, res) => {
	try {
		const { name, description } = req.body;

		const resp = await new Todo({
			name,
			description,
		}).save();

		res.status(201).send({ data: resp });
	} catch (e) {
		res.status(500).send({
			error: 'server_error',
			details: e,
		});
	}
};

exports.updateTodo = async (req, res) => {
	try {
		const { name, description } = req.body;

		const data = await Todo.findByIdAndUpdate(
			req.params.id,
			{ name, description },
			{ new: true }
		);

		if (!data) {
			res.status(404).send({
				error: 'todo_not_found',
			});
		} else {
			res.status(200).send({
				data,
			});
		}
	} catch (e) {
		res.status(500).send({
			error: 'server_error',
			details: e,
		});
	}
};

exports.deleteTodo = async (req, res) => {
	try {
		const data = await Todo.findByIdAndDelete(req.params.id);

		if (!data) {
			res.status(404).send({
				error: 'todo_not_found',
			});
		} else {
			res.status(200).send({
				success: true,
			});
		}
	} catch (e) {
		res.status(500).send({
			error: 'server_error',
			details: e,
		});
	}
};
