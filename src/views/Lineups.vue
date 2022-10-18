<template>
	<v-container>
		<v-row>
			<v-col>
				<v-tabs v-model="tab" bg-color="transparent" color="primary" grow>
					<v-tab value="home"> {{ fixtureDetail.teams.home.name }} </v-tab>
					<v-tab value="away"> {{ fixtureDetail.teams.away.name }} </v-tab>
				</v-tabs>

				<v-window v-model="tab">
					<v-window-item value="home">
						<v-card color="white" class="mt-3">
							<v-card-text
								class="d-flex justify-space-between align-center bg-primary"
							>
								<p
									class="text-body-1 font-weight-medium text-uppercase"
									style="letter-spacing: 1px !important"
								>
									{{ fixtureDetail.teams.home.name }}
								</p>
								<v-avatar size="30" large class="rounded-circle">
									<v-img
										class="rounded-circle"
										lazy-src="../assets/logo.jpg"
										:src="fixtureDetail.teams.home.logo"
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
									<p>{{ fixtureDetail.lineups[0].formation }}</p>
								</div>
								<p
									class="
										mt-3
										text-uppercase text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										text-grey-darken-3
										bg-grey-lighten-3
									"
								>
									Coach
								</p>

								<v-list lines="one">
									<v-list-item :title="fixtureDetail.lineups[0].coach.name">
										<template v-slot:append>
											<v-icon icon="mdi-circle-right"></v-icon>
										</template>
									</v-list-item>
								</v-list>

								<p
									class="
										mt-3
										text-uppercase text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										text-grey-darken-3
										bg-grey-lighten-3
									"
								>
									Starting XI
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in fixtureDetail.lineups[0].startXI"
										:key="index"
										:title="p.player.name"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
									</v-list-item>
								</v-list>

								<p
									class="
										mt-3
										text-uppercase text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										text-grey-darken-3
										bg-grey-lighten-3
									"
								>
									Substitutes
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in fixtureDetail.lineups[0].substitutes"
										:key="index"
										:title="p.player.name"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
									</v-list-item>
								</v-list>
							</v-card-text>
						</v-card>
					</v-window-item>
					<v-window-item value="away">
						<v-card color="white" class="mt-3">
							<v-card-text
								class="d-flex justify-space-between align-center bg-primary"
							>
								<p
									class="text-body-1 font-weight-medium text-uppercase"
									style="letter-spacing: 1px !important"
								>
									{{ fixtureDetail.teams.away.name }}
								</p>
								<v-avatar size="30" large class="rounded-circle">
									<v-img
										class="rounded-circle"
										lazy-src="../assets/logo.jpg"
										:src="fixtureDetail.teams.away.logo"
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
									<p>{{ fixtureDetail.lineups[1].formation }}</p>
								</div>
								<p
									class="
										mt-3
										text-uppercase text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										text-grey-darken-3
										bg-grey-lighten-3
									"
								>
									Coach
								</p>

								<v-list lines="one">
									<v-list-item :title="fixtureDetail.lineups[1].coach.name">
										<template v-slot:append>
											<v-icon icon="mdi-circle-right"></v-icon>
										</template>
									</v-list-item>
								</v-list>

								<p
									class="
										mt-3
										text-uppercase text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										text-grey-darken-3
										bg-grey-lighten-3
									"
								>
									Starting XI
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in fixtureDetail.lineups[1].startXI"
										:key="index"
										:title="p.player.name"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
									</v-list-item>
								</v-list>

								<p
									class="
										mt-3
										text-uppercase text-body-2
										font-weight-bold
										py-2
										px-2
										rounded
										text-grey-darken-3
										bg-grey-lighten-3
									"
								>
									Substitutes
								</p>

								<v-list lines="one">
									<v-list-item
										v-for="(p, index) in fixtureDetail.lineups[1].substitutes"
										:key="index"
										:title="p.player.name"
									>
										<template v-slot:prepend>
											<p
												style="width: 50px"
												class="font-weight-bold text-grey-lighten-1"
											>
												{{ p.player.number }}
											</p>
										</template>
									</v-list-item>
								</v-list>
							</v-card-text>
						</v-card>
					</v-window-item>
				</v-window>
			</v-col>
		</v-row>
	</v-container>
	<BottomNavigation :value="page" />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import logo from "@/assets/logo.jpg";
import { mapGetters, mapActions } from "vuex";

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
		tab: null,
	}),
	methods: {
		...mapActions({
			showDialogAction: "general/showDialogAction",
		}),
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
