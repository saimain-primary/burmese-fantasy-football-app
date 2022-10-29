<template>
	<v-container class="mt-8">
		<v-card class="px-5 py-5">
			<p class="text-body-2 mb-3">Current Game Week</p>
			<v-select
				:items="gameWeekListForSelect"
				label="Game Week"
				item-title="name"
				item-value="week"
				variant="outlined"
				class="mb-2"
				v-model="currentFormData.gameWeek"
			></v-select>
			<div class="text-center">
				<v-btn color="primary" @click="onChangeCurrentGameWeekHandler">
					Change Game Week</v-btn
				>
			</div>
		</v-card>
		<v-card class="px-5 py-5">
			<p class="text-body-2 mb-3">Home Page Game Week</p>
			<v-select
				:items="gameWeekListForSelect"
				label="Game Week"
				item-title="name"
				item-value="week"
				variant="outlined"
				class="mb-2"
				v-model="currentFormData.homePageGameWeek"
			></v-select>
			<div class="text-center">
				<v-btn color="primary" @click="onChangeHomePageGameWeekHandler">
					Change Home Page</v-btn
				>
			</div>
		</v-card>
		<v-card class="px-5 py-5 mt-8">
			<p class="text-body-2 mb-3">Add Game Week</p>
			<v-text-field
				variant="outlined"
				v-model="formData.gameWeek"
				label="Game Week Number"
				color="primary"
				class="mb-2"
				type="text"
			>
			</v-text-field>
			<v-text-field
				variant="outlined"
				v-model="formData.startDate"
				label="Start Date"
				color="primary"
				class="mb-2"
				type="date"
			>
			</v-text-field>
			<v-text-field
				variant="outlined"
				v-model="formData.endDate"
				label="End Date"
				color="primary"
				class="mb-2"
				type="date"
			>
			</v-text-field>
			<div class="text-center">
				<v-btn color="primary" @click="onAddSubmitHandler">
					Submit Game Week</v-btn
				>
			</div>
		</v-card>
		<v-card class="px-5 py-5 mt-8">
			<p class="text-body-2 mb-3">Game Week List</p>
			<v-list lines="two">
				<v-list-item
					class="px-0"
					v-for="gameweek in gameWeekList"
					:key="gameweek._id"
					:title="gameweek.name"
					:subtitle="gameweek.startDate + ' to ' + gameweek.endDate"
				>
					<!-- <template v-slot:append>
            <v-btn
              color="red-lighten-1"
              icon="mdi-delete"
              variant="text"
            ></v-btn>
          </template> -->
				</v-list-item>
			</v-list>
		</v-card>
	</v-container>
	<BottomNavigation :value="page" />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import { mapGetters, mapActions } from "vuex";

export default {
	name: "Manage Game Week",
	components: { BottomNavigation },
	computed: {
		...mapGetters({
			gameWeekListForSelect: "gameweek/gameWeekListForSelect",
			currentGameWeek: "gameweek/currentGameWeek",
			homePageGameWeek: "gameweek/homePageGameWeek",
			gameWeekList: "gameweek/gameWeekList",
		}),
	},
	data: () => ({
		page: "profile",
		formData: {
			startDate: null,
			endDate: null,
			gameWeek: null,
		},
		currentFormData: {
			gameWeek: null,
			homePageGameWeek: null,
		},
	}),
	methods: {
		...mapActions({
			storeGameWeekAction: "gameweek/storeGameWeekAction",
			changeCurrentGameWeekAction: "gameweek/changeCurrentGameWeekAction",
			showDialogAction: "general/showDialogAction",
			getGameWeekAction: "gameweek/getGameWeekAction",
			changeHomePageGameWeekAction: "gameweek/changeHomePageGameWeekAction",
		}),
		async onChangeCurrentGameWeekHandler() {
			const response = await this.changeCurrentGameWeekAction(
				this.currentFormData
			);
			console.log(response);
			if (response.code !== 200) {
				this.showDialogAction({
					title: "Whoops!",
					body: response.message,
				});
			} else {
				await this.getGameWeekAction();
				if (this.currentGameWeek) {
					this.currentFormData.gameWeek = this.currentGameWeek.name;
				} else {
					this.currentFormData.gameWeek = null;
				}
				this.formData = {
					startDate: null,
					endDate: null,
					gameWeek: null,
				};
			}
		},
		async onChangeHomePageGameWeekHandler() {
			const response = await this.changeHomePageGameWeekAction(
				this.currentFormData
			);
			console.log(response);
			if (response.code !== 200) {
				this.showDialogAction({
					title: "Whoops!",
					body: response.message,
				});
			} else {
				await this.getGameWeekAction();
				if (this.currentGameWeek) {
					this.currentFormData.homePageGameWeek = this.homePageGameWeek.name;
				} else {
					this.currentFormData.homePageGameWeek = null;
				}
				this.formData = {
					startDate: null,
					endDate: null,
					gameWeek: null,
				};
			}
		},
		async onAddSubmitHandler() {
			const response = await this.storeGameWeekAction(this.formData);
			if (response.code !== 200) {
				this.showDialogAction({
					title: "Whoops!",
					body: response.message,
				});
			} else {
				await this.getGameWeekAction();
				if (this.currentGameWeek) {
					this.currentFormData.gameWeek = this.currentGameWeek.name;
				} else {
					this.currentFormData.gameWeek = null;
				}
				this.formData = {
					startDate: null,
					endDate: null,
					gameWeek: null,
				};
			}
		},
	},
	async mounted() {
		await this.getGameWeekAction();
		if (this.currentGameWeek) {
			this.currentFormData.gameWeek = this.currentGameWeek.name;
			this.currentFormData.homePageGameWeek = this.homePageGameWeek.name;
		} else {
			this.currentFormData.gameWeek = null;
		}
	},
};
</script>

<style></style>
