<template>
	<v-banner
		v-if="deferredPrompt && !checkDeviceIOS"
		:avatar="logo"
		color="primary"
		text="Get our free BFF app. It won't take up space on your phone and also works offline!"
	>
		<v-banner-actions>
			<v-btn size="small" @click="install">Install</v-btn>
		</v-banner-actions>
	</v-banner>

	<div class="header-div">
		<v-container>
			<v-row>
				<v-col>
					<p
						class="text-center mb-3 text-white welcome-text font-weight-medium"
					>
						Welcome
						<span v-if="authenticated && user != null">
							{{ user.name }}
						</span>
					</p>
					<v-card class="py-3">
						<p class="text-center font-weight-medium text-body-1 mb-2">
							{{ homePageGameWeek ? homePageGameWeek.week : 0 }} Result
						</p>
						<div
							class="
								d-flex
								justify-space-between
								align-center align-content-center
								px-8
								py-3
							"
						>
							<div class="text-center">
								<p class="mb-0 text-h5 font-weight-medium">
									<span v-if="homeData">
										{{ homeData.average_score ? homeData.average_score : 0 }}
									</span>
									<span v-else> 0 </span>
								</p>
								<p class="mb-0 text-caption">Average</p>
							</div>
							<div class="text-center">
								<p class="mb-0 text-h4 font-weight-bold text-primary">
									<span v-if="homeData">
										{{ homeData.your_score ? homeData.your_score.sum : 0 }}
									</span>
									<span v-else> 0 </span>
								</p>
								<p class="mb-0 text-caption">Your Score</p>
							</div>
							<div class="text-center">
								<p class="mb-0 text-h5 font-weight-medium">
									<span v-if="homeData">
										{{
											homeData.highest_score ? homeData.highest_score.sum : 0
										}}
									</span>
									<span v-else> 0 </span>
								</p>
								<p class="mb-0 text-caption">Highest</p>
							</div>
						</div>
						<div
							class="px-5 mt-1 text-center"
							v-if="!authenticated && user == null"
						>
							<v-btn to="/signup" size="small" color="primary"
								>Sign Up Now</v-btn
							>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
	
	<v-container class="mt-5">
		<div class="mt-3">
			<ins
			class="adsbygoogle"
			style="display: block"
			data-ad-client="ca-pub-5660029927918677"
			data-ad-slot="2218006245"
			data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
		</div>
	</v-container>

	<v-container :class="authenticated ? 'mt-10' : 'mt-16'">
		<v-row>
			<v-col>
				<p class="mt-10 text-body-2 font-weight-medium text-grey-darken-3">
					Recent Matches
				</p>

				<div v-if="!homeData" class="recent-matches-div px-1 py-3">
					<div
						v-for="index in 3"
						:key="index"
						class="loading-skeleton mb-3 mr-3"
						style="min-width: 290px"
					>
						<v-card
							elevation="0"
							class="bg-grey-lighten-4 py-3 px-3"
							style="height: 100px"
						>
						</v-card>
					</div>
				</div>
				<div v-else class="recent-matches-div px-1 py-3">
					<div
						v-for="(f, index) in homeData.recent_matches"
						:key="index"
						style="min-width: 290px"
					>
						<v-card class="py-3 px-5 mr-3">
							<p class="font-weight-bold text-caption mb-3 text-center">
								{{
									moment(new Date(f.fixture.date), moment.ISO_8601).format(
										"ddd D MMM YYYY h:mm A "
									)
								}}
							</p>
							<div class="d-flex justify-space-between align-center">
								<div class="d-flex align-center">
									<p class="mr-3 text-caption font-weight-medium">
										{{ getTeamCode(f.teams.home.id) }}
									</p>
									<v-avatar size="40" large rounded="0">
										<v-img
											lazy-src="../assets/logo.jpg"
											:src="f.teams.home.logo"
										></v-img>
									</v-avatar>
								</div>
								<div
									class="border rounded py-1 px-3 mx-3"
									style="margin: 0 auto"
								>
									<p class="text-caption">
										{{ f.goals.home + " - " + f.goals.away }}
									</p>
								</div>
								<div class="d-flex align-center">
									<v-avatar size="40" large rounded="0">
										<v-img
											lazy-src="../assets/logo.jpg"
											:src="f.teams.away.logo"
										></v-img>
									</v-avatar>
									<p class="ml-3 text-caption font-weight-medium">
										{{ getTeamCode(f.teams.away.id) }}
									</p>
								</div>
							</div>
						</v-card>
					</div>
				</div>

				<!-- <v-alert color="primary" variant="tonal" class="mt-3">
					You are using new version of <strong>BFF</strong> and to use the old version <a href="https://v1.bffsports.com" target="_blank">click here</a>
				  </v-alert> -->

				<div class="mt-3">
					<p class="text-body-2 font-weight-medium text-grey-darken-3">
						Next Game Week Deadline
					</p>
					<v-card class="gameweek-deadline-card mt-3">
						<p class="text-center">Don't miss your chance</p>
						<div
							class="d-flex justify-space-between align-center py-3 mt-3 px-5"
						>
							<div class="text-center">
								<p class="text-h5 font-weight-medium">
									<span v-if="homeData">
										{{ homeData.deadline ? homeData.deadline.days : 0 }}
									</span>
									<span v-else> 0 </span>
								</p>
								<p class="text-caption">Days</p>
							</div>
							<div class="text-center">
								<p class="text-h5 font-weight-medium">
									<span v-if="homeData">
										{{ homeData.deadline ? homeData.deadline.hours : 0 }}
									</span>
									<span v-else> 0 </span>
								</p>
								<p class="text-caption">Hours</p>
							</div>
							<div class="text-center">
								<p class="text-h5 font-weight-medium">
									<span v-if="homeData">
										{{ homeData.deadline ? homeData.deadline.mins : 0 }}
									</span>
									<span v-else> 0 </span>
								</p>
								<p class="text-caption">Mins</p>
							</div>
						</div>
						<div class="text-center">
							<v-btn to="tournament" class="mt-3 text-primary" size="small"
								>Predict Now</v-btn
							>
						</div>
					</v-card>
				</div>
				<div v-if="!homeData" class="loading-skeleton mt-5">
					<v-card
						elevation="0"
						class="bg-grey-lighten-4 py-3 px-3"
						style="height: 140px"
					>
					</v-card>
				</div>
				<template v-else>
					<div class="mt-3" v-if="homeData.highest_score">
						<p class="text-body-2 font-weight-medium text-grey-darken-3">
							 {{ homePageGameWeek ? homePageGameWeek.week : 0 }} Top
							Predictor
						</p>

						<v-card v-if="homeData" class="mt-3 py-5 px-10">
							<div class="d-flex align-center">
								<v-avatar size="60" large class="rounded-circle mr-8">
									<v-img
										class="rounded-circle"
										lazy-src="../assets/logo.jpg"
										:src="
											homeData.highest_score.user.profileImage
												? getProfileImage(homeData.highest_score.user)
												: getTeamLogo(homeData.highest_score.user.favoriteTeam)
										"
									></v-img>
								</v-avatar>
								<div class="">
									<div
										v-if="!homeData"
										class="loading-skeleton mb-3 mr-3"
										style="min-width: 160px"
									>
										<v-card
											elevation="0"
											class="bg-grey-lighten-4 py-3 px-3"
											style="height: 10px"
										>
										</v-card>
									</div>
									<p v-else>
										<span class="text-body-1 font-weight-medium">
											<span v-if="homeData">
												{{
													homeData.highest_score
														? homeData.highest_score.user.name
														: "-"
												}}
											</span>
											<span v-else> - </span></span
										><span class="text-caption text-uppercase">
											(
											<span v-if="homeData">
												{{
													homeData.highest_score
														? homeData.highest_score.user.region
														: "-"
												}}
											</span>
											<span v-else> - </span>)
										</span>
									</p>
									<div
										v-if="!homeData"
										class="loading-skeleton mb-3 mr-3"
										style="min-width: 160px"
									>
										<v-card
											elevation="0"
											class="bg-grey-lighten-4 py-3 px-3"
											style="height: 10px"
										>
										</v-card>
									</div>
									<p v-else class="text-caption font-weight-medium">
										Total Points :
										<span class="text-primary text-body-1 font-weight-medium">
											<span v-if="homeData">
												{{
													homeData.highest_score
														? homeData.highest_score.sum
														: "-"
												}}
											</span>
											<span v-else> - </span> Pts</span
										>
									</p>
									<v-btn
										v-if="homeData"
										to="/leaderboard"
										color="primary"
										class="mt-3"
										size="small"
										>View Leaderboard</v-btn
									>
								</div>
							</div>
						</v-card>
					</div>
				</template>

				<div>
					<p class="mt-3 text-caption text-grey-lighten-1 text-center">
						Advertisement
					</p>
					<router-link to="/tournament">
						<v-img src="../assets/banners/bff.png"></v-img>
					</router-link>
				</div>
			</v-col>
		</v-row>
	</v-container>

	<BottomNavigation />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import { mapGetters, mapActions } from "vuex";
