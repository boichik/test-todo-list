import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoList from '../views/HomeView.vue';
import TodoOverview from '../views/Overview.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'todo',
		component: TodoList,
	},
	{
		path: '/:id',
		name: 'todo-overview',
		component: TodoOverview,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
