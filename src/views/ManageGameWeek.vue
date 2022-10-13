<template>
  <v-container class="mt-8">
    <v-date-picker v-model="picker"></v-date-picker>
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
    dates: null,
    picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  methods: {},
  mounted() {},
};
</script>

<style>
.dp__theme_light {
  --dp-primary-color: #4c2fe3;
  --dp-success-color: #4c2fe3;
}
</style>
