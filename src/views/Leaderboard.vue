<template>
	<div class="d-flex mt-16 flex-column justify-space-between align-center">
		<v-img class="" :src="maintain" width="300"></v-img>
		<p class="text-body-2 text-center text-grey-darken-1 mt-10">
			<b>Sorry! This page is under maintenance. <br/> Please, check back tomorrow</b>
		</p>
		<v-btn class="mt-10" to="/tournament" size="small" color="primary">
			Predict for World Cup
		</v-btn>
	</div>
	<BottomNavigation />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import nodata from "@/assets/no_data.svg";
import logo from "@/assets/logo.jpg";
import maintain from "@/assets/maintain.svg";

import { mapGetters, mapActions } from "vuex";
export default {
	name: "Leaderboard",
	components: { BottomNavigation },
	computed: {
		...mapGetters({
			gameWeekListForSelect: "gameweek/gameWeekListForSelect",
			currentGameWeek: "gameweek/currentGameWeek",
			gameWeekList: "gameweek/gameWeekList",
			selectedGameWeek: "fixture/selectedGameWeek",
			leaderboardData: "leaderboardData",
			teams: "teams",
			authenticated: "auth/authenticated",
			user: "auth/user",
			favoriteTeam: "auth/favoriteTeam",
		}),
		firstUserLeaderboard() {
			if (this.leaderboardData) {
				return this.leaderboardData[0];
			} else {
				return null;
			}
		},
		underFirstLeaderboard() {
			if (this.leaderboardData) {
				return this.leaderboardData.slice(1);
			} else {
				return null;
			}
		},
	},
	data: () => ({
		loading: false,
		showFilterDialog: false,
		nodata: nodata,
		maintain: maintain,
		logo: logo,
		leagues: ["Premier League", "World Cup 2022"],
		currentFormData: {
			gameWeek: null,
		},
		fixtureGameWeek: null,
	}),
	methods: {
		...mapActions({
			getGameWeekAction: "gameweek/getGameWeekAction",
			storeSelectedGameWeekAction: "fixture/storeSelectedGameWeekAction",
			getTournamentIndexAction: "getTournamentIndexAction",
			setTeamsAction: "setTeamsAction",
			getLeaderboardDataAction: "getLeaderboardDataAction",
		}),
		getTeamLogo(name) {
			const team = this.teams.filter((t) => {
				return t.team.name === name;
			})[0];
			return team.team.logo;
		},
		getProfileImage(user) {
			return process.env.VUE_APP_API_DOMAIN + user.profileImage;
		},
		async onChangeGameWeekHandler() {
			this.loading = true;

			this.showFilterDialog = false;

			const response = await this.getLeaderboardDataAction({
				fixture_week: this.currentFormData.gameWeek,
				leaderboard: true,
			});

			if (response.code === 200) {
				this.storeSelectedGameWeekAction(this.currentFormData.gameWeek);
			} else {
				this.showDialogAction({
					title: "Whoops!",
					body: response.results.message,
				});
			}
			this.loading = false;
		},
		viewDetail(data) {
			this.$router.push({
				path: `/leaderboard/${data.user_id}`,
			});
			console.log("data", data);
		},
	},
	async mounted() {
		this.loading = true;
		this.$gtag.event("leaderboard");

		if (
			this.gameWeekList.length <= 0 &&
			!this.currentGameWeek &&
			this.gameWeekListForSelect.length <= 0
		) {
			await this.getGameWeekAction();
		}

		let get = "";
		let fixtureParams = {};

		if (this.selectedGameWeek) {
			fixtureParams = {
				fixture_week: this.selectedGameWeek,
				leaderboard: true,
			};
		} else {
			fixtureParams = {
				fixture_week: this.currentGameWeek.week,
				leaderboard: true,
			};
			this.fixtureGameWeek = this.currentGameWeek.week;
		}

		if (!this.teams) {
			get = "teams";
			const teamResponse = await this.getTournamentIndexAction({
				...fixtureParams,
				get,
			});
			if (teamResponse.code === 200) {
				if (teamResponse.results.teams) {
					this.setTeamsAction(teamResponse.results.teams);
				}
			}
		}

		const response = await this.getLeaderboardDataAction({
			...fixtureParams,
		});

		this.loading = false;
	},
};
</script>
