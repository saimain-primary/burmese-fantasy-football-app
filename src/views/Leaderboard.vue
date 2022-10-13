<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="">
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
            :items="gameweeks"
            label="Game Week"
            variant="outlined"
            color="primary"
            class=""
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <div class="d-flex mt-10 flex-column justify-space-between align-center">
    <v-img class="" :src="nodata" width="180"></v-img>
    <p class="text-body-1 text-dark mt-3"><b>No data Available!</b></p>
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
    nodata: nodata,
    leagues: ["Premier League", "World Cup 2022"],
    gameweeks: ["Game Week 1", "Game Week 2", "Game Week 3"],
  }),
  mounted() {},
};
</script>
