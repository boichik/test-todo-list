import axios from 'axios';

const baseInstance = axios.create({
	baseURL: '/api',
});

export class HttpClient {
	_client;

	constructor() {
		this._client = baseInstance;
	}

	async getTodos() {
		return await this._client.get('/todos');
	}

	async getTodo(id) {
		return await this._client.get(`/todos/${id}`);
	}

	async createTodos(data) {
		return await this._client.post('/todos', data);
	}

	async updateTodo(id, data) {
		return await this._client.patch(`/todos/${id}`, data);
	}

	async deleteTodo(id) {
		return await this._client.delete(`/todos/${id}`);
	}
}
