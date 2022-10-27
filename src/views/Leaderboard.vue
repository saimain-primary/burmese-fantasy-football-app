<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card color="primary">
					<div class="d-flex flex-no-wrap justify-space-between">
						<div>
							<v-card-title class="text-h6">Premier League </v-card-title>
							<v-card-subtitle
								>Game Week
								{{
									selectedGameWeek ? selectedGameWeek : fixtureGameWeek
								}}</v-card-subtitle
							>
							<!-- <v-card-subtitle>October 2022</v-card-subtitle> -->
							<v-card-actions>
								<v-dialog v-model="showFilterDialog">
									<template v-slot:activator="{ props }">
										<v-btn
											class="bg-white text-primary ml-2"
											size="small"
											v-bind="props"
											prepend-icon="mdi-tune-vertical"
											variant="text"
										>
											Change Game Week
										</v-btn>
									</template>

									<v-card class="pt-10 pb-5 px-5">
										<v-select
											disabled
											:items="leagues"
											model-value="Premier League"
											label="League"
											variant="outlined"
											color="primary"
											class=""
										></v-select>
										<v-select
											:items="gameWeekListForSelect"
											item-title="name"
											item-value="week"
											v-model="currentFormData.gameWeek"
											label="Game Week"
											variant="outlined"
											color="primary"
											class=""
										></v-select>
										<v-btn @click="onChangeGameWeekHandler" color="primary"
											>Change</v-btn
										>
									</v-card>
								</v-dialog>
							</v-card-actions>
						</div>

						<v-avatar class="ma-3" size="100" rounded="0">
							<v-img
								src="https://media.api-sports.io/football/leagues/39.png"
							></v-img>
						</v-avatar>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>

	<v-container>
		<v-row>
			<v-col>
				<p class="mb-3 font-weight-medium text-body-1">Top Predictors</p>

				<div
					v-if="!loading && leaderboardData && leaderboardData.length <= 0"
					class="d-flex mt-16 flex-column justify-space-between align-center"
				>
					<v-img class="" :src="nodata" width="100"></v-img>
					<p class="text-body-2 text-grey-darken-1 mt-3">
						<b>No data Available!</b>
					</p>
				</div>

				<div v-else>
					<template v-if="loading">
						<div v-for="index in 5" :key="index" class="loading-skeleton mb-3">
							<v-card
								elevation="0"
								class="bg-grey-lighten-4 py-3 px-3"
								style="height: 100px"
							>
							</v-card>
						</div>
					</template>
					<template v-else>
						<v-card
							v-if="firstUserLeaderboard"
							class="py-5 px-5 mb-3 gameweek-deadline-card"
						>
							<div class="d-flex justify-space-between align-center">
								<div class="d-flex justify-start align-center">
									<div class="pa-1 bg-white rounded-lg d-inline-block">
										<v-avatar size="50" large class="rounded-circle">
											<v-img
												class="rounded-circle"
												:src="
													firstUserLeaderboard.user.favoriteTeam
														? getTeamLogo(
																firstUserLeaderboard.user.favoriteTeam
														  )
														: logo
												"
												:lazy-src="logo"
											></v-img>
										</v-avatar>
									</div>
									<div class="ml-5">
										<p class="text-h6">{{ firstUserLeaderboard.user.name }}</p>
										<p class="text-subtitle-1">
											{{ firstUserLeaderboard.sum }} Points
										</p>
									</div>
								</div>
								<div class="">
									<!-- <v-btn
										size="x-small"
										icon="mdi-arrow-right"
										color="white"
									></v-btn> -->
								</div>
							</div>
						</v-card>
						<v-card
							v-for="data in underFirstLeaderboard"
							:key="data._id"
							class="py-5 px-5 mb-3 gameweek-deadline-card"
						>
							<div class="d-flex justify-space-between align-center">
								<div class="d-flex justify-start align-center">
									<div class="pa-1 bg-white rounded-lg d-inline-block">
										<v-avatar size="50" large class="rounded-circle">
											<v-img
												class="rounded-circle"
												:src="
													data.user.favoriteTeam
														? getTeamLogo(data.user.favoriteTeam)
														: logo
												"
												:lazy-src="logo"
											></v-img>
										</v-avatar>
									</div>
									<div class="ml-5">
										<p class="text-h6">{{ data.user.name }}</p>
										<p class="text-subtitle-1">{{ data.sum }} Points</p>
									</div>
								</div>
								<div class="">
									<!-- <v-btn
										size="x-small"
										icon="mdi-arrow-right"
										color="white"
									></v-btn> -->
								</div>
							</div>
						</v-card>
					</template>
				</div>
			</v-col>
		</v-row>
	</v-container>

	<BottomNavigation />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import nodata from "@/assets/no_data.svg";
import logo from "@/assets/logo.jpg";

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
	},
	async mounted() {
		this.loading = true;
		this.$gtag.event("leaderboard");

		await this.getGameWeekAction();

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
