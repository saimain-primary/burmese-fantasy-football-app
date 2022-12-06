<template>
	<v-container class="pb-0">
		<v-row>
			<v-col>
				<template v-if="loading">
					<div class="loading-skeleton">
						<v-card
							elevation="0"
							class="bg-grey-lighten-4 py-3 px-3"
							style="height: 135px"
						>
						</v-card>
					</div>
				</template>
				<v-card v-else class="text-white gd-bg">
					<div class="d-flex flex-no-wrap justify-start">
						<div
							class="
								pa-1
								ma-5
								mr-2
								bg-white
								rounded-lg
								d-inline-block
								elevation-1
							"
						>
							<v-avatar size="80" large class="rounded-circle">
								<v-img
									class="rounded-circle"
									:src="
										leaderboardDetail?.user.profileImage
											? getProfileImage(leaderboardDetail?.user)
											: getTeamLogo(leaderboardDetail?.user.favoriteTeam)
									"
									:lazy-src="logo"
								></v-img>
							</v-avatar>
						</div>
						<div>
							<v-card-title class="text-subtitle-1">{{
								leaderboardDetail?.user.name
							}}</v-card-title>
							<v-card-subtitle>{{
								leaderboardDetail?.user.region +
								" | " +
								leaderboardDetail?.user.favoriteTeam
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
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>

	<v-container class="mt-5">
		<div class="mt-3">
			<ins
			class="adsbygoogle"
			style="display: block"
			data-ad-client="ca-pub-5660029927918677"
				data-ad-slot="8433767094"
				data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
		</div>
	</v-container>

	<v-container>
		<v-row>
			<v-col>
				<template v-if="loading">
					<div class="loading-skeleton mb-3">
						<v-card
							elevation="0"
							class="bg-grey-lighten-4 px-3"
							style="height: 30px"
						>
						</v-card>
					</div>
				</template>
				<p v-else class="mb-3 font-weight-medium text-body-1">
					{{
						selectedGameWeek.gameWeek
							? selectedGameWeek.gameWeek
							: fixtureGameWeek
					}}
					Results
				</p>

				<div class="" style="overflow-y: scroll">
					<template v-if="loading">
						<div v-for="index in 2" :key="index" class="loading-skeleton mb-3">
							<v-card
								elevation="0"
								class="bg-grey-lighten-4 py-3 px-3"
								style="height: 300px"
							>
							</v-card>
						</div>
					</template>

					<div v-else class="d-flex flex-column">
						<div class="" v-if="leaderboardDetail?.results">
							<v-card
								v-for="(data, index) in leaderboardDetail?.results"
								:key="index"
								class="py-5 px-5 mb-5"
							>
								<div class="d-flex justify-center align-center">
									<p class="font-weight-bold text-body-2">
										{{
											moment(
												new Date(data.fixture.date),
												moment.ISO_8601
											).format("ddd D MMM YYYY h:mm A ")
										}}
									</p>
								</div>
								<v-divider class="my-3"></v-divider>
								<div
									class="
										d-flex
										text-center
										mt-5
										justify-space-between
										align-center
									"
								>
									<div
										class="d-flex flex-column justify-center align-center"
										style="width: 100px"
									>
										<v-avatar size="40" large rounded="0" class="">
											<v-img
												class=""
												:lazy-src="logo"
												:src="data.teams.home_team.logo"
											></v-img>
										</v-avatar>
										<p class="mt-3 text-caption font-weight-medium">
											{{ data.teams.home_team.name }}
										</p>
									</div>
									<div>
										<div
											class="d-flex justify-space-between align-center"
											style="width: 120px; margin: 0 auto"
										>
											<p
												class="px-4 text-primary py-1 rounded-lg text-h6"
												style="
													border: 1px;
													border-width: 2px;
													border-style: dashed;
												"
											>
												{{ data.results.home }}
											</p>
											<span class="mx-3 text-primary font-weight-medium"
												>-</span
											>
											<p
												class="text-primary px-4 py-1 rounded-lg text-h6"
												style="
													border: 1px;
													border-width: 2px;
													border-style: dashed;
												"
											>
												{{ data.results.away }}
											</p>
										</div>
										<p
											class="text-caption mt-2 text-success font-weight-medium"
										>
											{{ data.fixture.status.long }}
										</p>
									</div>
									<div
										class="d-flex flex-column justify-center align-center"
										style="width: 100px"
									>
										<v-avatar size="40" large rounded="0" class="">
											<v-img
												class=""
												:lazy-src="logo"
												:src="data.teams.away_team.logo"
											></v-img>
										</v-avatar>
										<p class="mt-3 text-caption font-weight-medium">
											{{ data.teams.away_team.name }}
										</p>
									</div>
								</div>
								<div class="mt-5">
									<div
										class="
											d-flex
											justify-space-between
											align-center
											text-body-2
											mb-3
										"
									>
										<p>Prediction</p>
										<p class="">
											<span
												v-if="data.predicts?.boosted"
												class="text-success text-uppercase font-weight-medium"
												style="font-size: 10px"
												>2x Boosted</span
											>
											{{ data.predicts?.home }} - {{ data.predicts?.away }}
										</p>
									</div>
									<div
										class="
											bg-grey-lighten-3
											px-3
											d-flex
											justify-center
											align-center
											mb-3
										"
									>
										<p class="text-overline">Points Breakdown</p>
									</div>
									<div
										v-for="(p, index) in data.points[0]"
										:key="index"
										class="
											d-flex
											justify-space-between
											align-center
											text-body-2
											mb-1
										"
									>
										<p>{{ snackToTitle(index) }}</p>
										<p class="">{{ p }} Points</p>
									</div>
								</div>
							</v-card>
						</div>
						<div
							v-else
							class="
								d-flex
								mt-16
								flex-column
								justify-space-between
								align-center
							"
						>
							<v-img class="" :src="nodata" width="100"></v-img>
							<p class="text-body-2 text-grey-darken-1 mt-3">
								<b>No data Available!</b>
							</p>
						</div>
					</div>
				</div>
			</v-col>
		</v-row>
	</v-container>

	<BottomNavigation :value="page" />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import nodata from "@/assets/no_data.svg";
import logo from "@/assets/logo.jpg";
import moment from "moment";
import "moment-timezone";
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Leaderboard Detail",
	props: ["id"],
	components: { BottomNavigation },
	computed: {
		...mapGetters({
			gameWeekListForSelect: "gameweek/gameWeekListForSelect",
			currentGameWeek: "gameweek/currentGameWeek",
			gameWeekList: "gameweek/gameWeekList",
			selectedGameWeek: "fixture/selectedGameWeek",
			teams: "teams",
			leaderboardDetail: "leaderboardDetail",
			leagues: "leagues",
			leagueDetail: "leagueDetail",
		}),
	},
	data: () => ({
		loading: false,
		showFilterDialog: false,
		page: "leaderboard",
		nodata: nodata,
		logo: logo,
		currentFormData: {
			league_id: null,
			league_name: null,
			gameWeek: null,
			logo: null,
		},
		fixtureGameWeek: null,
		league: null,
	}),
	methods: {
		moment,
		...mapActions({
			getGameWeekAction: "gameweek/getGameWeekAction",
			storeSelectedGameWeekAction: "fixture/storeSelectedGameWeekAction",
			getTournamentIndexAction: "getTournamentIndexAction",
			setTeamsAction: "setTeamsAction",
			getLeaderboardDetailAction: "getLeaderboardDetailAction",
			getLeaguesAction: "getLeaguesAction",
			getLeagueDetailAction: "getLeagueDetailAction",
		}),
		getTeamLogo(name) {
			if (this.teams) {
				const team = this.teams.filter((t) => {
					return t.team.name === name;
				})[0];
				return team?.team.logo;
			} else {
				return null;
			}
		},
		getProfileImage(user) {
			return process.env.VUE_APP_API_DOMAIN + user.profileImage;
		},
		snackToTitle(str) {
			const a = str.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
				c ? c.toUpperCase() : " " + d.toUpperCase()
			);
			return a;
		},
		async onLeagueChangeHandler() {
			await this.$store.commit("setLeagueDetail", null);
			const response = await this.getLeagueDetailAction(
				this.currentFormData.league_id,
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

			const response = await this.getLeaderboardDetailAction({
				user_id: this.id,
				fixture_week: this.currentFormData.gameWeek,
				league_id: this.currentFormData.league_id,
				season: "2022",
			});

			if (response.code === 200) {
				this.fixtureGameWeek = this.currentFormData.gameWeek;
				this.storeSelectedGameWeekAction(this.currentFormData);
			} else {
				this.showDialogAction({
					title: "Whoops!",
					body: response.results.message,
				});
			}
			this.loading = false;
		},
		adsenseAddLoad() {
			let inlineScript = document.createElement("script");
			inlineScript.type = "text/javascript";
			inlineScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";
			document.getElementsByTagName("body")[0].appendChild(inlineScript);
		},
	},
	async mounted() {
		this.adsenseAddLoad();
		this.loading = true;
		console.log("aaa", this.id);
		this.$gtag.event("leaderboard detail");

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
			console.log("seleted");

			this.currentFormData.league_name = this.selectedGameWeek.league_name;
			this.currentFormData.league_id = this.selectedGameWeek.league_id;
			this.currentFormData.logo = this.selectedGameWeek.logo;
			fixtureParams = {
				fixture_week: this.selectedGameWeek.gameWeek,
				league_id: this.selectedGameWeek.league_id,
				season: "2022",
			};
		} else {
			console.log("no seleted");
			fixtureParams = {
				fixture_week: this.currentGameWeek.week,
				league_id: this.currentGameWeek.league,
				season: "2022",
			};
			this.fixtureGameWeek = this.currentGameWeek.week;
			this.league = this.currentGameWeek.league;
		}

		console.log("fixture", fixtureParams);

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

		const response = await this.getLeaderboardDetailAction({
			user_id: this.id,
			...fixtureParams,
		});

		this.loading = false;
	},
};
</script>
