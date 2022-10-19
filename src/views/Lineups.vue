<template>
	<div v-if="fixtureDetail.fixtures[0].lineups.length > 0">
		<v-tabs v-model="tab" bg-color="primary" grow>
			<v-tab value="home">
				{{ fixtureDetail.fixtures[0].teams.home.name }}
			</v-tab>
			<v-tab value="away">
				{{ fixtureDetail.fixtures[0].teams.away.name }}
			</v-tab>
		</v-tabs>
		<v-container>
			<v-row>
				<v-col>
					<v-window v-model="tab">
						<v-window-item value="home">
							<v-card color="white" elevation="0" class="mt-3">
								<v-card-text
									class="d-flex justify-space-between align-center bg-primary"
								>
									<p
										class="text-body-1 font-weight-medium text-uppercase"
										style="letter-spacing: 1px !important"
									>
										{{ fixtureDetail.fixtures[0].teams.home.name }}
									</p>
									<v-avatar size="30" large class="rounded-circle">
										<v-img
											class="rounded-circle"
											lazy-src="../assets/logo.jpg"
											:src="fixtureDetail.fixtures[0].teams.home.logo"
										></v-img>
									</v-avatar>
								</v-card-text>

								<v-card-text>
									<div
										class="
											text-body-1
											d-flex
											justify-space-between
											align-center
											font-weight-medium
											text-grey-darken-2
										"
									>
										<p>Formation</p>
										<p>{{ fixtureDetail.fixtures[0].lineups[0].formation }}</p>
									</div>
								</v-card-text>
							</v-card>
							<v-card elevation="0">
								<p
									class="
										mt-3
										text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										bg-primary
									"
								>
									Coach
								</p>

								<v-list lines="one">
									<v-list-item
										:title="fixtureDetail.fixtures[0].lineups[0].coach.name"
									>
									</v-list-item>
								</v-list>

								<p
									class="
										mt-3
										text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										bg-primary
									"
								>
									Goalkeeper
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in this.getGoalkeeper(0)"
										:key="index"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
										<div class="d-flex justify-space-between align-center">
											<p>{{ p.player.name }}</p>
										</div>
									</v-list-item>
								</v-list>

								<p
									class="
										mt-3
										text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										bg-primary
									"
								>
									Defenders
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in this.getDefenders(0)"
										:key="index"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
										<div class="d-flex justify-space-between align-center">
											<p>{{ p.player.name }}</p>
										</div>
									</v-list-item>
								</v-list>

								<p
									class="
										mt-3
										text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										bg-primary
									"
								>
									Midfielders
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in this.getMidfielders(0)"
										:key="index"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
										<div class="d-flex justify-space-between align-center">
											<p>{{ p.player.name }}</p>
										</div>
									</v-list-item>
								</v-list>

								<p
									class="
										mt-3
										text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										bg-primary
									"
								>
									Forwards
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in this.getForwards(0)"
										:key="index"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
										<div class="d-flex justify-space-between align-center">
											<p>{{ p.player.name }}</p>
										</div>
									</v-list-item>
								</v-list>
								<p
									class="
										mt-3
										text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										bg-primary
									"
								>
									Substitutes
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in fixtureDetail.fixtures[0].lineups[0]
											.substitutes"
										:key="index"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
										<div class="d-flex justify-space-between align-center">
											<p>{{ p.player.name }}</p>
										</div>
									</v-list-item>
								</v-list>
							</v-card>
						</v-window-item>
						<v-window-item value="away">
							<v-card color="white" elevation="0" class="mt-3">
								<v-card-text
									class="d-flex justify-space-between align-center bg-primary"
								>
									<p
										class="text-body-1 font-weight-medium text-uppercase"
										style="letter-spacing: 1px !important"
									>
										{{ fixtureDetail.fixtures[0].teams.away.name }}
									</p>
									<v-avatar size="30" large class="rounded-circle">
										<v-img
											class="rounded-circle"
											lazy-src="../assets/logo.jpg"
											:src="fixtureDetail.fixtures[0].teams.away.logo"
										></v-img>
									</v-avatar>
								</v-card-text>

								<v-card-text>
									<div
										class="
											text-body-1
											d-flex
											justify-space-between
											align-center
											font-weight-medium
											text-grey-darken-2
										"
									>
										<p>Formation</p>
										<p>{{ fixtureDetail.fixtures[0].lineups[1].formation }}</p>
									</div>
								</v-card-text>
								<v-card elevation="0">
									<p
										class="
											mt-3
											text-body-2
											font-weight-bold
											py-2
											px-2
											rounded
											bg-primary
										"
									>
										Coach
									</p>

									<v-list lines="one">
										<v-list-item
											:title="fixtureDetail.fixtures[0].lineups[1].coach.name"
										>
											<template v-slot:append>
												<v-icon icon="mdi-circle-right"></v-icon>
											</template>
										</v-list-item>
									</v-list>

									<p
										class="
											mt-3
											text-body-2
											font-weight-bold
											py-2
											px-2
											rounded
											bg-primary
										"
									>
										Goalkeeper
									</p>

									<v-list lines="one">
										<v-list-item
											v-for="(p, index) in getGoalkeeper(0)"
											:key="index"
										>
											<template v-slot:prepend>
												<p
													style="width: 50px"
													class="font-weight-bold text-grey-lighten-1"
												>
													{{ p.player.number }}
												</p>
											</template>
											<div class="d-flex justify-space-between align-center">
												<p>{{ p.player.name }}</p>
											</div>
										</v-list-item>
									</v-list>

									<p
										class="
											mt-3
											text-body-2
											font-weight-bold
											py-2
											px-2
											rounded
											bg-primary
										"
									>
										Defenders
									</p>

									<v-list lines="one">
										<v-list-item
											v-for="(p, index) in this.getDefenders(1)"
											:key="index"
										>
											<template v-slot:prepend>
												<p
													style="width: 50px"
													class="font-weight-bold text-grey-lighten-1"
												>
													{{ p.player.number }}
												</p>
											</template>
											<div class="d-flex justify-space-between align-center">
												<p>{{ p.player.name }}</p>
											</div>
										</v-list-item>
									</v-list>

									<p
										class="
											mt-3
											text-body-2
											font-weight-bold
											py-2
											px-2
											rounded
											bg-primary
										"
									>
										Midfielders
									</p>

									<v-list lines="one">
										<v-list-item
											v-for="(p, index) in this.getMidfielders(1)"
											:key="index"
										>
											<template v-slot:prepend>
												<p
													style="width: 50px"
													class="font-weight-bold text-grey-lighten-1"
												>
													{{ p.player.number }}
												</p>
											</template>
											<div class="d-flex justify-space-between align-center">
												<p>{{ p.player.name }}</p>
											</div>
										</v-list-item>
									</v-list>

									<p
										class="
											mt-3
											text-body-2
											font-weight-bold
											py-2
											px-2
											rounded
											bg-primary
										"
									>
										Forwards
									</p>

									<v-list lines="one">
										<v-list-item
											v-for="(p, index) in this.getForwards(1)"
											:key="index"
										>
											<template v-slot:prepend>
												<p
													style="width: 50px"
													class="font-weight-bold text-grey-lighten-1"
												>
													{{ p.player.number }}
												</p>
											</template>
											<div class="d-flex justify-space-between align-center">
												<p>{{ p.player.name }}</p>
											</div>
										</v-list-item>
									</v-list>

									<p
										class="
											mt-3
											text-body-2
											font-weight-bold
											py-2
											px-2
											rounded
											bg-primary
										"
									>
										Substitutes
									</p>

									<v-list lines="one">
										<v-list-item
											v-for="(p, index) in fixtureDetail.fixtures[0].lineups[1]
												.substitutes"
											:key="index"
										>
											<template v-slot:prepend>
												<p
													style="width: 50px"
													class="font-weight-bold text-grey-lighten-1"
												>
													{{ p.player.number }}
												</p>
											</template>
											<div class="d-flex justify-space-between align-center">
												<p>{{ p.player.name }}</p>
											</div>
										</v-list-item>
									</v-list>
								</v-card>
							</v-card>
						</v-window-item>
					</v-window>
				</v-col>
			</v-row>
		</v-container>
	</div>
	<div
		v-else
		class="d-flex mt-16 flex-column justify-space-between align-center"
	>
		<v-img class="" :src="nodata" width="100"></v-img>
		<p class="text-body-2 text-grey-darken-1 mt-3">
			<b>No Data Available!</b>
		</p>
		<v-btn @click="this.$router.go(-1)" color="primary mt-5">
			Back to Match Detail
		</v-btn>
	</div>
	<BottomNavigation :value="page" />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import logo from "@/assets/logo.jpg";
