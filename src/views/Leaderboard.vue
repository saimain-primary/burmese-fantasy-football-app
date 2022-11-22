<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card class="text-white gd-bg">
					<div class="d-flex flex-no-wrap justify-space-between">
						<div>
							<v-card-title class="text-h6">{{
								currentFormData.league_name
							}}</v-card-title>
							<v-card-subtitle>{{
								selectedGameWeek.gameWeek
									? selectedGameWeek.gameWeek
									: fixtureGameWeek
							}}</v-card-subtitle>
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
											:items="leagues"
											model-value="1"
											item-title="name"
											item-value="league_id"
											label="League"
											variant="outlined"
											@update:modelValue="onLeagueChangeHandler"
											color="primary"
											class=""
											v-model="currentFormData.league_id"
										></v-select>
										<v-select
											v-if="leagueDetail"
											:items="leagueDetail"
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
							<v-img v-if="currentFormData" :src="getLeagueLogo()"></v-img>
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
								style="height: 120px"
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
									<div
										class="pa-1 bg-white rounded-lg d-inline-block elevation-1"
									>
										<v-avatar size="50" large class="rounded-circle">
											<v-img
												class="rounded-circle"
												:src="
													firstUserLeaderboard.user.profileImage
														? getProfileImage(firstUserLeaderboard.user)
														: getTeamLogo(
																firstUserLeaderboard.user.favoriteTeam
														  )
												"
												:lazy-src="logo"
											></v-img>
										</v-avatar>
									</div>
									<div class="ml-5">
										<p class="text-h6">{{ firstUserLeaderboard.user.name }}</p>
										<p class="text-subtitle-1 font-weight-medium">
											{{ firstUserLeaderboard.sum }} Points
										</p>
									</div>
								</div>
								<div class="">
									<v-btn
										@click="viewDetail(firstUserLeaderboard)"
										size="x-small"
										icon="mdi-arrow-right"
										color="white"
									></v-btn>
								</div>
							</div>
						</v-card>
						<v-card
							v-for="data in underFirstLeaderboard"
							:key="data._id"
							class="py-5 px-5 mb-3"
						>
							<div class="d-flex justify-space-between align-center">
								<div class="d-flex justify-start align-center">
									<div
										class="pa-1 bg-white rounded-lg d-inline-block elevation-1"
									>
										<v-avatar size="50" large class="rounded-circle">
											<v-img
												class="rounded-circle"
												:src="
													data.user.profileImage
														? getProfileImage(data.user)
														: getTeamLogo(data.user.favoriteTeam)
												"
												:lazy-src="logo"
											></v-img>
										</v-avatar>
									</div>
									<div class="ml-5">
										<p class="text-subtitle-1 font-weight-medium">
											{{ data.user.name }}
										</p>
										<p class="text-body-2 font-weight-medium">
											{{ data.sum }} Points
										</p>
									</div>
								</div>
								<div class="">
									<v-btn
										@click="viewDetail(data)"
										size="x-small"
										icon="mdi-arrow-right"
										color="white"
									></v-btn>
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
			leagues: "leagues",
			leagueDetail: "leagueDetail",
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
		currentFormData: {
			league_id: null,
			league_name: null,
			gameWeek: null,
			logo: null,
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
			getLeaguesAction: "getLeaguesAction",
			getLeagueDetailAction: "getLeagueDetailAction",
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
		async onLeagueChangeHandler() {
			await this.$store.commit("setLeagueDetail", null);
			const response = await this.getLeagueDetailAction(
				this.currentFormData.league_id
			);
			
			if (this.currentFormData.league_id === 1) {
				this.currentFormData.league_name = "World Cup";
			} else if (this.currentFormData.league_id === 39) {
				this.currentFormData.league_name = "Premier League";
			}
			this.currentFormData.gameWeek = "";
			console.log("rr", response);
		},
		async onChangeGameWeekHandler() {
			this.loading = true;

			this.showFilterDialog = false;

			const response = await this.getLeaderboardDataAction({
				league_id: this.currentFormData.league_id,
				fixture_week: this.currentFormData.gameWeek,
				leaderboard: true,
			});
			console.log('respones from changing gw', response);


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
		getLeagueLogo() {
			if (this.selectedGameWeek.league_id) {
				return `https://media.api-sports.io/football/leagues/${this.selectedGameWeek.league_id}.png`;
			} else {
				return `https://media.api-sports.io/football/leagues/${this.currentFormData.league_id}.png`;
			}
		},
	},
	async mounted() {
		this.loading = true;
		this.$gtag.event("leaderboard");

		if (!this.currentGameWeek) {
			await this.getGameWeekAction();
		}

		if (!this.leagues) {
			await this.getLeaguesAction();
		}

		const currentLeague = this.leagues.filter((league) => {
			return league.is_current === true;
		});

		console.log("leag", this.leagues);

		await this.getLeagueDetailAction(currentLeague[0].league_id);

		console.log("cl", currentLeague);
		this.currentFormData.league_name = currentLeague[0].name;
		this.currentFormData.league_id = currentLeague[0].league_id;
		this.currentFormData.logo = currentLeague[0].logo;
		this.currentFormData.gameWeek = this.currentGameWeek.week;

		console.log("cw", this.currentGameWeek);
		this.fixtureGameWeek = this.currentGameWeek.week;

		let get = "";
		let fixtureParams = {};

		if (this.selectedGameWeek.gameWeek) {
			console.log("select");
			fixtureParams = {
				fixture_week: this.selectedGameWeek.gameWeek,
				leaderboard: true,
			};
		} else {
			console.log('a',this.currentGameWeek)
			console.log("no select");
			fixtureParams = {
				league_id : this.currentGameWeek.league,
				fixture_week: this.currentGameWeek.week,
				leaderboard: true,
			};
			this.fixtureGameWeek = this.currentGameWeek.gameWeek;
		}
		console.log('fx',fixtureParams);

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

		console.log("leaderboard res", response);

		this.loading = false;
	},
};
</script>
