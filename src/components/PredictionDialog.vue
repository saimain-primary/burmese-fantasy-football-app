<template>
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
</template>

<script>
import ScrollPicker from "vue3-scroll-picker";
import { mapActions, mapGetters } from "vuex";
import logo from "@/assets/logo.jpg";

export default {
	name: "Prediction Dialog",
	components: { ScrollPicker },
	computed: {
		...mapGetters({
			currentGameWeek: "gameweek/currentGameWeek",
			gameWeekList: "gameweek/gameWeekList",
			selectedGameWeek: "fixture/selectedGameWeek",
			teams: "teams",
			tournamentData: "tournamentData",
		}),
	},
	props: ["prediction", "predictionForm", "showPredictionDialog"],
	data() {
		return {
			logo: logo,
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
		};
	},
	methods: {
		...mapActions({
			savePredictionAction: "prediction/savePredictionAction",
		}),
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
				this.$emit("closePredictionDialog");
				this.showPredictionDialog = false;
			} else {
				this.showDialogAction({
					title: "Whoops!",
					body: response.message,
				});
			}
		},
	},
	mounted() {
		console.log("this", this.$props);
	},
};
</script>