<template>
	<v-snackbar color="primary" v-model="snackbar.show">
		{{ snackbar.text }}

		<template v-slot:actions>
			<v-btn
				v-if="snackbar.close"
				color="white"
				variant="text"
				@click="toggleSnackBarAction({ show: false })"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters({
			snackbar: "general/snackBar",
		}),
	},
	methods: {
		...mapActions({
			toggleSnackBarAction: "general/toggleSnackBarAction",
		}),
	},
};
</script>

<style>
</style>