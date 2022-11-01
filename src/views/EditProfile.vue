<template>
	<div class="header-div">
		<div class="text-center avatar-div" style="position: relative">
			<v-avatar size="100" variant="elevated" class="avatar" color="white">
				<v-img
					v-if="previewImage"
					class="rounded-circle"
					max-height="100"
					:lazy-src="logo"
					max-width="100"
					:src="previewImage"
				>
				</v-img>
				<v-img
					v-else
					:src="user.profileImage ? profileImageComputed : logo"
					:lazy-src="logo"
					class="rounded-circle"
					max-height="100"
					max-width="100"
				>
				</v-img>
				<input
					style="display: none"
					ref="fileInput"
					type="file"
					@input="pickFile"
				/>
			</v-avatar>
			<v-btn
				@click="selectImage"
				size="x-small"
				icon="mdi-pencil"
				color="white"
				style="position: absolute; left: 210px; bottom: -5px"
			></v-btn>
		</div>
	</div>
	<v-container class="mt-16">
		<v-row class="primary">
			<v-col>
				<v-card class="mb-16">
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
							disabled
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

						<div class="d-flex justify-center align-center">
							<v-btn @click="onSubmitHandler" color="primary" variant="flat">
								Save
							</v-btn>
						</div>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
	<BottomNavigation :value="page" />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import { mapGetters, mapActions } from "vuex";
import logo from "@/assets/logo.jpg";
import axios from "axios";
export default {
	name: "Edit Profile",
	components: { BottomNavigation },
	data: () => ({
		logo: logo,
		page: "profile",
		formData: {
			name: "",
			phone: "",
			favorite_team: "",
			region: "",
		},
		formRules: {
			name: [(v) => !!v || "Name is required"],
			phone: [(v) => !!v || "Phone is required"],
			region: [(v) => !!v || "Please select your region"],
			favorite_team: [(v) => !!v || "Please choose your favorite team"],
		},
		previewImage: null,
		profileImage: null,
	}),
	computed: {
		...mapGetters({
			teams: "simpleTeams",
			regions: "general/regions",
			authenticated: "auth/authenticated",
			user: "auth/user",
			favoriteTeam: "auth/favoriteTeam",
		}),
		profileImageComputed() {
			if (this.authenticated) {
				return process.env.VUE_APP_API_DOMAIN + this.user.profileImage;
			} else {
				return null;
			}
		},
	},
	methods: {
		...mapActions({
			toggleLoading: "toggleLoading",
			showDialogAction: "general/showDialogAction",
			getMeAction: "auth/getMeAction",
			getFavoriteTeamAction: "auth/getFavoriteTeamAction",
			logoutAction: "auth/logoutAction",
			updateAccountAction: "updateAccountAction",
			toggleSnackBarAction: "general/toggleSnackBarAction",
		}),
		async onSubmitHandler() {
			const checkValidate = await this.$refs.form.validate();
			if (checkValidate.valid) {
				const response = await this.updateAccountAction(this.formData);
				if (response.code !== 200) {
					this.showDialogAction({
						title: "Whoops!",
						body: response.results.message,
					});
				}
				this.toggleSnackBarAction({
					show: true,
					text: "Profile updated",
					close: false,
				});
				this.toggleLoading(false);
			} else {
				this.toggleLoading(false);
			}
		},
		selectImage() {
			console.log("select img");
		},
		selectImage() {
			this.$refs.fileInput.click();
		},
		pickFile() {
			let input = this.$refs.fileInput;
			let file = input.files;
			if (file && file[0]) {
				let reader = new FileReader();
				reader.onload = (e) => {
					this.previewImage = e.target.result;
				};
				reader.readAsDataURL(file[0]);
				this.$emit("input", file[0]);

				let frm = new FormData();
				console.log(file[0]);
				this.profileImage = file[0];
				frm.append("profile", file[0]);
				console.log("fm", frm);
				axios
					.post("profile-image", frm)
					.then((res) => {
						console.log(res);
						this.previewImage = null;
						this.$store.commit("auth/setUser", res.data.results);
						this.toggleSnackBarAction({
							show: true,
							text: "Profile picture updated",
							close: false,
						});
						// this.avatar = env.mediaUrl + "/profiles/" + this.user.profile;
						// this.storeUser(res.data.extra);
						// this.showSnackbarAction({
						// 	show: true,
						// 	message: "Profile picture updated.",
						// });
					})
					.catch((e) => {
						console.log(e);
					});
			}
		},
	},
	async mounted() {
		console.log(this.user);
		this.formData.name = this.user.name;
		this.formData.phone = this.user.phone;
		this.formData.region = this.user.region;
		this.formData.favorite_team = this.user.favoriteTeam;
		this.$gtag.event("edit profile");
	},
};
</script>

<style scoped>
.header-div {
	height: 60px;
	background: #4c2fe3;
	border-radius: 0 0 10px 10px;
	position: relative;
}

.avatar-div {
	position: absolute;
	top: 5px;
	left: 0;
	right: 0;
}

.avatar {
	padding: 2px;
}
</style>
