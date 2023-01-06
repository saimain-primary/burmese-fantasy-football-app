<template>
    <div class="d-flex mt-10 flex-column justify-space-between align-center">
        <v-img class="" :src="verify" width="180"></v-img>
    </div>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-center">
                    <div class="py-5 px-5 mb-5">
                        <p class="text-body-2 mb-5">
                            We have send code to you phone number
                        </p>
                        <v-text-field
                            variant="outlined"
                            placeholder="123456"
                            label="OTP Code"
                            color="primary"
                            type="tel"
                            v-model="formData.code"
                        >
                        </v-text-field>
                        <p class="text-start text-body-2 mb-5">
                            Didn't receive code?
                            <span class="text-primary"><b>Resend</b></span>
                        </p>

                        <div class="d-flex justify-space-between align-center">
                            <v-btn variant="flat" to="/profile"> Cancel </v-btn>
                            <v-btn
                                @click="onSubmitHandler"
                                color="primary"
                                variant="flat"
                                >Verify</v-btn
                            >
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import verify from "@/assets/verify.svg";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Sign Up",
    components: {},
    computed: {
        ...mapGetters({
            verifyData: "verifyData",
        }),
    },
    data: () => ({
        verify: verify,
        formData: {
            phone: "",
            code: "",
        },
    }),
    methods: {
        ...mapActions({
            toggleLoading: "toggleLoading",
            verifyAccountAction: "auth/verifyAccountAction",
            showDialogAction: "general/showDialogAction",

            resetPasswordAction: "auth/resetPasswordAction",
        }),
        async onSubmitHandler() {
            try {
                const response = await this.resetPasswordAction(this.formData);
                if (response.code === 200) {
                    this.$router.replace(
                        "/change-password?phone=" +
                            response.results.phone +
                            "&token=" +
                            response.results.token
                    );
                } else {
                    this.showDialogAction({
                        title: "Whoops!",
                        body: response.results,
                    });
                }
            } catch (error) {
                this.showDialogAction({
                    title: "Whoops!",
                    body: "Something went wrong",
                });
                console.log("herr verify");
            }
        },
    },
    mounted() {
        this.formData.phone = this.$route.query.phone;
        console.log("verify data", this.phone);
    },
};
</script>

<style scoped></style>
