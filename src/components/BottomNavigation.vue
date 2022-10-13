<template>
  <v-bottom-navigation
    color="primary"
    grow
    v-model="value"
    fixed
    height="80"
    class="elevation-1"
  >
    <v-btn value="home" to="/" width="95">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-btn value="tournament" to="/tournament" width="95">
      <v-icon>mdi-trophy</v-icon>
      <span>Tournament</span>
    </v-btn>
    <v-btn value="leaderboard" to="/leaderboard" width="95">
      <v-icon>mdi-podium-gold</v-icon>
      <span>Leaderboard</span>
    </v-btn>
    <v-btn value="profile" to="/profile" width="95">
      <v-icon>mdi-account</v-icon>
      <span>Profile</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style></style>
