<template>
	<div
		v-loading="loading"
		class="todo-overview">
		<el-breadcrumb
			separator="/"
			class="todo-overview__breadcrumb">
			<el-breadcrumb-item :to="{ path: '/' }">Todo list</el-breadcrumb-item>
			<el-breadcrumb-item>Overivew todo "{{ id }}"</el-breadcrumb-item>
		</el-breadcrumb>
		<el-empty
			v-if="!todo"
			description="No todo"></el-empty>
		<div
			v-else
			class="todo-overview__container">
			<ElDescriptions
				class="margin-top"
				title="Main Data"
				:column="1"
				border>
				<template slot="extra">
					<ElButton
						type="success"
						@click="handleEdit"
						>Edit</ElButton
					>
					<ElButton
						type="danger"
						@click="deleteThisTodo"
						>Delete</ElButton
					>
				</template>
				<ElDescriptionsItem>
					<template slot="label">
						<i class="el-icon-user"></i>
						Name
					</template>
					{{ todo.name }}
				</ElDescriptionsItem>
				<ElDescriptionsItem>
					<template slot="label">
						<i class="el-icon-mobile-phone"></i>
						Description
					</template>
					{{ todo.description || 'No description' }}
				</ElDescriptionsItem>
			</ElDescriptions>
		</div>
		<Dialog
			ref="dialog"
			title="Edit todo">
			<EditForm
				:data-form="todo"
				is-edit-form
				@close="handleClose"></EditForm>
		</Dialog>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import EditForm from './Form.vue';
	import Dialog from '../components/Dialog.vue';

	export default {
		components: { Dialog, EditForm, Dialog },
		async created() {
			await this.fetchTodo();
		},

		data() {
			return {
				loading: false,
			};
		},

		computed: {
			...mapGetters(['todo']),

			id() {
				return this.$route.params.id;
			},
		},

		methods: {
			...mapActions(['loadTodo', 'deleteTodo']),

			handleEdit() {
				this.$refs.dialog.openDialog();
			},

			handleClose(updated) {
				this.$refs.dialog.closeDialog();

				if (updated) {
					this.$message({ message: 'Success updated', type: 'success' });
				}
			},

			async fetchTodo() {
				this.loading = true;

				try {
					await this.loadTodo(this.id);
				} catch (e) {
					this.loading = false;
				} finally {
					this.loading = false;
				}
			},

			async deleteThisTodo() {
				this.loading = true;

				try {
					await this.deleteTodo(this.id);

					this.$message({ message: 'Success delete', type: 'success' });
					this.$router.push({ name: 'todo' });
				} catch (e) {
					this.loading = false;
					this.$message({ message: e, type: 'danger' });
				}
			},
		},
	};
</script>
<style lang="scss">
	.todo-overview__breadcrumb {
		margin: 30px 0;
	}
</style>
