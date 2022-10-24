<template>
	<v-container>
		<v-row dense>
			<v-col>
				<!-- prediction dialog -->
				<v-dialog v-model="showPredictionDialog">
					<v-card class="pt-5 pb-5 px-5 text-center">
						<p class="text-body-1 font-weight-bold">Sun 2 Oct 2022</p>
						<p class="text-caption">8:30 PM</p>
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
								label="Use 2x Booster to double Pts"
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
				<!-- <PredictionDialog
					:prediction="prediction"
					:predictionForm="predictionForm"
					:showPredictionDialog="showPredictionDialog"
					@closePredictionDialog="closePredictionDialog"
				/> -->
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
				<p class="mb-3 font-weight-medium text-body-1">Matches</p>

				<template v-if="loading">
					<div v-for="index in 3" :key="index" class="loading-skeleton mb-3">
						<v-card
							elevation="0"
							class="bg-grey-lighten-4 py-3 px-3"
							style="height: 150px"
						>
						</v-card>
					</div>
				</template>
				<template v-else>
					<template v-if="tournamentData.predictions">
						<v-alert
							v-if="!tournamentData.predictions.some((p) => p.boosted === true)"
							class="mb-3"
							color="success"
							text="Don't forget to use your 2x booster to win the double points."
							variant="tonal"
						></v-alert>
					</template>
					<template v-else>
						<v-alert
							class="mb-3"
							color="success"
							text="Don't forget to use your 2x booster to win the double points."
							variant="tonal"
						></v-alert>
					</template>
					<v-card
						v-for="(f, index) in sortByDateFixtureList"
						:key="index"
						class="py-5 px-5 mb-3"
					>
						<div class="d-flex justify-space-between align-center">
							<p class="font-weight-bold text-body-2">
								{{
									moment(new Date(f.fixture.date), moment.ISO_8601).format(
										"ddd D MMM YYYY"
									)
								}}
							</p>
							<v-btn
								:to="'/fixture/' + f.fixture.id"
								variant="text"
								append-icon="mdi-arrow-right"
								size="small"
								color="primary"
								>View Detail
							</v-btn>
						</div>
						<v-divider class="my-3"></v-divider>
						<div
							class="d-flex text-center mt-5 justify-space-between align-center"
						>
							<div
								class="d-flex flex-column justify-center align-center"
								style="width: 100px"
							>
								<v-avatar size="40" large class="rounded-circle">
									<v-img
										class="rounded-circle"
										:lazy-src="logo"
										:src="f.teams.home.logo"
									></v-img>
								</v-avatar>
								<p class="mt-3 text-caption font-weight-medium">
									{{ f.teams.home.name }}
								</p>
							</div>
							<div v-if="f.fixture.status.short === 'NS'">
								<div
									class="border rounded py-1 px-3"
									style="width: 100px; margin: 0 auto"
								>
									<p class="text-caption">
										{{
											moment(new Date(f.fixture.date), moment.ISO_8601).format(
												"h:mm A "
											)
										}}
									</p>
								</div>
								<p
									class="
										text-caption
										mt-1
										text-grey-darken-1
										font-weight-medium
									"
								>
									{{ f.fixture.status.long }}
								</p>
							</div>
							<div v-else>
								<div
									class="d-flex justify-space-between align-center"
									style="width: 120px; margin: 0 auto"
								>
									<p
										class="px-4 text-primary py-1 rounded-lg text-h6"
										style="border: 1px; border-width: 2px; border-style: dashed"
									>
										{{ f.goals.home }}
									</p>
									<span class="mx-3 text-primary font-weight-medium">-</span>
									<p
										class="text-primary px-4 py-1 rounded-lg text-h6"
										style="border: 1px; border-width: 2px; border-style: dashed"
									>
										{{ f.goals.away }}
									</p>
								</div>
								<p class="text-caption mt-2 text-success font-weight-medium">
									{{ f.fixture.status.long }}
								</p>
							</div>
							<div
								class="d-flex flex-column justify-center align-center"
								style="width: 100px"
							>
								<v-avatar size="40" large class="rounded-circle">
									<v-img
										class="rounded-circle"
										:lazy-src="logo"
										:src="f.teams.away.logo"
									></v-img>
								</v-avatar>
								<p class="mt-3 text-caption font-weight-medium">
									{{ f.teams.away.name }}
								</p>
							</div>
						</div>
						<div
							v-if="getFixturePrediction(f.fixture.id)"
							class="
								my-4
								text-subtitle-2
								d-flex
								justify-space-between
								align-center
							"
						>
							<p>Your Prediction</p>
							<p>
								<span
									v-if="getFixturePrediction(f.fixture.id).boosted"
									class="text-success text-uppercase font-weight-medium"
									style="font-size: 10px"
									>2x Boosted</span
								>
								{{
									getFixturePrediction(f.fixture.id).home +
									" - " +
									getFixturePrediction(f.fixture.id).away
								}}
							</p>
						</div>
						<v-alert
							v-if="
								f.fixture.status.short === 'FT' &&
								getFixturePredictionResult(f.fixture.id)
							"
							class="mt-3 py-3 d-flex justify-center align-center mx-auto"
							style="width: 180px"
							height="30px"
							color="primary"
							variant="tonal"
						>
							<span class="text-caption font-weight-medium text-uppercase"
								>You got
								<span class=""
									>+{{
										getFixturePredictionResult(f.fixture.id).points
											.boosted_total
									}}</span
								>
								Pts</span
							>
						</v-alert>
						<div
							v-if="f.fixture.status.short === 'NS'"
							class="text-center mt-3"
						>
							<v-btn
								size="small"
								@click="predictionDialogHandler(f)"
								color="primary"
							>
								<span v-if="getFixturePrediction(f.fixture.id)">
									Change Predict
								</span>
								<span v-else> Predict Match </span>
							</v-btn>
						</div>
					</v-card>
				</template>
			</v-col>
		</v-row>
	</v-container>

	<!-- <div
		v-else
		class="d-flex mt-16 flex-column justify-space-between align-center"
	>
		<v-img class="" :src="nodata" width="100"></v-img>
		<p class="text-body-2 text-grey-darken-1 mt-3">
			<b>No Match Available!</b>
		</p>
	</div> -->
	<BottomNavigation />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import nodata from "@/assets/no_data.svg";
