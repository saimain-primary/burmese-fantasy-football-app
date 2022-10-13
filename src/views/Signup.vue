<template>
  <div class="banner-div">
    <v-img :src="cover" cover></v-img>
    <div class="signup-form-div">
      <v-card class="mb-5">
        <v-form ref="form" class="py-5 px-5">
          <v-text-field
            variant="outlined"
            placeholder="Aung Aung"
            label="Name"
            class="mb-2"
            color="primary"
            type="text"
            v-model="formData.name"
            :rules="formRules.name"
          >
          </v-text-field>
          <v-text-field
            variant="outlined"
            placeholder="0912345678"
            label="Phone"
            color="primary"
            class="mb-2"
            v-model="formData.phone"
            :rules="formRules.phone"
            type="tel"
          >
          </v-text-field>
          <v-select
            :items="regions"
            label="Your Region"
            variant="outlined"
            class="mb-2"
            v-model="formData.region"
            :rules="formRules.region"
          ></v-select>
          <v-select
            label="Your Favorite Team"
            variant="outlined"
            :rules="formRules.favorite_team"
            v-model="formData.favorite_team"
            :items="teams"
            class="mb-2"
          ></v-select>
          <v-text-field
            variant="outlined"
            placeholder="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="mb-2"
            label="Password"
            v-model="formData.password"
            color="primary"
            :rules="formRules.password"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>

          <div class="d-flex justify-space-between align-center">
            <v-btn variant="flat" to="/profile"> Cancel </v-btn>
            <v-btn @click="onSubmitHandler" color="primary" variant="flat">
              Sign Up
            </v-btn>
          </div>
        </v-form>
      </v-card>
      <div class="text-center mb-16">
        <v-btn to="/login" class="text-primary" size="small" variant="text"
          ><b>Login to your account</b></v-btn
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
    formData: {
      name: "Sai Main",
      phone: "09756783439",
      favorite_team: "Manchester United",
      region: "Yangon",
      password: "111111",
    },
    formRules: {
      name: [(v) => !!v || "Name is required"],
      phone: [(v) => !!v || "Phone is required"],
      region: [(v) => !!v || "Please select your region"],
      favorite_team: [(v) => !!v || "Please choose your favorite team"],
      password: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password should have more than 6 characters",
      ],
    },
  }),
  methods: {
    ...mapActions({
      toggleLoading: "toggleLoading",
      getPremierLeagueTeamListAction: "getPremierLeagueTeamListAction",
      signupAccountAction: "signupAccountAction",
      showDialogAction: "general/showDialogAction",
      storeForVerifyAction: "storeForVerifyAction",
    }),
    async onSubmitHandler() {
      const checkValidate = await this.$refs.form.validate();
      if (checkValidate.valid) {
        const response = await this.signupAccountAction(this.formData);
        console.log("response from vue", response);
        if (response.code === 200) {
          this.storeForVerifyAction({
            phone: this.formData.phone,
            password: this.formData.password,
          });
          this.$router.push("/verify");
        } else {
          this.showDialogAction({
            title: "Whoops!",
            body: response.results.message,
          });
        }
      } else {
        this.toggleLoading(false);
      }
    },
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
