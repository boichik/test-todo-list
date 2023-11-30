const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
const app = express();
var apiRouter = require('./src/routes/index');
require('dotenv').config();

const port = process.env.APP_PORT || 3000;

process.on('uncaughtException', err => {
	console.error('Uncaught Exception:', err);
	process.exit(1);
});

app.use(cors({}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
console.log(process.env.DB_ADDRESS);
mongoose
	.connect(process.env.DB_ADDRESS, {
		useNewUrlParser: true,
		heartbeatFrequencyMS: 2000,
	})
	.then(res => {
		console.log('DB connected');
	})
	.catch(err => {
		console.error('DB error', err);
	});

app.use((err, req, res, next) => {
	res.status(500).send({
		message: 'server_error',
	});
});

app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`Server started! Port: ${port}`);
});
