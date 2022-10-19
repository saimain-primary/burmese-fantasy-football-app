<template>
	<v-container>
		<v-row>
			<v-col>
				<div v-if="fixtureDetail.fixtures[0].events.length > 0">
					<template
						v-for="(e, index) in fixtureDetail.fixtures[0].events"
						:key="index"
					>
						<v-card class="mt-3 text-overline rounded mb-5">
							<div
								class="
									d-flex
									justify-space-between
									align-center
									bg-primary
									px-3
									py-2
								"
							>
								<div class="d-flex justify-start align-center">
									<v-icon v-if="e.type === 'Card'" color="yellow-darken-1"
										>mdi-cards</v-icon
									>

									<v-icon v-else-if="e.type === 'subst'" color="white"
										>mdi-sync</v-icon
									>

									<v-icon v-else-if="e.type === 'Goal'" color="white"
										>mdi-soccer</v-icon
									>

									<v-icon v-else color="white">mdi-asterisk</v-icon>
									<p class="ml-3">{{ e.type }}</p>
								</div>

								<p>Elapsed Time : {{ e.time.elapsed + "'" }}</p>
							</div>
							<div class="px-2 py-2 d-flex justify-space-between align-center">
								<div>
									<p class="text-body-1 font-weight-medium">
										{{ e.player.name }}
									</p>
									<p class="text-body-2">{{ e.assist.name }}</p>
									<p class="text-body-2">{{ e.detail }}</p>
									<p class="text-caption">{{ e.comment }}</p>
								</div>
								<div>
									<v-avatar size="40" large class="rounded-circle">
										<v-img
											class="rounded-circle"
											:lazy-src="logo"
											:src="e.team.logo"
										></v-img>
									</v-avatar>
								</div>
							</div>
						</v-card>
					</template>
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
			</v-col>
		</v-row>
	</v-container>
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
			const player = this.fixtureDetail.lineups[index].startXI.filter((p) => {
				return p.player.pos === "G";
			});
			return player;
		},
		getDefenders(index) {
			const player = this.fixtureDetail.lineups[index].startXI.filter((p) => {
				return p.player.pos === "D";
			});
			return player;
		},
		getMidfielders(index) {
			const player = this.fixtureDetail.lineups[index].startXI.filter((p) => {
				return p.player.pos === "M";
			});
			return player;
		},
		getForwards(index) {
			const player = this.fixtureDetail.lineups[index].startXI.filter((p) => {
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
