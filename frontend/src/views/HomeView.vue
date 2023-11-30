<template>
	<div
		v-loading="loading"
		class="todo-list">
		<div class="todo-list__header">
			<h2>TODO list</h2>
			<ElButton
				type="success"
				@click="handleCreate"
				>Create new</ElButton
			>
		</div>
		<div
			v-if="!noData"
			class="todo-container">
			<ElCard
				v-for="(item, index) in todos"
				:key="index">
				<div
					class="todo-card__header"
					slot="header">
					<span class="text">{{ item.name }}</span>
					<ElButton
						type="primary"
						@click="handleGoItem(item._id)"
						>More</ElButton
					>
				</div>
				<div class="todo-card__info">
					{{ item.description || 'No Descriptions' }}
				</div>
			</ElCard>
		</div>
		<el-empty
			v-else
			description="No todos"></el-empty>
		<Dialog
			ref="dialog"
			title="Create new todo">
			<CreateForm @close="handleClose" />
		</Dialog>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import CreateForm from './Form.vue';
	import Dialog from '@/components/Dialog.vue';
	export default {
		components: { CreateForm, Dialog },

		async created() {
			await this.fetchData();
		},

		data() {
			return {
				loading: false,
			};
		},

		computed: {
			...mapGetters(['todos']),

			noData() {
				return !this.todos || !this.todos.length;
			},
		},

		methods: {
			...mapActions(['loadTodos']),

			async fetchData() {
				this.loading = true;
				try {
					await this.loadTodos();
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},

			handleGoItem(id) {
				this.$router.push({ name: 'todo-overview', params: { id } });
			},

			handleCreate() {
				this.$refs.dialog.openDialog();
			},

			async handleClose(created) {
				this.$refs.dialog.closeDialog();

				if (created) {
					this.$message({
						message: 'Todo created',
						type: 'success',
					});
					await this.fetchData();
				}
			},
		},
	};
</script>
<style lang="scss">
	.todo-list {
		display: flex;
		flex-direction: column;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 5px;
			border-bottom: 1px solid gray;
		}
	}

	.todo-container {
		margin-top: 25px;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 5px;
	}

	.todo-card__header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.text {
			font-size: 18px;
			font-weight: 600;
		}
	}
</style>
