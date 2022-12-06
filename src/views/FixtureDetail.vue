<template>
	<template v-if="loading">
		<v-card
			elevation="0"
			class="bg-grey-lighten-4 py-3 px-3"
			style="height: 200px"
		>
		</v-card>
		<v-card
			elevation="0"
			class="bg-grey-lighten-4 mt-5 py-3 px-3 mx-3"
			style="height: 160px"
		>
		</v-card>
		<v-card
			elevation="0"
			class="bg-grey-lighten-4 mt-3 py-3 px-3 mx-3"
			style="height: 100px"
		>
		</v-card>
		<v-card
			elevation="0"
			class="bg-grey-lighten-4 mt-3 py-3 px-3 mx-3"
			style="height: 200px"
		>
		</v-card>
	</template>
	<template v-else>
		<v-card elevation="0" class="mx-auto">
			<template v-if="fixtureDetail.fixtures">
				<v-card class="gameweek-deadline-card mx-3 mt-5 px-5 py-5">
					<p class="text-caption text-center">
						{{
							moment(
								new Date(fixtureDetail.fixtures[0].fixture.date),
								moment.ISO_8601
							).format("D MM YYYY , hh:mm A")
						}}
					</p>
					<div class="d-flex justify-space-between align-center">
						<div
							class="d-flex flex-column align-center justify-center"
							style="width: 100px"
						>
							<div class="pa-1 bg-white rounded-lg">
								<v-avatar size="50" rounded="0" large class="">
									<v-img
										lazy-src="../assets/logo.jpg"
										:src="fixtureDetail.fixtures[0].teams.home.logo"
									></v-img>
								</v-avatar>
							</div>
							<p class="text-subtitle-2 font-weight-medium mt-2 text-center">
								{{ fixtureDetail.fixtures[0].teams.home.name }}
							</p>
						</div>
						<div class="mx-3 text-center" style="width: 150px">
							<p class="text-h4 font-weight-medium">
								{{
									fixtureDetail.fixtures[0].goals.home
										? fixtureDetail.fixtures[0].goals.home
										: 0
								}}
								-
								{{
									fixtureDetail.fixtures[0].goals.away
										? fixtureDetail.fixtures[0].goals.away
										: 0
								}}
							</p>
							<p class="text-caption mt-1">
								{{ fixtureDetail.fixtures[0].fixture.status.long }}
							</p>
						</div>
						<div
							class="d-flex flex-column align-center justify-center"
							style="width: 100px"
						>
							<div class="pa-1 bg-white rounded-lg">
								<v-avatar size="50" rounded="0" large class="">
									<v-img
										lazy-src="../assets/logo.jpg"
										:src="fixtureDetail.fixtures[0].teams.away.logo"
									></v-img>
								</v-avatar>
							</div>
							<p class="text-subtitle-2 font-weight-medium mt-2 text-center">
								{{ fixtureDetail.fixtures[0].teams.away.name }}
							</p>
						</div>
					</div>
				</v-card>
				
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

				<!-- <v-tabs
					class="mt-4"
					v-model="tab"
					fixed-tabs
					color="primary"
					bg-color="transparent"
				>
					<v-tab value="one">Summery</v-tab>
					<v-tab value="two">Stats</v-tab>
					<v-tab value="three">Lineups</v-tab>
				</v-tabs> -->

				<!-- <v-window class="mt-5" v-model="tab"> -->
				<!-- <v-window-item value="one"> -->
				<v-card class="px-3">
					<div
						class="
							bg-grey-lighten-3
							py-1
							px-2
							mt-5
							d-flex
							justify-space-between
							align-center
							mb-3
						"
					>
						<p class="text-overline">Prediction</p>
					</div>

					<template
						v-if="
							fixtureDetail.predictions && fixtureDetail.predictions.length > 0
						"
					>
						<div
							class="
								d-flex
								justify-space-between
								align-center
								text-body-2
								px-3
								mb-1
							"
						>
							<p>Your Prediction</p>
							<p class="">
								{{ fixtureDetail.predictions[0].home }}
								-
								{{ fixtureDetail.predictions[0].away }}
							</p>
						</div>
						<div
							class="
								mb-1
								d-flex
								justify-space-between
								align-center
								text-body-2
								px-3
							"
						>
							<p>Using 2x Booster</p>
							<p class="">
								{{ fixtureDetail.predictions[0].boosted ? "Yes" : "No" }}
							</p>
						</div>
						<template
							v-if="
								getFixturePredictionResult(fixtureDetail.fixtures[0].fixture.id)
							"
						>
							<div
								v-for="(p, index) in getFixturePredictionResult(
									fixtureDetail.fixtures[0].fixture.id
								).points"
								:key="index"
								class="
									d-flex
									justify-space-between
									align-center
									text-body-2
									px-3
									mb-1
								"
							>
								<p>{{ snackToTitle(index) }}</p>
								<p class="">{{ p }} Points</p>
							</div>
						</template>

						<div
							class="text-center"
							v-if="fixtureDetail.fixtures[0].fixture.status.short === 'NS'"
						>
							<v-btn
								class="mt-2"
								size="small"
								@click="predictionDialogHandler(fixtureDetail.fixtures[0])"
								color="primary"
							>
								<span
									v-if="
										getFixturePrediction(fixtureDetail.fixtures[0].fixture.id)
									"
								>
									Change Predict
								</span>
								<span v-else> Predict Match </span>
							</v-btn>
						</div>
					</template>

					<div
						class="
							mt-3
							bg-grey-lighten-3
							py-1
							px-2
							d-flex
							justify-space-between
							align-center
							mb-3
						"
					>
						<p class="text-overline">Score</p>
					</div>

					<div
						class="
							d-flex
							justify-space-between
							align-center
							text-body-2
							px-3
							mb-1
						"
					>
						<p>Half Time</p>
						<p class="">
							{{ fixtureDetail.fixtures[0].score.halftime.home }}
							-
							{{ fixtureDetail.fixtures[0].score.halftime.away }}
						</p>
					</div>
					<div
						class="d-flex justify-space-between align-center text-body-2 px-3"
					>
						<p>Full Time</p>
						<p class="">
							{{ fixtureDetail.fixtures[0].score.fulltime.home }}
							-
							{{ fixtureDetail.fixtures[0].score.fulltime.away }}
						</p>
					</div>
					<div
						v-if="fixtureDetail.fixtures[0].score.extratime.home"
						class="d-flex justify-space-between align-center text-body-2 px-3"
					>
						<p>Extra Time</p>
						<p class="">
							{{ fixtureDetail.fixtures[0].score.extratime.home }}
							-
							{{ fixtureDetail.fixtures[0].score.extratime.away }}
						</p>
					</div>
					<div
						v-if="fixtureDetail.fixtures[0].score.penalty.home"
						class="d-flex justify-space-between align-center text-body-2 px-3"
					>
						<p>Penalty</p>
						<p class="">
							{{ fixtureDetail.fixtures[0].score.penalty.home }}
							-
							{{ fixtureDetail.fixtures[0].score.penalty.away }}
						</p>
					</div>

					<div
						class="
							mt-3
							bg-grey-lighten-3
							py-1
							mb-3
							px-2
							d-flex
							justify-space-between
							align-center
						"
					>
						<p class="text-overline">First Half</p>
						<p class="text-overline">
							{{
								fixtureDetail.fixtures[0].score.halftime.home
									? fixtureDetail.fixtures[0].score.halftime.home
									: 0
							}}
							-
							{{
								fixtureDetail.fixtures[0].score.halftime.away
									? fixtureDetail.fixtures[0].score.halftime.away
									: "0"
							}}
						</p>
					</div>
					<div v-for="(e, index) in firstHalfTimeEvents" :key="index">
						<div
						v-if="e.team.id === fixtureDetail.fixtures[0].teams.away.id"
						class="d-flex px-3 py-2 align-center justify-end"
					>
						<p class="text-subtitle-2">
							<span class="text-grey-darken-1" v-if="e.assist.name">{{
								"( " + e.assist.name + " )"
							}}</span>
							{{ e.player.name }}
						</p>
						<p class="text-caption border px-1 py-1 rounded ml-5">
							<v-icon v-if="e.type === 'Card'" color="yellow-darken-1"
								>mdi-cards</v-icon
							>

							<v-icon v-else-if="e.type === 'subst'">mdi-sync</v-icon>

							<v-icon v-else-if="e.type === 'Goal'">mdi-soccer</v-icon>

							<v-icon v-else>mdi-asterisk</v-icon>
						</p>
						<p
							style="width: 35px"
							class="text-caption text-right font-weight-medium"
						>
							{{ e.time.elapsed }}'
						</p>
					</div>
					<div v-else class="d-flex px-3 py-2 align-center justify-start">
						<p style="width: 35px" class="text-caption font-weight-medium">
							{{ e.time.elapsed }}'
						</p>
						<p class="text-caption border px-1 py-1 rounded mr-5">
							<v-icon v-if="e.type === 'Card'" color="yellow-darken-1"
								>mdi-cards</v-icon
							>

							<v-icon v-else-if="e.type === 'subst'">mdi-sync</v-icon>

							<v-icon v-else-if="e.type === 'Goal'">mdi-soccer</v-icon>

							<v-icon v-else>mdi-asterisk</v-icon>
						</p>
						<p class="text-subtitle-2">
							{{ e.player.name }}
							<span class="text-grey-darken-1" v-if="e.assist.name">{{
								"( " + e.assist.name + " )"
							}}</span>
						</p>
					</div>
					</div>
					<div
						class="
							bg-grey-lighten-3
							py-1
							mt-3
							mb-3
							px-2
							d-flex
							justify-space-between
							align-center
						"
					>
						<p class="text-overline">Second Half</p>
						<p class="text-overline">
							{{
								fixtureDetail.fixtures[0].score.fulltime.home
									? fixtureDetail.fixtures[0].score.fulltime.home
									: 0
							}}
							-
							{{
								fixtureDetail.fixtures[0].score.fulltime.away
									? fixtureDetail.fixtures[0].score.fulltime.away
									: "0"
							}}
						</p>
					</div>
					<div v-for="(e, index) in secondHalfTimeEvents" :key="index">
						<div
							v-if="e.team.id === fixtureDetail.fixtures[0].teams.away.id"
							class="d-flex px-3 py-2 align-center justify-end"
						>
							<p class="text-subtitle-2">
								<span class="text-grey-darken-1" v-if="e.assist.name">{{
									"( " + e.assist.name + " )"
								}}</span>
								{{ e.player.name }}
							</p>
							<p class="text-caption border px-1 py-1 rounded ml-5">
								<v-icon v-if="e.type === 'Card'" color="yellow-darken-1"
									>mdi-cards</v-icon
								>

								<v-icon v-else-if="e.type === 'subst'">mdi-sync</v-icon>

								<v-icon v-else-if="e.type === 'Goal'">mdi-soccer</v-icon>

								<v-icon v-else>mdi-asterisk</v-icon>
							</p>
							<p
								style="width: 35px"
								class="text-caption text-right font-weight-medium"
							>
								{{ e.time.elapsed }}'
							</p>
						</div>
						<div v-else class="d-flex px-3 py-2 align-center justify-start">
							<p style="width: 35px" class="text-caption font-weight-medium">
								{{ e.time.elapsed }}'
							</p>
							<p class="text-caption border px-1 py-1 rounded mr-5">
								<v-icon v-if="e.type === 'Card'" color="yellow-darken-1"
									>mdi-cards</v-icon
								>

								<v-icon v-else-if="e.type === 'subst'">mdi-sync</v-icon>

								<v-icon v-else-if="e.type === 'Goal'">mdi-soccer</v-icon>

								<v-icon v-else>mdi-asterisk</v-icon>
							</p>
							<p class="text-subtitle-2">
								{{ e.player.name }}
								<span class="text-grey-darken-1" v-if="e.assist.name">{{
									"( " + e.assist.name + " )"
								}}</span>
							</p>
						</div>
					</div>
					<div
						class="
							mt-3
							bg-grey-lighten-3
							py-1
							px-2
							d-flex
							justify-space-between
							align-center
						"
					>
						<p class="text-overline">Match Information</p>
					</div>
					<v-list lines="two">
						<v-list-item
							title="Referee"
							:subtitle="fixtureDetail.fixtures[0].fixture.referee"
							prepend-icon="mdi-whistle-outline"
						></v-list-item>
						<v-list-item
							title="Venue"
							:subtitle="
								fixtureDetail.fixtures[0].fixture.venue.name +
								' (' +
								fixtureDetail.fixtures[0].fixture.venue.city +
								')'
							"
							prepend-icon="mdi-soccer-field"
						></v-list-item>
					</v-list>
				</v-card>
				<!-- </v-window-item> -->

				<!-- </v-window> -->

				<v-container>
					<v-row>
						<v-col>
							<v-card
								@click="$router.push('/lineups')"
								color="primary"
								class="mt-3"
							>
								<v-card-text>
									Line-ups
									<span class="float-right">
										<v-icon icon="mdi-arrow-right"></v-icon>
									</span>
								</v-card-text>
							</v-card>

							<!-- <v-card color="primary" class="mt-3">
								<v-card-text>
									Players
									<span class="float-right">
										<v-icon icon="mdi-arrow-right"></v-icon>
									</span>
								</v-card-text>
							</v-card>

							<v-card color="primary" class="mt-3">
								<v-card-text>
									Statistics
									<span class="float-right">
										<v-icon icon="mdi-arrow-right"></v-icon>
									</span>
								</v-card-text>
							</v-card> -->
						</v-col>
					</v-row>
				</v-container>
			</template>
		</v-card>
		<v-container>
			<v-row dense>
				<v-col>
					<!-- prediction dialog -->
					<v-dialog v-model="showPredictionDialog">
						<v-card class="pt-5 pb-5 px-5 text-center">
							<p class="text-body-1 font-weight-bold">{{ prediction.date }}</p>
							<p class="text-caption">{{ prediction.time }}</p>
							<div class="d-flex justify-space-between align-center">
								<div v-if="prediction.homeTeam" class="d-flex align-center">
									<p class="mr-3 text-caption font-weight-medium">
										{{ getTeamCode(prediction.homeTeam.id) }}
									</p>
									<v-avatar size="40" large class="rounded-circle">
										<v-img
											class="rounded-circle"
											:lazy-src="logo"
											:src="prediction.homeTeam.logo"
										></v-img>
									</v-avatar>
								</div>
								<div class="d-flex align-center">
									<scroll-picker
										:options="options"
										v-model="predictionForm.teamOnePredictionNumber"
									/>
									<div style="width: 30px"><span>:</span></div>
									<scroll-picker
										:options="options"
										v-model="predictionForm.teamTwoPredictionNumber"
									/>
								</div>
								<div v-if="prediction.homeTeam" class="d-flex align-center">
									<v-avatar size="40" large class="rounded-circle">
										<v-img
											class="rounded-circle"
											:lazy-src="logo"
											:src="prediction.awayTeam.logo"
										></v-img>
									</v-avatar>
									<p class="ml-3 text-caption font-weight-medium">
										{{ getTeamCode(prediction.awayTeam.id) }}
									</p>
								</div>
							</div>
							<div class="mx-auto">
								<v-checkbox
									style="font-size: 12px"
									hide-details
									color="primary"
									v-model="predictionForm.prediction2xBooster"
									label="Use 2x Booster to double Points"
								></v-checkbox>
							</div>
							<p class="mt-1" style="font-size: 10px">
								You can change it until 30 mins before the match start.
							</p>
							<div class="text-center">
								<v-btn
									@click="onSavePredictionHandler"
									class="mt-3"
									size="small"
									width="160px"
									color="primary"
									>Save Prediction</v-btn
								>
							</div>
						</v-card>
					</v-dialog>
				</v-col>
			</v-row>
		</v-container>
	</template>

	<BottomNavigation :value="page" />
