<template>
	<v-card elevation="0" class="mx-auto">
		<v-img
			v-if="fixtureDetail.venues"
			class="align-end text-white"
			height="200"
			:src="fixtureDetail.venues[0].image"
			cover
		>
			<v-card-title class="text-body-1 stadium-text-bg"
				><v-icon icon="mdi-map-marker-radius" size="small"></v-icon>
				{{ fixtureDetail.venues[0].name }}</v-card-title
			>
		</v-img>

		<template v-if="fixtureDetail.fixtures">
			<div
				class="
					pt-4
					px-3
					font-weight-medium
					d-flex
					justify-space-between
					align-center
				"
			>
				<p
					class="
						text-body-1 text-grey-darken-4 text-uppercase
						font-weight-medium
					"
				>
					{{ fixtureDetail.fixtures[0].fixture.status.long }}
				</p>
				<div
					class="text-right text-caption font-weight-medium text-grey-darken-1"
				>
					<p class="">Kickoff Time</p>
					<p>
						{{
							moment(
								new Date(fixtureDetail.fixtures[0].fixture.date),
								moment.ISO_8601
							).format("ddd D MMM YYYY , h:mm A")
						}}
					</p>
				</div>
			</div>
			<v-divider class="my-5 mx-3"></v-divider>
			<p class="text-center font-weight-medium text-uppercase text-overline">
				Match Result
			</p>
			<v-card
				class="
					d-flex
					mx-3
					justify-space-between
					px-5
					py-5
					align-center
					gameweek-deadline-card
				"
			>
				<div class="d-flex align-center justify-center" style="width: 100px">
					<p class="mr-3 text-body-1 text-center">
						{{ getTeamCode(fixtureDetail.fixtures[0].teams.home.id) }}
					</p>
					<v-avatar size="40" large class="rounded-circle">
						<v-img
							class="rounded-circle"
							lazy-src="../assets/logo.jpg"
							:src="fixtureDetail.fixtures[0].teams.home.logo"
						></v-img>
					</v-avatar>
				</div>
				<div class="mx-3 text-center" style="width: 100px">
					<p class="text-h5 font-weight-medium">
						{{
							fixtureDetail.fixtures[0].goals.home
								? fixtureDetail.fixtures[0].goals.home
								: 0
						}}
						:
						{{
							fixtureDetail.fixtures[0].goals.away
								? fixtureDetail.fixtures[0].goals.away
								: 0
						}}
					</p>
				</div>
				<div class="d-flex align-center justify-center" style="width: 100px">
					<v-avatar size="40" large class="rounded-circle">
						<v-img
							class="rounded-circle"
							lazy-src="../assets/logo.jpg"
							:src="fixtureDetail.fixtures[0].teams.away.logo"
						></v-img>
					</v-avatar>
					<p class="ml-3 text-body-1 text-center">
						{{ getTeamCode(fixtureDetail.fixtures[0].teams.away.id) }}
					</p>
				</div>
			</v-card>

			<v-card class="mx-3 mt-5 py-3 px-3 text-center">
				<p class="text-center font-weight-medium text-uppercase text-overline">
					<span
						v-if="
							fixtureDetail.predictions && fixtureDetail.predictions.length > 0
						"
						>Your Prediction</span
					>
					<span v-else>You have not predict in this match</span>
				</p>
				<div
					class="text-center"
					v-if="
						fixtureDetail.predictions && fixtureDetail.predictions.length > 0
					"
				>
					<p class="text-h5 font-weight-medium">
						{{ fixtureDetail.predictions[0].home }}
						:
						{{ fixtureDetail.predictions[0].away }}
					</p>
					<p
						v-if="fixtureDetail.predictions[0].boosted"
						class="text-overline text-success"
					>
						Using 2x Booster
					</p>
				</div>
				<v-btn
					class="mt-2"
					size="small"
					@click="predictionDialogHandler(fixtureDetail.fixtures[0])"
					color="primary"
					:hidden="fixtureDetail.fixtures[0].fixture.status.short !== 'NS'"
				>
					<span
						v-if="getFixturePrediction(fixtureDetail.fixtures[0].fixture.id)"
					>
						Change Predict
					</span>
					<span v-else> Predict Match </span>
				</v-btn>
			</v-card>

			<v-card-text
				v-if="fixtureDetail.fixtures[0].fixture.status.short !== 'NS'"
			>
				<p class="text-overline">Scores</p>
				<v-divider class="mb-2 mt-1"></v-divider>
				<div
					v-if="fixtureDetail.fixtures[0].score.halftime.home !== null"
					class="d-flex justify-space-between align-center"
				>
					<p>Half Time</p>
					<p>
						{{
							fixtureDetail.fixtures[0].score.halftime.home +
							" : " +
							fixtureDetail.fixtures[0].score.halftime.away
						}}
					</p>
				</div>
				<div
					v-if="fixtureDetail.fixtures[0].score.fulltime.home !== null"
					class="d-flex justify-space-between align-center"
				>
					<p>Full Time</p>
					<p>
						{{
							fixtureDetail.fixtures[0].score.fulltime.home +
							" : " +
							fixtureDetail.fixtures[0].score.fulltime.away
						}}
					</p>
				</div>
				<div
					v-if="fixtureDetail.fixtures[0].score.extratime.home"
					class="d-flex justify-space-between align-center"
				>
					<p>Extra Time</p>
					<p>
						{{
							fixtureDetail.fixtures[0].score.extratime.home +
							" : " +
							fixtureDetail.fixtures[0].score.extratime.away
						}}
					</p>
				</div>
				<div
					v-if="fixtureDetail.fixtures[0].score.penalty.home"
					class="d-flex justify-space-between align-center"
				>
					<p>Penalty</p>
					<p>
						{{
							fixtureDetail.fixtures[0].score.penalty.home +
							" : " +
							fixtureDetail.fixtures[0].score.penalty.away
						}}
					</p>
				</div>
			</v-card-text>

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
						<v-card
							@click="$router.push('/events')"
							color="primary"
							class="mt-3"
						>
							<v-card-text>
								Match Events
								<span class="float-right">
									<v-icon icon="mdi-arrow-right"></v-icon>
								</span>
							</v-card-text>
						</v-card>
						<v-card color="primary" class="mt-3">
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
						</v-card>
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
			</v-col>
		</v-row>
	</v-container>

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
	props: ["id", "venue"],
	components: { BottomNavigation, ScrollPicker },
	computed: {
		...mapGetters({
			venueDetail: "fixture/venueDetail",
			selectedGameWeek: "fixture/selectedGameWeek",
			fixtureDetail: "fixture/fixtureDetail",
			currentGameWeek: "gameweek/currentGameWeek",
			tournamentData: "tournamentData",
			teams: "teams",
		}),
	},
	data: () => ({
		page: "tournament",
		logo: logo,
		teamOnePredictionNumber: ["0"],
		teamTwoPredictionNumber: ["0"],
		showPredictionDialog: false,
		prediction2xBooster: false,
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
		prevRoute: null,
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
			showDialogAction: "general/showDialogAction",
			getFixtureDetail: "fixture/getFixtureDetail",
			getPremierLeagueTeamListAction: "getPremierLeagueTeamListAction",
			toggleLoading: "toggleLoading",
			savePredictionAction: "prediction/savePredictionAction",
			getGameWeekAction: "gameweek/getGameWeekAction",

			getTournamentIndexAction: "getTournamentIndexAction",
			setTeamsAction: "setTeamsAction",
		}),
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
		},
		getFixturePrediction(fixture_id) {
			if (this.fixtureDetail.predictions) {
				const predictions = this.fixtureDetail.predictions.filter((p) => {
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
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.prevRoute = from;
		});
	},
	async mounted() {
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
				if (this.teams) {
					get = "fixtures,predictions,venues";
				} else {
					get = "fixtures,teams,predictions,venues";
				}

				const response = await this.getTournamentIndexAction({
					fixture_id: this.id,
					venue_id: this.venue,
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
