<template>
	<div>
		<ElForm
			ref="form"
			v-loading="loading"
			:model="form"
			:rules="rules"
			@submit.native.prevent="onSubmit">
			<ElFormItem
				prop="name"
				label="Name">
				<ElInput
					v-model="form.name"
					placeholder="Pisi sisi"></ElInput>
			</ElFormItem>
			<ElFormItem
				prop="description"
				label="Description">
				<ElInput
					v-model="form.description"
					placeholder="This is pisia & sisia"></ElInput>
			</ElFormItem>
			<ElFormItem align="right">
				<ElButton
					type="default"
					@click="handleClose(false)"
					>Close</ElButton
				>
				<ElButton
					type="success"
					native-type="submit"
					>{{ isEditForm ? 'Save' : 'Create' }}</ElButton
				>
			</ElFormItem>
		</ElForm>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		created() {
			if (this.isEditForm) {
				this.initForm();
			}
		},

		props: {
			isEditForm: {
				type: Boolean,
				default: false,
			},

			dataForm: {
				type: Object,
				default: () => {},
			},
		},

		data() {
			return {
				loading: false,
				form: {
					name: '',
					description: '',
				},
				rules: {
					name: [
						{
							required: true,
							type: 'string',
							min: 3,
							max: 12,
							trigger: 'blur',
						},
					],
					description: [
						{
							required: false,
							type: 'string',
							min: 0,
							max: 100,
							trigger: 'blur',
						},
					],
				},
			};
		},

		methods: {
			...mapActions(['createTodo', 'updateTodo']),

			initForm() {
				const { name, description } = this.dataForm || {};

				this.form.name = name;
				this.form.description = description;
			},

			handleClose(success) {
				this.$emit('close', success);
			},

			clearForm() {
				this.form = {
					name: '',
					description: '',
				};
			},

			onSubmit() {
				this.$refs.form
					.validate()
					.then(async () => {
						const action = this.isEditForm ? 'updateTodo' : 'createTodo';
						this.loading = true;

						try {
							await this[action](
								this.isEditForm
									? { id: this.dataForm._id, data: this.form }
									: this.form
							);
							this.loading = false;
							this.clearForm();
							this.handleClose(true);
						} catch (e) {
							this.loading = false;
							this.$message({
								message: e,
								type: 'danger',
							});
						}
					})
					.catch(e => {
						return;
					});
			},
		},
	};
</script>