</template>


<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import logo from "@/assets/logo.jpg";
import ScrollPicker from "vue3-scroll-picker";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import "moment-timezone";

export default {
	name: "Fixture",
	props: ["id"],
	components: { BottomNavigation, ScrollPicker },
	computed: {
		...mapGetters({
			venueDetail: "fixture/venueDetail",
			selectedGameWeek: "fixture/selectedGameWeek",
			fixtureDetail: "fixture/fixtureDetail",
			currentGameWeek: "gameweek/currentGameWeek",
			tournamentData: "tournamentData",
			teams: "teams",
			predictionResultList: "prediction/predictionResultList",
			authenticated: "auth/authenticated",
			user: "auth/user",
		}),
		firstHalfTimeEvents() {
			return this.fixtureDetail.fixtures[0].events.filter((e) => {
				return e.time.elapsed <= 45;
			});
		},
		secondHalfTimeEvents() {
			return this.fixtureDetail.fixtures[0].events.filter((e) => {
				return e.time.elapsed > 45;
			});
		},
	},
	data: () => ({
		loading: false,
		tab: null,
		page: "tournament",
		logo: logo,
		teamOnePredictionNumber: ["0"],
		teamTwoPredictionNumber: ["0"],
		showPredictionDialog: false,
		prediction2xBooster: false,
		options: [[]],
		prevRoute: null,
		prediction: {
			date: null,
			time: null,
			homeTeam: null,
			awayTeam: null,
			date: null,
			fixtureId: null,
		},
		predictionForm: {
			teamOnePredictionNumber: ["0"],
			teamTwoPredictionNumber: ["0"],
			prediction2xBooster: false,
		},
	}),
	methods: {
		moment,
		...mapActions({
			showDialogAction: "general/showDialogAction",
			getFixtureDetail: "fixture/getFixtureDetail",
			getPremierLeagueTeamListAction: "getPremierLeagueTeamListAction",
			toggleLoading: "toggleLoading",
			savePredictionAction: "prediction/savePredictionAction",
			getGameWeekAction: "gameweek/getGameWeekAction",
			getPredictionCalculatedListAction:
				"prediction/getPredictionCalculatedListAction",
			getTournamentIndexAction: "getTournamentIndexAction",
			setTeamsAction: "setTeamsAction",
		}),
		snackToTitle(str) {
			const a = str.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
				c ? c.toUpperCase() : " " + d.toUpperCase()
			);
			return a;
		},
		getTeamCode(id) {
			if (this.teams) {
				const filteredTeam = this.teams.filter((t) => {
					return t.team.id === id;
				});
				if (filteredTeam.length > 0) {
					return filteredTeam[0].team.code;
				}
			} else {
				return null;
			}
		},
		predictionDialogHandler(f) {
			console.log("open dialog for ", f);
			if (this.getFixturePrediction(f.fixture.id)) {
				this.predictionForm.teamOnePredictionNumber = [
					this.getFixturePrediction(f.fixture.id).home,
				];
				this.predictionForm.teamTwoPredictionNumber = [
					this.getFixturePrediction(f.fixture.id).away,
				];
				this.predictionForm.prediction2xBooster = this.getFixturePrediction(
					f.fixture.id
				).boosted;
			} else {
				this.predictionForm.teamOnePredictionNumber = ["0"];
				this.predictionForm.teamTwoPredictionNumber = ["0"];
				this.predictionForm.prediction2xBooster = false;
			}
			this.showPredictionDialog = true;
			this.prediction.homeTeam = f.teams.home;
			this.prediction.awayTeam = f.teams.away;
			this.prediction.fixtureId = f.fixture.id;
			this.prediction.date = moment(
				new Date(f.fixture.date),
				moment.ISO_8601
			).format("ddd D MMM YYYY");
			this.prediction.time = moment(
				new Date(f.fixture.date),
				moment.ISO_8601
			).format("h:mm A ");
		},
		getFixturePrediction(fixture_id) {
			if (this.fixtureDetail.predictions) {
				const predictions = this.fixtureDetail.predictions.filter((p) => {
					return p.fixture_id == fixture_id && p.user_id === this.user._id;
				});
				if (predictions[0]) {
					return {
						home: predictions[0].home,
						away: predictions[0].away,
						boosted: predictions[0].boosted,
					};
				}
			}
		},
		getFixturePredictionResult(fixture_id) {
			if (this.predictionResultList) {
				const prediction_result = this.predictionResultList.filter((p) => {
					return p.fixture_id == fixture_id && p.user_id === this.user._id;
				});

				return prediction_result[0];
			}
		},
		updatePredictionValue(fixture_id, data) {
			let predictions = this.tournamentData.predictions;
			let predictionFromDetail = this.fixtureDetail.predictions;

			console.log("predictions from tournament data", predictions);
			console.log("predictions from detail page", predictionFromDetail);
			console.log("api return data", data);
			console.log("looking prediction for #" + fixture_id);
			predictionFromDetail = [];
			predictionFromDetail.push(data);

			if (predictions.length <= 0) {
				predictions.push(data);
			} else {
				// check for tournament data prediction

				let existingPredictionIndex = -1;
				const checkPredictionExist = predictions.find((p, index) => {
					if (parseInt(p.fixture_id) === fixture_id) {
						existingPredictionIndex = index;
						return p;
					}
				});
				if (checkPredictionExist) {
					console.log("exist ", checkPredictionExist);
					predictions[existingPredictionIndex].home = data.home;
					predictions[existingPredictionIndex].away = data.away;
					predictions[existingPredictionIndex].boosted = data.boosted;
					console.log("updated", predictions[existingPredictionIndex]);
				} else {
					predictions.push(data);
				}
			}

			console.log("update prediction", predictions);
			this.fixtureDetail.predictions = predictionFromDetail;
		},
		async onSavePredictionHandler() {
			let week = "";
			if (this.selectedGameWeek) {
				week = this.selectedGameWeek.week;
			} else {
				week = this.currentGameWeek.week;
			}

			const response = await this.savePredictionAction({
				fixture_id: this.prediction.fixtureId,
				home_team: this.prediction.homeTeam,
				away_team: this.prediction.awayTeam,
				home: this.predictionForm.teamOnePredictionNumber[0],
				away: this.predictionForm.teamTwoPredictionNumber[0],
				boosted: this.predictionForm.prediction2xBooster,
				week: week,
			});

			if (response.code === 200) {
				// update fixture prediction value in store

				console.log("rrr", response.results);
				this.updatePredictionValue(this.prediction.fixtureId, response.results);

				this.prediction = {
					homeTeam: null,
					awayTeam: null,
					date: null,
					fixtureId: null,
				};
				this.predictionForm = {
					teamOnePredictionNumber: ["0"],
					teamTwoPredictionNumber: ["0"],
					prediction2xBooster: false,
				};
				this.showPredictionDialog = false;
			} else {
				this.showDialogAction({
					title: "Whoops!",
					body: response.message,
				});
			}
		},
		adsenseAddLoad() {
			let inlineScript = document.createElement("script");
			inlineScript.type = "text/javascript";
			inlineScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";
			document.getElementsByTagName("body")[0].appendChild(inlineScript);
		},
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.prevRoute = from;
		});
	},
	async mounted() {
		this.adsenseAddLoad();
		this.loading = true;

		for (let index = 0; index < 21; index++) {
			this.options[0].push(
				{
					label: index.toString(),
					value: index.toString(),
				}
			)
			
		}

		if (!this.currentGameWeek) {
			await this.getGameWeekAction();
		}

		this.fixtureGameWeek = this.currentGameWeek.week;

		if (this.prevRoute) {
			if (this.prevRoute.path.includes("/lineups")) {
				console.log("old data from " + this.prevRoute.path);
			} else if (this.prevRoute.path.includes("/events")) {
				console.log("old data from " + this.prevRoute.path);
			} else {
				let get = "";
				let fixtureParams = {};
				if (this.teams) {
					get = "fixtures,predictions";
				} else {
					get = "fixtures,teams,predictions";
				}

				if (this.selectedGameWeek.gameWeek) {
					console.log("seleted");
					fixtureParams = {
						league_id: this.selectedGameWeek.league_id,
						season: "2022",
						fixture_id: this.id,
					};
				} else {
					console.log("no seleted");
					fixtureParams = {
						fixture_id: this.id,
						league_id: this.currentGameWeek.league,
						season: "2022",
					};
					this.fixtureGameWeek = this.currentGameWeek.week;
					this.league = this.currentGameWeek.league;
				}
				

				const response = await this.getTournamentIndexAction({
					...fixtureParams,
					get: get,
				});


				if (response.code === 200) {
					if (response.results.teams) {
						this.setTeamsAction(response.results.teams);
					}
				} else {
					this.showDialogAction({
						title: "Whoops!",
						body: response.results.message,
					});
				}
			}
		}

		if (this.predictionResultList.length <= 0) {
			console.log("a,", this.fixtureDetail.predictions);
			await this.getPredictionCalculatedListAction(
				this.fixtureDetail.predictions
			);
			console.log("aa");
		}

		this.loading = false;
	},
};
</script>

<style>
.gameweek-deadline-card {
	color: #fff !important;
	padding: 20px;
	background: rgb(76, 47, 227);
	background: linear-gradient(
		90deg,
		rgba(76, 47, 227, 1) 0%,
		rgba(58, 58, 226, 1) 56%,
		rgba(115, 100, 246, 1) 100%
	);
}

.stadium-text-bg {
	background: rgba(0, 0, 0, 0.223);
}
body
	> div.v-overlay-container
	> div
	> div.v-overlay__content
	> div
	> div.mx-auto
	> div
	> div
	> div
	> label {
	font-size: 14px !important;
}
</style>


