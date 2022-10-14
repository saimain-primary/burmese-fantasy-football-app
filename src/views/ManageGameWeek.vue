<template>
  <v-container class="mt-8">
    <v-card class="px-5 py-5">
      <p class="text-body-2 mb-3">Current Game Week</p>
      <v-select
        :items="gameWeekList"
        label="Game Week"
        variant="outlined"
        class="mb-2"
        v-model="formData.gameWeek"
      ></v-select>
      <div class="text-center">
        <v-btn color="primary" @click="onAddSubmitHandler">
          Change Game Week</v-btn
        >
      </div>
    </v-card>
    <v-card class="px-5 py-5 mt-8">
      <p class="text-body-2 mb-3">Add Game Week</p>
      <v-text-field
        variant="outlined"
        v-model="formData.gameWeek"
        label="Game Week Number"
        color="primary"
        class="mb-2"
        type="text"
      >
      </v-text-field>
      <v-text-field
        variant="outlined"
        v-model="formData.startDate"
        label="Start Date"
        color="primary"
        class="mb-2"
        type="date"
      >
      </v-text-field>
      <v-text-field
        variant="outlined"
        v-model="formData.endDate"
        label="End Date"
        color="primary"
        class="mb-2"
        type="date"
      >
      </v-text-field>
      <div class="text-center">
        <v-btn color="primary" @click="onAddSubmitHandler">
          Submit Game Week</v-btn
        >
      </div>
    </v-card>
  </v-container>
  <BottomNavigation :value="page" />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Manage Game Week",
  components: { BottomNavigation },
  computed: {
    ...mapGetters({}),
  },
  data: () => ({
    page: "profile",
    formData: {
      startDate: null,
      endDate: null,
      gameWeek: null,
    },
    gameWeekList: [],
  }),
  methods: {
    ...mapActions({
      storeGameWeekAction: "gameweek/storeGameWeekAction",
      showDialogAction: "general/showDialogAction",
      getGameWeekAction: "gameweek/getGameWeekAction",
    }),
    async onAddSubmitHandler() {
      const response = await this.storeGameWeekAction(this.formData);
      if (response.code !== 200) {
        this.showDialogAction({
          title: "Whoops!",
          body: response.message,
        });
      } else {
        this.formData = {
          startDate: null,
          endDate: null,
          gameWeek: null,
        };
      }
    },
  },
  async mounted() {
    for (let index = 0; index < 40; index++) {
      this.gameWeekList.push("Game Week " + index);
    }

    const response = await this.getGameWeekAction();
    console.log(response);  
  },
};
</script>

<style></style>
