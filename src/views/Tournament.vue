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

        <v-card color="primary">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">Premier League </v-card-title>
              <v-card-subtitle>Game Week 1</v-card-subtitle>
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
                      model-value="Game Week 1"
                      :items="gameweeks"
                      label="Game Week"
                      variant="outlined"
                      color="primary"
                      class=""
                    ></v-select>
                    <v-btn color="primary">Filter</v-btn>
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

  <!-- <div class="d-flex mt-16 flex-column justify-space-between align-center">
    <v-img class="" :src="nodata" width="100"></v-img>
    <p class="text-body-2 text-grey-darken-1 mt-3"><b>No data Available!</b></p>
  </div> -->
  <v-container>
    <v-row>
      <v-col>
        <p class="mb-3 font-weight-medium text-body-1">Matches</p>
        <v-card class="pa-5 mb-3">
          <div class="d-flex justify-space-between align-center">
            <p class="font-weight-bold text-body-2">Sun 2 Oct 2022</p>
            <p
              class="text-caption text-uppercase font-weight-medium text-primary"
              style="font-size: 10px !important"
            >
              View Detail
              <v-icon>mdi-arrow-right</v-icon>
            </p>
          </div>
          <v-divider class="my-3"></v-divider>
          <div
            class="d-flex text-center mt-5 justify-space-between align-center"
          >
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
            <div>
              <p class="text-overline text-success">Finished</p>
              <div
                class="border rounded py-1 px-3"
                style="width: 80px; margin: 0 auto"
              >
                <p class="text-caption">8:30 PM</p>
              </div>
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
          <div class="text-caption mt-5">
            <div class="d-flex justify-space-between align-center">
              <p>Your Prediction</p>
              <p class="font-weight-medium">
                <span
                  class="text-success text-uppercase font-weight-medium"
                  style="font-size: 10px"
                  >2x Boosted</span
                >
                1 : 2
              </p>
            </div>
            <div class="d-flex justify-space-between align-center">
              <p class="">Full Time Result</p>
              <p class="font-weight-medium">1 : 1</p>
            </div>
          </div>
          <!-- <v-alert
            class="mt-3 text-center"
            height="28px"
            density="compact"
            variant="flat"
          >
            <span class="text-caption font-weight-medium text-uppercase"
              >You got <span class="text-primary">+4</span> Pts</span
            >
          </v-alert> -->
          <div class="text-center mt-3">
            <v-btn
              size="small"
              @click="predictionDialogHandler"
              color="primary"
            >
              Predict Match</v-btn
            >
          </div>
        </v-card>

        <v-card class="pa-5 mb-3">
          <div class="d-flex justify-space-between align-center">
            <p class="font-weight-bold text-body-2">Sun 2 Oct 2022</p>
            <p
              class="text-caption text-uppercase font-weight-medium text-primary"
              style="font-size: 10px !important"
            >
              View Detail
              <v-icon>mdi-arrow-right</v-icon>
            </p>
          </div>
          <v-divider class="my-3"></v-divider>
          <div
            class="d-flex text-center mt-5 justify-space-between align-center"
          >
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
            <div>
              <p class="text-overline text-success">Started</p>
              <div
                class="border rounded py-1 px-3"
                style="width: 80px; margin: 0 auto"
              >
                <p class="text-caption">8:30 PM</p>
              </div>
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
          <div class="text-caption mt-5">
            <div class="d-flex justify-space-between align-center">
              <p>Your Prediction</p>
              <p class="font-weight-medium">
                <span
                  class="text-success text-uppercase font-weight-medium"
                  style="font-size: 10px"
                  >2x Boosted</span
                >
                1 : 2
              </p>
            </div>
            <div class="d-flex justify-space-between align-center">
              <p class="">Full Time Result</p>
              <p class="font-weight-medium">1 : 1</p>
            </div>
          </div>
          <!-- <v-alert
            class="mt-3 text-center"
            height="28px"
            density="compact"
            variant="flat"
          >
            <span class="text-caption font-weight-medium text-uppercase"
              >You got <span class="text-primary">+4</span> Pts</span
            >
          </v-alert> -->
          <div class="text-center mt-3">
            <v-btn
              size="small"
              @click="predictionDialogHandler"
              color="primary"
            >
              Predict Match</v-btn
            >
          </div>
        </v-card>

        <v-card class="pa-5 mb-3">
          <div class="d-flex justify-space-between align-center">
            <p class="font-weight-bold text-body-2">Sun 2 Oct 2022</p>
            <p
              class="text-caption text-uppercase font-weight-medium text-primary"
              style="font-size: 10px !important"
            >
              View Detail
              <v-icon>mdi-arrow-right</v-icon>
            </p>
          </div>
          <v-divider class="my-3"></v-divider>
          <div
            class="d-flex text-center mt-5 justify-space-between align-center"
          >
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
            <div>
              <p class="text-overline text-success">Not Started</p>
              <div
                class="border rounded py-1 px-3"
                style="width: 80px; margin: 0 auto"
              >
                <p class="text-caption">8:30 PM</p>
              </div>
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
          <div class="text-caption mt-5">
            <div class="d-flex justify-space-between align-center">
              <p>Your Prediction</p>
              <p class="font-weight-medium">
                <span
                  class="text-success text-uppercase font-weight-medium"
                  style="font-size: 10px"
                  >2x Boosted</span
                >
                1 : 2
              </p>
            </div>
            <div class="d-flex justify-space-between align-center">
              <p class="">Full Time Result</p>
              <p class="font-weight-medium">1 : 1</p>
            </div>
          </div>
          <!-- <v-alert
            class="mt-3 text-center"
            height="28px"
            density="compact"
            variant="flat"
          >
            <span class="text-caption font-weight-medium text-uppercase"
              >You got <span class="text-primary">+4</span> Pts</span
            >
          </v-alert> -->
          <div class="text-center mt-3">
            <v-btn
              size="small"
              @click="predictionDialogHandler"
              color="primary"
            >
              Predict Match</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <BottomNavigation />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import nodata from "@/assets/no_data.svg";
import logo from "@/assets/logo.jpg";
import ScrollPicker from "vue3-scroll-picker";

export default {
  name: "Tournament",
  components: { BottomNavigation, ScrollPicker },
  data: () => ({
    showFilterDialog: false,
    logo: logo,
    nodata: nodata,
    leagues: ["Premier League", "World Cup 2022"],
    gameweeks: ["Game Week 1", "Game Week 2", "Game Week 3"],
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
      ],
    ],
  }),
  methods: {
    predictionDialogHandler() {
      this.showPredictionDialog = true;
    },
  },
  mounted() {},
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
</style>
