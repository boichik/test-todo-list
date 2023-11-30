import { HttpClient } from '@/api/httpClient';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const httpClient = new HttpClient();

export default new Vuex.Store({
	state: {
		todos: [],
		todo: null,
	},
	getters: {
		todos: state => state.todos,
		todo: state => state.todo,
	},
	mutations: {
		setTodos(state, payload) {
			state.todos = payload;
		},
		setTodo(state, payload) {
			state.todo = payload;
		},
	},
	actions: {
		async loadTodos({ commit }) {
			try {
				const resp = await httpClient.getTodos();

				commit('setTodos', resp.data.data);
			} catch (e) {
				this.$message({ message: e, type: 'danger' });
			}
		},

		async loadTodo({ commit }, id) {
			try {
				const resp = await httpClient.getTodo(id);

				commit('setTodo', resp.data.data);
			} catch (e) {
				this.$message({ message: e, type: 'danger' });
			}
		},

		async updateTodo({ commit }, { id, data }) {
			const resp = await httpClient.updateTodo(id, data);

			commit('setTodo', resp.data.data);
		},

		async createTodo({ commit }, data) {
			return await httpClient.createTodos(data);
		},

		async deleteTodo({ commit }, id) {
			await httpClient.deleteTodo(id);
		},
	},
});
