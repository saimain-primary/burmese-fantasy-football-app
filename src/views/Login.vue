<template>
  <div class="banner-div">
    <v-img :src="cover" cover></v-img>
    <div class="signup-form-div">
      <v-card>
        <v-form ref="form" class="py-5 px-5">
          <v-text-field
            variant="outlined"
            placeholder="0912345678"
            hint="Enter your account phone number"
            label="Phone"
            color="primary"
            :rules="formRules.phone"
            v-model="formData.phone"
            class="mb-2"
            type="tel"
          >
          </v-text-field>
          <v-text-field
            variant="outlined"
            placeholder="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="mb-2"
            label="Password"
            color="primary"
            :rules="formRules.password"
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            hint="Enter your password"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>

          <div class="d-flex justify-space-between align-center">
            <v-btn variant="flat" to="/profile"> Cancel </v-btn>
            <v-btn @click="onSubmitHandler" color="primary" variant="flat">
              Login
            </v-btn>
          </div>
        </v-form>
      </v-card>
      <div class="text-center mt-10">
        <v-btn to="signup" class="text-primary" size="small" variant="text"
          ><b>Signup new account for free</b></v-btn
        >
        <v-btn
          to="/reset-password"
          class="text-danger mt-5"
          size="small"
          variant="text"
          ><b>Forgot Password</b></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.jpg";
import cover from "@/assets/cover.jpeg";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Login",
  components: {},
  computed: {
    ...mapGetters({}),
  },
  data: () => ({
    logo: logo,
    cover: cover,
    showPassword: false,
    showConfirmPassword: false,
    formData: {
      phone: "",
      password: "",
    },
    formRules: {
      phone: [(v) => !!v || "Phone is required"],
      password: [(v) => !!v || "Password is required"],
    },
  }),
  methods: {
    ...mapActions({
      loginAccountAction: "auth/loginAccountAction",
      showDialogAction: "general/showDialogAction",
    }),
    async onSubmitHandler() {
      const checkValidate = await this.$refs.form.validate();
      if (checkValidate.valid) {
        const loginResponse = await this.loginAccountAction(this.formData);
        console.log("login", loginResponse);
        if (loginResponse.code === 200) {
          this.$router.replace("/profile");
        } else {
          this.showDialogAction({
            title: "Whoops!",
            body: loginResponse.results,
          });
        }
      } else {
        this.toggleLoading(false);
      }
    },
  },
  async mounted() {},
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
