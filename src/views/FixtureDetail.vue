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
			<v-card-subtitle class="pt-4">{{
				moment(
					new Date(fixtureDetail.fixtures[0].fixture.date),
					moment.ISO_8601
				).format("ddd D MMM YYYY , h:mm A")
			}}</v-card-subtitle>

			<v-card
				class="
					d-flex
					mx-3
					justify-space-between
					px-5
					py-5
					mt-5
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
						-
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
			<div class="text-center mt-5">
				<v-btn
					variant="outlined"
					size="small"
					color="primary"
					style="margin: 0 auto"
				>
					<p class="">{{ fixtureDetail.fixtures[0].fixture.status.long }}</p>
				</v-btn>
			</div>

			<v-card-text>
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
							<div class="d-flex align-center">
								<p class="mr-3 text-caption font-weight-medium">MUN</p>
								<v-avatar size="40" large class="rounded-circle">
									<v-img
										class="rounded-circle"
										:lazy-src="logo"
										src="https://media.api-sports.io/football/teams/33.png"
									></v-img>
								</v-avatar>
							</div>
							<div class="d-flex align-center">
								<scroll-picker
									:options="options"
									v-model="teamOnePredictionNumber"
								/>
								<div style="width: 30px"><span>:</span></div>
								<scroll-picker
									:options="options"
									v-model="teamTwoPredictionNumber"
								/>
							</div>
							<div class="d-flex align-center">
								<v-avatar size="40" large class="rounded-circle">
									<v-img
										class="rounded-circle"
										:lazy-src="logo"
										src="https://media.api-sports.io/football/teams/34.png"
									></v-img>
								</v-avatar>
								<p class="ml-3 text-caption font-weight-medium">NEW</p>
							</div>
						</div>
						<div class="mx-auto">
							<v-checkbox
								style="font-size: 12px"
								hide-details
								color="primary"
								v-model="prediction2xBooster"
								label="Use 2x Booster to double Pts"
							></v-checkbox>
						</div>
						<p class="mt-1" style="font-size: 10px">
							You can change it until 30 mins before the match start.
						</p>
						<div class="text-center">
							<v-btn class="mt-3" size="small" width="160px" color="primary"
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
			fixtureDetail: "fixture/fixtureDetail",
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
	}),
	methods: {
		moment,
		...mapActions({
			showDialogAction: "general/showDialogAction",
			getFixtureDetail: "fixture/getFixtureDetail",
			getPremierLeagueTeamListAction: "getPremierLeagueTeamListAction",
			toggleLoading: "toggleLoading",

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
		predictionDialogHandler() {
			this.showPredictionDialog = true;
		},
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.prevRoute = from;
		});
	},
	async mounted() {
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
				this.setTeamsAction(response.results.teams);
			} else {
				this.showDialogAction({
					title: "Whoops!",
					body: response.results.message,
				});
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
