<template>
	<div class="header-div">
		<div class="text-center avatar-div">
			<v-avatar size="100" variant="elevated" class="avatar" color="white">
				<v-img
					:src="favoriteTeam ? favoriteTeam.team.logo : logo"
					:lazy-src="logo"
					class="rounded-circle"
					max-height="100"
					max-width="100"
				>
				</v-img>
			</v-avatar>
		</div>
	</div>
	<v-container class="mt-8">
		<v-row class="primary">
			<v-col>
				<v-list class="text-center">
					<template v-if="authenticated">
						<v-list-item-title class="text-h6">{{
							user.name
						}}</v-list-item-title>
						<v-list-item-title class="mb-2 text-body-1">{{
							user.phone
						}}</v-list-item-title>
						<v-list-item-subtitle class="mb-1"
							>Region : {{ user.region }}
						</v-list-item-subtitle>
						<v-list-item-subtitle
							>Favorite Team : {{ user.favoriteTeam }}</v-list-item-subtitle
						>
					</template>

					<template v-else>
						<v-list-item>
							<v-btn to="/login" color="primary" variant="flat" class=""
								>Login account</v-btn
							>
						</v-list-item>
						<v-list-item>
							<v-btn variant="text" color="primary" to="/signup" size="small"
								>Signup new account for free</v-btn
							>
						</v-list-item>
					</template>
				</v-list>
				<v-card
					v-if="authenticated && user.isAdmin"
					tonal
					class="mt-5"
					elevation="1"
				>
					<v-list>
						<v-list-item to="/manage-gw" active-color="primary" variant="plain">
							<v-list-item-title
								><v-icon class="mr-3">mdi-calendar-range</v-icon>Manage Game
								Week</v-list-item-title
							>
						</v-list-item>
					</v-list>
				</v-card>
				<v-card tonal class="mt-5" elevation="1">
					<v-list>
						<v-list-item
							active-color="primary"
							variant="plain"
							@click="showDataDialog('terms')"
						>
							<v-list-item-title
								><v-icon class="mr-3">mdi-clipboard-text</v-icon>Terms &
								Conditions</v-list-item-title
							>
						</v-list-item>
						<v-list-item
							active-color="primary"
							variant="plain"
							@click="showDataDialog('faq')"
						>
							<v-list-item-title
								><v-icon class="mr-3">mdi-help</v-icon>Frequently Asked
								Question</v-list-item-title
							>
						</v-list-item>
						<v-list-item
							active-color="primary"
							variant="plain"
							@click="showDataDialog('feedback')"
						>
							<v-list-item-title
								><v-icon class="mr-3">mdi-star</v-icon>Give Us
								Feedbacks</v-list-item-title
							>
						</v-list-item>
						<v-list-item
							active-color="primary"
							variant="plain"
							@click="showDataDialog('contact')"
						>
							<v-list-item-title
								><v-icon class="mr-3">mdi-phone-in-talk</v-icon> Contact
								Us</v-list-item-title
							>
						</v-list-item>
					</v-list>
				</v-card>
				<div v-if="authenticated" class="text-center">
					<v-btn
						@click="logoutHandler"
						color="danger"
						size="small"
						class="mt-5"
						variant="flat"
						>Logout</v-btn
					>
					<p class="mt-5" style="font-size: 12px">Version : 2.0.0</p>
				</div>
			</v-col>
		</v-row>
	</v-container>
	<BottomNavigation />
</template>

