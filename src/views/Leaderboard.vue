<template>
  <v-container>
    <v-row>
      <v-col>
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
                      class="bg-white text-primary"
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

  <div class="d-flex mt-16 flex-column justify-space-between align-center">
    <v-img class="" :src="nodata" width="100"></v-img>
    <p class="text-body-2 text-grey-darken-1 mt-3"><b>No data Available!</b></p>
  </div>
  <v-container>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </v-container>

  <BottomNavigation />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import nodata from "@/assets/no_data.svg";

export default {
  name: "Tournament",
  components: { BottomNavigation },
  data: () => ({
    showFilterDialog: false,

    nodata: nodata,
    leagues: ["Premier League", "World Cup 2022"],
    gameweeks: ["Game Week 1", "Game Week 2", "Game Week 3"],
  }),
  mounted() {},
};
</script>