import logo from "@/assets/logo.jpg";
import ScrollPicker from "vue3-scroll-picker";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import "moment-timezone";
import PredictionDialog from "../components/PredictionDialog.vue";
import { thisExpression } from "@babel/types";

export default {
	name: "Tournament",
	components: { BottomNavigation, ScrollPicker, PredictionDialog },
	computed: {
		...mapGetters({
			gameWeekListForSelect: "gameweek/gameWeekListForSelect",
			currentGameWeek: "gameweek/currentGameWeek",
			gameWeekList: "gameweek/gameWeekList",
			selectedGameWeek: "fixture/selectedGameWeek",
			teams: "teams",
			tournamentData: "tournamentData",
			predictionResultList: "prediction/predictionResultList",
		}),
		sortByDateFixtureList() {
			return this.tournamentData.fixtures.sort(
				(a, b) => new Date(a.fixture.date) - new Date(b.fixture.date)
			);
		},
	},
	data: () => ({
		showFilterDialog: false,
		logo: logo,
		nodata: nodata,
		loading: true,
		leagues: ["Premier League", "World Cup 2022"],
		showPredictionDialog: false,
		currentFormData: {
			gameWeek: null,
		},
		fixtureGameWeek: null,
		prevRoute: null,
		options: [
			[
				{
					label: "0",
					value: "0",
				},
				{
					label: "1",
					value: "1",
				},
				{
					label: "2",
					value: "2",
				},
				{
					label: "3",
					value: "3",
				},
				{
					label: "4",
					value: "4",
				},
				{
					label: "4",
					value: "4",
				},
				{
					label: "4",
					value: "4",
				},
			],
		],
		prediction: {
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
			toggleLoading: "toggleLoading",
			showDialogAction: "general/showDialogAction",
			getGameWeekAction: "gameweek/getGameWeekAction",
			storeSelectedGameWeekAction: "fixture/storeSelectedGameWeekAction",
			savePredictionAction: "prediction/savePredictionAction",
			getPredictionCalculatedListAction:
				"prediction/getPredictionCalculatedListAction",
			getTournamentIndexAction: "getTournamentIndexAction",
			setTeamsAction: "setTeamsAction",
		}),
		predictionDialogHandler(f) {
			console.log("open dialog for ", this.getFixturePrediction(f.fixture.id));
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
		},
		async onChangeGameWeekHandler() {
			// const response = await this.getFixtureListAction({
			// 	week: this.currentFormData.gameWeek,
			// });
			this.loading = true;

			this.showFilterDialog = false;

			const response = await this.getTournamentIndexAction({
				fixture_week: this.currentFormData.gameWeek,
				get: "fixtures,predictions",
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
		getTeamCode(id) {
			if (this.teams) {
				const team = this.teams.filter((t) => {
					return t.team.id === id;
				});
				return team[0].team.code;
			} else {
				return null;
			}
		},

		updatePredictionValue(fixture_id, data) {
			console.log("data", data);
			console.log("looking prediction for #" + fixture_id);
			const predictions = this.tournamentData.predictions;

			if (predictions.length <= 0) {
				predictions.push(data);
			} else {
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
				// predictions.forEach((p) => {
				// 	console.log("looping the predictions");
				// 	if (p.fixture_id === fixture_id) {
				// 		console.log("prediction data for #" + fixture_id);
				// 		console.log("prediction", p);
				// 		p.home = data.home;
				// 		p.away = data.away;
				// 		p.boosted = data.boosted;
				// 	} else {
				// 		console.log("no data for #", fixture_id);
				// 		console.log("push", data);
				// 		predictions.push(data);
				// 	}
				// });
			}

			console.log("update prediction", predictions);
			this.tournamentData.predictions = predictions;
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
		getFixturePrediction(fixture_id) {
			if (this.tournamentData.predictions) {
				const predictions = this.tournamentData.predictions.filter((p) => {
					return p.fixture_id == fixture_id;
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
					return p.fixture_id === fixture_id;
				});

				return prediction_result[0];
			}
		},
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.prevRoute = from;
		});
	},
	async mounted() {
		this.loading = true;
		this.$gtag.event("tournament");

		if (this.prevRoute) {
			if (
				!this.prevRoute.path.includes("/fixture/") ||
				!this.tournamentData.fixtures
			) {
				await this.getGameWeekAction();
				let fixtureParams = {};

				let get = "";
				if (this.selectedGameWeek) {
					console.log("seleted");
					fixtureParams = {
						fixture_week: this.selectedGameWeek.week,
					};
				} else {
					console.log("no seleted");
					fixtureParams = {
						fixture_from: this.currentGameWeek.startDate,
						fixture_to: this.currentGameWeek.endDate,
					};
					this.fixtureGameWeek = this.currentGameWeek.week;
				}

				if (this.teams) {
					get = "fixtures,predictions";
				} else {
					get = "fixtures,teams,predictions";
				}

				// this.toggleLoading(true);

				const response = await this.getTournamentIndexAction({
					...fixtureParams,
					get,
				});

				console.log("rrrr", response);

				if (response.code === 200) {
					if (response.results.teams) {
						this.setTeamsAction(response.results.teams);
					}

					await this.getPredictionCalculatedListAction(
						response.results.predictions
					);
				} else {
					this.showDialogAction({
						title: "Whoops!",
						body: response.results.message,
					});
				}
				if (this.currentGameWeek) {
					this.fixtureGameWeek = this.currentGameWeek.week;
					this.currentFormData.gameWeek = this.currentGameWeek.week;
				} else {
					this.currentFormData.gameWeek = null;
				}
			} else {
				console.log("hello");
			}
		}

		if (!this.currentGameWeek) {
			await this.getGameWeekAction();
		}

		this.fixtureGameWeek = this.currentGameWeek.week;

		this.loading = false;
		// if (this.teams.length <= 0) {
		// 	await this.getPremierLeagueTeamListAction();
		// }

		// this.toggleLoading(false);
	},
};
</script>

<style scoped>
.result-div {
	border: 1px solid #4c2fe3;
	border-radius: 4px;
}
.result-div span:nth-of-type(1) {
	margin-right: 10px;
}

.result-div span:nth-of-type(2) {
	margin-left: 10px;
}
</style>

<style>
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

@keyframes loading-skeleton {
	from {
		opacity: 0.4;
	}
	to {
		opacity: 1;
	}
}

.loading-skeleton {
	animation: loading-skeleton 1s infinite alternate;
}
</style>
