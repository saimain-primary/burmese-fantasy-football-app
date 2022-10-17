<template>
  <v-card v-if="venueDetail" elevation="0" class="mx-auto">
    <v-img
      class="align-end text-white"
      height="200"
      :src="venueDetail.image"
      cover
    >
      <v-card-title class="text-body-1 stadium-text-bg"
        ><v-icon icon="mdi-map-marker-radius" size="small"></v-icon>
        {{ venueDetail.name }}</v-card-title
      >
    </v-img>

    <v-card-subtitle v-if="fixtureDetail" class="pt-4">{{
      moment(new Date(fixtureDetail.fixture.date), moment.ISO_8601).format(
        "ddd D MMM YYYY , h:mm A"
      )
    }}</v-card-subtitle>

    <v-card
      v-if="fixtureDetail"
      class="d-flex mx-3 justify-space-between px-5 py-5 mt-5 align-center gameweek-deadline-card"
    >
      <div class="d-flex align-center justify-center" style="width: 100px">
        <p class="mr-3 text-body-1 text-center">
          {{ getTeamCode(fixtureDetail.teams.home.id) }}
        </p>
        <v-avatar size="40" large class="rounded-circle">
          <v-img
            class="rounded-circle"
            lazy-src="../assets/logo.jpg"
            :src="fixtureDetail.teams.home.logo"
          ></v-img>
        </v-avatar>
      </div>
      <div class="mx-3 text-center" style="width: 100px">
        <p class="text-h5 font-weight-medium">
          {{ fixtureDetail.goals.home ? fixtureDetail.goals.home : 0 }} -
          {{ fixtureDetail.goals.away ? fixtureDetail.goals.away : 0 }}
        </p>
      </div>
      <div class="d-flex align-center justify-center" style="width: 100px">
        <v-avatar size="40" large class="rounded-circle">
          <v-img
            class="rounded-circle"
            lazy-src="../assets/logo.jpg"
            :src="fixtureDetail.teams.away.logo"
          ></v-img>
        </v-avatar>
        <p class="ml-3 text-body-1 text-center">
          {{ getTeamCode(fixtureDetail.teams.away.id) }}
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
        <p class="">{{ fixtureDetail.fixture.status.long }}</p>
      </v-btn>
    </div>

    <v-card-text>
      <p class="text-overline">Scores</p>
      <v-divider class="mb-2 mt-1"></v-divider>
      <div
        v-if="fixtureDetail.score.halftime.home"
        class="d-flex justify-space-between align-center"
      >
        <p>Half Time</p>
        <p>
          {{
            fixtureDetail.score.halftime.home +
            " : " +
            fixtureDetail.score.halftime.away
          }}
        </p>
      </div>
      <div
        v-if="fixtureDetail.score.fulltime.home"
        class="d-flex justify-space-between align-center"
      >
        <p>Full Time</p>
        <p>
          {{
            fixtureDetail.score.fulltime.home +
            " : " +
            fixtureDetail.score.fulltime.away
          }}
        </p>
      </div>
      <div
        v-if="fixtureDetail.score.extratime.home"
        class="d-flex justify-space-between align-center"
      >
        <p>Extra Time</p>
        <p>
          {{
            fixtureDetail.score.extratime.home +
            " : " +
            fixtureDetail.score.extratime.away
          }}
        </p>
      </div>
      <div
        v-if="fixtureDetail.score.penalty.home"
        class="d-flex justify-space-between align-center"
      >
        <p>Penalty</p>
        <p>
          {{
            fixtureDetail.score.penalty.home +
            " : " +
            fixtureDetail.score.penalty.away
          }}
        </p>
      </div>
    </v-card-text>

    <v-container>
      <v-row>
        <v-col>
          <v-card color="primary" class="mt-3">
            <v-card-text>
              Line-ups
              <span class="float-right">
                <v-icon icon="mdi-arrow-right"></v-icon>
              </span>
            </v-card-text>
          </v-card>
          <v-card color="primary" class="mt-3">
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
  props: ["id"],
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
  }),
  methods: {
    moment,
    ...mapActions({
      showDialogAction: "general/showDialogAction",
      getFixtureDetail: "fixture/getFixtureDetail",
      getPremierLeagueTeamListAction: "getPremierLeagueTeamListAction",
    }),
    getTeamCode(id) {
      console.log(this.teams);
      const team = this.teams.filter((t) => {
        return t.team.id === id;
      });
      return team[0].team.code;
    },
    predictionDialogHandler() {
      this.showPredictionDialog = true;
    },
  },
  async mounted() {
    if (this.teams.length <= 0) {
      await this.getPremierLeagueTeamListAction();
    }
    const response = await this.getFixtureDetail(this.id);
    if (response.code !== 200) {
      this.showDialogAction({
        title: "Whoops!",
        body: response.message,
      });
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
