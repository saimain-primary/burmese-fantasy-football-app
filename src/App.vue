<template>
	<v-app>
		<v-dialog v-model="isLoading" persistent width="100">
			<v-card
				class="d-flex justify-center align-center"
				width="100"
				height="100"
			>
				<v-progress-circular
					:size="30"
					color="primary"
					indeterminate
				></v-progress-circular
			></v-card>
		</v-dialog>
		<TopBar :pageName="pageName" :back="this.$route.meta.back" />
		<v-main class="my-auto">
			<v-banner v-if="updateExists" style="background: #ff5252; color: #fff">
				<template v-slot:text>
					We have some updates for the App. Please click reload for the updates
					and new features.
				</template>

				<template v-slot:actions>
					<v-btn color="white" @click="refreshApp">Reload</v-btn>
				</template>
			</v-banner>
			<router-view />
		</v-main>
		<Dialog></Dialog>
	</v-app>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import Dialog from "./components/Dialog.vue";
import { mapActions, mapGetters } from "vuex";
import update from "./mixins/update";

export default {
	name: "App",
	components: { TopBar, Dialog },
	computed: {
		...mapGetters({
			isLoading: "isLoading",
		}),
	},
	data: () => ({
		pageName: "",
		back: "",
	}),
	mixins: [update],
	mounted() {
		// let Script = document.createElement("script");
		// Script.setAttribute(
		// 	"src",
		// 	"https://widgets.api-sports.io/2.0.3/widgets.js"
		// );
		// Script.setAttribute("type", "module");
		// document.head.appendChild(Script);

		console.log("update", update);
		console.log(process.env.NODE_ENV);
	},
	watch: {
		$route(to, from) {
			this.pageName = to.name;
		},
	},
	methods: {},
};
</script>
