var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	creared: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Todo', todoSchema);