import logo from "@/assets/logo.jpg";
import moment from "moment";
import "moment-timezone";
export default {
	name: "Home",
	components: { BottomNavigation },
	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			user: "auth/user",
			currentGameWeek: "gameweek/currentGameWeek",
			homePageGameWeek: "gameweek/homePageGameWeek",
			teams: "teams",
			homeData: "homeData",
		}),
		checkDeviceIOS() {
			return this.isIOSMobile(navigator.userAgent);
		},
	},
	data() {
		return {
			logo: logo,
			deferredPrompt: null,
		};
	},
	methods: {
		moment,

		...mapActions({
			getGameWeekAction: "gameweek/getGameWeekAction",
			getTournamentIndexAction: "getTournamentIndexAction",
			setTeamsAction: "setTeamsAction",
			getHomeDataAction: "getHomeDataAction",
			toggleSnackBarAction: "general/toggleSnackBarAction",
		}),
		async install() {
			this.deferredPrompt.prompt();
		},
		isIOSMobile() {
			if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				return true;
			} else {
				return false;
			}
		},
		getProfileImage(user) {
			return process.env.VUE_APP_API_DOMAIN + user.profileImage;
		},
		getTeamLogo(name) {
			const team = this.teams.filter((t) => {
				return t.team.name === name;
			})[0];
			return team.team.logo;
		},
		getTeamCode(id) {
			if (this.teams) {
				const team = this.teams.filter((t) => {
					return t.team.id === id;
				});
				return team[0] ? team[0].team.code : null;
			} else {
				return null;
			}
		},
		adsenseAddLoad() {
			let inlineScript = document.createElement("script");
			inlineScript.type = "text/javascript";
			inlineScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";
			document.getElementsByTagName("body")[0].appendChild(inlineScript);
		},
	},
	created() {
		window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			console.log("e", e);
			// Stash the event so it can be triggered later.
			this.deferredPrompt = e;
		});
		window.addEventListener("appinstalled", () => {
			console.log("installed");
			this.deferredPrompt = null;
		});
	},
	async mounted() {
		this.adsenceAddLoad();
		this.$gtag.event("home");
		if (!this.currentGameWeek) {
			await this.getGameWeekAction();
		}

		if (!this.teams) {
			const response = await this.getTournamentIndexAction({
				get: "teams",
				league_id : this.currentGameWeek.league
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

		await this.getHomeDataAction({
			league_id : this.currentGameWeek.league,
			fixture_week: this.homePageGameWeek.week,
			current_week: this.currentGameWeek.week,
			leaderboard: true,
		});
	},
};
</script>
<style scoped>
.header-div {
	height: 120px;
	background: #4c2fe3;
	border-radius: 0 0 10px 10px;
	position: relative;
}

.welcome-text {
	font-size: 18px;
	letter-spacing: 0.5px;
}

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

.recent-matches-div {
	width: 100%;
	overflow-x: auto;
	display: flex;
}

/* Hide scrollbar for IE, Edge and Firefox */
.recent-matches-div {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}

.recent-matches-div::-webkit-scrollbar {
	display: none;
}

.recent-match-team span {
	font-size: 13px;
	letter-spacing: 0.5px;
}
</style>
