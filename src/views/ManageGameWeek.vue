<template>
  <v-container class="mt-8">
    <v-select
      :items="gameWeekList"
      label="Game Week"
      variant="outlined"
      class="mb-2"
      v-model="gameWeek"
    ></v-select>
    <v-text-field
      variant="outlined"
      v-model="startDate"
      label="Start Date"
      color="primary"
      class="mb-2"
      type="date"
    >
    </v-text-field>
    <v-text-field
      variant="outlined"
      v-model="endDate"
      label="End Date"
      color="primary"
      class="mb-2"
      type="date"
    >
    </v-text-field>
    <div class="text-center">
      <v-btn color="primary"> Submit Game Week</v-btn>
    </div>
  </v-container>
  <BottomNavigation :value="page" />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";

export default {
  name: "Manage Game Week",
  components: { BottomNavigation },
  data: () => ({
    page: "profile",
    startDate: null,
    endDate: null,
    gameWeek: null,
    gameWeekList: [],
  }),
  methods: {},
  mounted() {
    for (let index = 0; index < 40; index++) {
      this.gameWeekList.push("Game Week " + index);
    }
  },
};
</script>

<style></style>
