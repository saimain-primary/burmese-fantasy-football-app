<template>
  <v-app-bar max-height="60" color="primary" flat fixed>
    <h3 class="app-name-text text-uppercase">{{ pageName }}</h3>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  props: ["pageName"],
};
</script>

<style scoped>
.app-name-text {
  color: white;
  font-weight: 500;
  letter-spacing: 0.5px;
  font-size: 16px;
  padding-left: 14px;
}
</style>