<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import { mapGetters, mapActions } from "vuex";
import logo from "@/assets/logo.jpg";
export default {
	name: "Profile",
	components: { BottomNavigation },
	data: () => ({
		logo: logo,
		dialogData: {
			dialogPersistent: false,
			dialogTitle: "",
			dialogBody: "",
			dialogList: null,
			dialogLink: null,
			dialogLinkText: "",
		},
	}),
	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			user: "auth/user",
			favoriteTeam: "auth/favoriteTeam",
		}),
	},
	methods: {
		...mapActions({
			showDialogAction: "general/showDialogAction",
			getMeAction: "auth/getMeAction",
			getFavoriteTeamAction: "auth/getFavoriteTeamAction",
			logoutAction: "auth/logoutAction",
		}),
		showDataDialog(data) {
			switch (data) {
				case "terms":
					this.dialogData.dialogTitle = "Terms and Conditions";
					this.dialogData.dialogBody = "အမှတ်ပေးစည်းမျဉ်း";
					this.dialogData.dialogList = [
						"❖ အရှုံး၊ အနိုင်၊ သရေ ရလဒ် မှန်အောင်ခန့်မှန်းနိုင်ပါက တစ်ပွဲလျှင် ၃ မှတ်",
						"❖ အသင်းတစ်သင်းအတွက် ဂိုးရလဒ်မှန်အောင်ခန့်မှန်းနိုင်ပါက တစ်သင်းလျှင် ၁ မှတ်",
						"❖ ဂိုးကွာခြားချက်မှန်ကန်ပါက ၁ မှတ်",
						"❖ 2x booster ရွေးထားတဲ့ပွဲရဲ့ ရလဒ်အတွက် ရမှတ် x 2ဆ",
						"❖ ရမှတ်တူရှိရင် မဲနှိုက်ရွေးချယ်ပေးသွားပါမယ်",
					];
					this.dialogData.dialogLink = null;
					this.dialogData.dialogLinkText = "";
					break;
				case "faq":
					this.dialogData.dialogTitle = "Frequently Asked Questions";
					this.dialogData.dialogList = [
						`❖ Burmese Fantasy Football (BFF) ဆိုတာဘာလဲ။ ဘောလုံးပွဲခန့်မှန်းရတာ၊ Fantasy Football ဂိမ်းတွေဆော့ရတာနှစ်ခြိုက်တဲ့ ဘောလုံးဖန်တွေအတွက် ပြိုင်ပွဲတွေဝင်ရောက်ယှဉ်ပြိုင်ပြီး ဆုလက်ဆောင်တွေရယူနိုင်မယ့် App ပဲ ဖြစ်ပါတယ်။`,
						`❖ ဝင်ကြေးရှိလား။ ဝင်ကြေး အခမဲ့ပါ။`,
						`❖ ဆုကြေးကဘယ်လိုလဲ။ အပတ်စဉ်တိုင်းမှာ အမှတ်အများဆုံးသူက "တစ်သောင်းကျပ်" ရရှိမှာဖြစ်ပါတယ်။`,
					];
					this.dialogData.dialogBody = "";
					this.dialogData.dialogLink = null;
					this.dialogData.dialogLinkText = "";
					break;
				case "contact":
					this.dialogData.dialogTitle = "Contact Us";
					this.dialogData.dialogBody =
						"(+95) 9972709001 သို့ ဆက်သွယ်နိုင်ပါသည်။";
					this.dialogData.dialogList = null;
					this.dialogData.dialogLink = null;
					this.dialogData.dialogLinkText = "";
					break;
				case "feedback":
					this.dialogData.dialogTitle = "Give Us Feedbacks";
					this.dialogData.dialogBody =
						"Burmese Fantasy Football ၏ Facebook Messenger တွင် Feedback ပေးနိုင်ပါသည်။";
					this.dialogData.dialogList = null;
					this.dialogData.dialogLink = "https://m.me/BurmeseFantasyFootball";
					this.dialogData.dialogLinkText = "BFF Messenger";
					break;
				default:
					break;
			}
			this.showDialogAction({
				persistent: this.dialogData.dialogPersistent,
				title: this.dialogData.dialogTitle,
				body: this.dialogData.dialogBody,
				list: this.dialogData.dialogList,
				link: this.dialogData.dialogLink,
				linkText: this.dialogData.dialogLinkText,
			});
		},
		logoutHandler() {
			this.logoutAction();
		},
	},
	async mounted() {
		this.$gtag.event("profile");
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
