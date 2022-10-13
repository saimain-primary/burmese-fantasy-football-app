<template>
  <div class="banner-div">
    <v-img :src="cover" cover></v-img>
    <div class="signup-form-div">
      <v-card>
        <div class="py-5 px-5">
          <v-text-field
            variant="outlined"
            placeholder="New Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="mb-2"
            label="New Password"
            color="primary"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
          <v-text-field
            variant="outlined"
            placeholder="Confirm New Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="mb-2"
            label="Confirm New Password"
            color="primary"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>

          <div class="d-flex justify-space-between align-center">
            <v-btn variant="flat" to="/profile"> Cancel </v-btn>
            <v-btn to="/verify" color="primary" variant="flat">
              Change Password
            </v-btn>
          </div>
        </div>
      </v-card>
      <div class="text-center mt-10">
        <v-btn to="/login" class="text-primary" size="small" variant="text"
          ><b>Login to account</b></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.jpg";
import cover from "@/assets/cover.jpeg";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "Sign Up",
  components: {},
  computed: {
    ...mapGetters({
      teams: "simpleTeams",
      regions: "general/regions",
    }),
  },
  data: () => ({
    logo: logo,
    cover: cover,
    showPassword: false,
    showConfirmPassword: false,
  }),
  methods: {
    ...mapActions({
      getPremierLeagueTeamListAction: "getPremierLeagueTeamListAction",
    }),
  },
  async mounted() {
    await this.getPremierLeagueTeamListAction();
  },
};
</script>

<style scoped>
.banner-div {
  position: relative;
}

.signup-form-div {
  position: absolute;
  top: 150px;
  left: 10px;
  right: 10px;
}
</style>
