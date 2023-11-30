<template>
	<ElDialog
		:title="title"
		:visible.sync="dialogVisible"
		:before-close="closeDialog">
		<slot />
	</ElDialog>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
			},
		},
		data() {
			return {
				dialogVisible: false,
			};
		},

		methods: {
			openDialog() {
				this.dialogVisible = true;
			},

			closeDialog(withConfirm) {
				if (withConfirm) {
					this.$confirm('Do you want close this form?')
						.then(() => {
							this.dialogVisible = false;
						})
						.catch(() => {});
				} else {
					this.dialogVisible = false;
				}
			},
		},
	};
</script>
