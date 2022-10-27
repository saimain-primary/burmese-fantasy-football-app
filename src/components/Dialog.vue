<template>
	<v-dialog v-model="dialogData.show" :persistent="dialogData.persistent">
		<v-card>
			<v-card-title>
				{{ dialogData.title }}
			</v-card-title>
			<v-card-text>
				{{ dialogData.body }}
				<v-list v-if="dialogData.list">
					<v-list-item v-for="(l, index) in dialogData.list" :key="index">{{
						l
					}}</v-list-item>
				</v-list>
			</v-card-text>
			<v-card-actions>
				<v-btn
					v-if="dialogData.link"
					color="primary"
					variant="text"
					@click="goToLink(dialogData.link)"
				>
					{{ dialogData.linkText }}
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn
					v-if="dialogData.close"
					color="grey darken-1"
					text
					@click="dialogData.show = false"
				>
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters({
			dialogData: "general/dialogData",
		}),
	},
	methods: {
		...mapActions({
			closeDialogAction: "general/closeDialogAction",
		}),
		goToLink(link) {
			this.$router.push(link);
			this.closeDialogAction();
		},
	},
};
</script>
