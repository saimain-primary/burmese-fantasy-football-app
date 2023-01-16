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
                        v-model="formData.password"
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
                        v-model="formData.password_confirmation"
                        color="primary"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                    >
                    </v-text-field>

                    <div class="d-flex justify-space-between align-center">
                        <v-btn variant="flat" to="/profile"> Cancel </v-btn>
                        <v-btn
                            @click.prevent="changePassword"
                            color="primary"
                            variant="flat"
                        >
                            Change Password
                        </v-btn>
                    </div>
                </div>
            </v-card>
            <div class="text-center mt-10">
                <v-btn
                    to="/login"
                    class="text-primary"
                    size="small"
                    variant="text"
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
        formData: {
            token: "",
            phone: "",
            password: "",
            password_confirmation: "",
        },
    }),
    methods: {
        ...mapActions({
            getPremierLeagueTeamListAction: "getPremierLeagueTeamListAction",
            showDialogAction: "general/showDialogAction",
            toggleSnackBarAction: "general/toggleSnackBarAction",

            changePasswordAction: "auth/changePasswordAction",
        }),
        async changePassword() {
            if (
                this.formData.password !== this.formData.password_confirmation
            ) {
                this.showDialogAction({
                    title: "Whoops!",
                    body: "Password and Confirm Password are Mismatch",
                });
            } else {
                const response = await this.changePasswordAction(this.formData);
                if (response.code !== 200) {
                    this.showDialogAction({
                        title: "Whoops!",
                        body: response.results,
                    });
                } else {
                    this.toggleSnackBarAction({
                        show: true,
                        text: "Password Changed",
                        close: false,
                    });
                    this.$router.replace("/login");
                }
            }
        },
    },
    async mounted() {
        this.formData.phone = this.$route.query.phone;
        this.formData.token = this.$route.query.token;
        // await this.getPremierLeagueTeamListAction();
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