import { mapGetters, mapActions } from "vuex";
import nodata from "@/assets/no_data.svg";

export default {
	name: "Lineups",
	components: { BottomNavigation },
	computed: {
		...mapGetters({
			fixtureDetail: "fixture/fixtureDetail",
		}),
	},
	data: () => ({
		page: "Line Ups",
		logo: logo,
		nodata: nodata,
		tab: null,
	}),
	methods: {
		...mapActions({
			showDialogAction: "general/showDialogAction",
		}),
		getGoalkeeper(index) {
			const player = this.fixtureDetail.fixtures[0].lineups[
				index
			].startXI.filter((p) => {
				return p.player.pos === "G";
			});
			return player;
		},
		getDefenders(index) {
			const player = this.fixtureDetail.fixtures[0].lineups[
				index
			].startXI.filter((p) => {
				return p.player.pos === "D";
			});
			return player;
		},
		getMidfielders(index) {
			const player = this.fixtureDetail.fixtures[0].lineups[
				index
			].startXI.filter((p) => {
				return p.player.pos === "M";
			});
			return player;
		},
		getForwards(index) {
			const player = this.fixtureDetail.fixtures[0].lineups[
				index
			].startXI.filter((p) => {
				return p.player.pos === "F";
			});
			return player;
		},
	},
	async mounted() {},
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
</style>
