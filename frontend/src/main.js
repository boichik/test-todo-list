import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { size: 'mini' });
Vue.config.productionTip = false;
Vue.prototype.$message = Message;
new Vue({
	router,
	store,
	render: function (h) {
		return h(App);
	},
}).$mount('#app');
