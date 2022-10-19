<template>
	<v-dialog>
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
						v-model="prediction.homeTeamPrediction"
					/>
					<div style="width: 30px"><span>:</span></div>
					<scroll-picker
						:options="options"
						v-model="prediction.awayTeamPrediction"
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
					v-model="prediction.useTwoXBooster"
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
</template>

<script>
import ScrollPicker from "vue3-scroll-picker";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "Prediction Dialog",
	components: { ScrollPicker },
	computed: {
		...mapGetters({
			prediction: "prediction/prediction",
		}),
	},
	data() {
		return {
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
	methods: { ...mapActions({}) },
	mounted() {
		console.log("this", this.$props);
		console.log("is", this.isShowDialog);
	},
};
</script>