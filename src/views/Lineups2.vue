<template>
  <div v-if="fixtureDetail.fixtures[0].lineups.length > 0">
    <v-card class="container" max-width="380px">
      <div class="team">
        <img
          :src="fixtureDetail.fixtures[0].teams.home.logo"
          :alt="fixtureDetail.fixtures[0].teams.home.name"
          class="team-logo"
        />
        <p class="team-name">
          {{ fixtureDetail.fixtures[0].teams.home.name }} ({{
            fixtureDetail.fixtures[0].lineups[0].formation
          }})
        </p>
      </div>
      <div class="pitch">
        <goal-area />
        <line-up :lineups="fixtureDetail.fixtures[0].lineups[0]" />
        <line-up
          :lineups="fixtureDetail.fixtures[0].lineups[1]"
          :isAway="true"
        />
      </div>
      <div class="team">
        <img
          :src="fixtureDetail.fixtures[0].teams.away.logo"
          :alt="fixtureDetail.fixtures[0].teams.away.name"
          class="team-logo"
        />
        <p class="team-name">
          {{ fixtureDetail.fixtures[0].teams.away.name }} ({{
            fixtureDetail.fixtures[0].lineups[1].formation
          }})
        </p>
      </div>
    </v-card>
    <div v-if="fixtureDetail.fixtures[0].lineups.length > 0">
      <v-tabs v-model="tab" bg-color="primary" grow>
        <v-tab value="home">
          {{ fixtureDetail.fixtures[0].teams.home.name }}
        </v-tab>
        <v-tab value="away">
          {{ fixtureDetail.fixtures[0].teams.away.name }}
        </v-tab>
      </v-tabs>
      <v-container>
        <v-row>
          <v-col>
            <v-window v-model="tab">
              <v-window-item value="home">
                <v-card elevation="0">
                  <p
                    class="mt-3 text-body-2 font-weight-bold py-2 px-2 rounded bg-primary"
                  >
                    Coach
                  </p>

                  <v-list lines="one">
                    <v-list-item
                      :title="fixtureDetail.fixtures[0].lineups[0].coach.name"
                    >
                    </v-list-item>
                  </v-list>
                  <p
                    class="mt-3 text-body-2 font-weight-bold py-2 px-2 rounded bg-primary"
                  >
                    Substitutes
                  </p>

                  <v-list lines="one">
                    <v-list-item
                      v-for="(p, index) in fixtureDetail.fixtures[0].lineups[0]
                        .substitutes"
                      :key="index"
                    >
                      <template v-slot:prepend>
                        <p
                          style="width: 50px"
                          class="font-weight-bold text-grey-lighten-1"
                        >
                          {{ p.player.number }}
                        </p>
                      </template>
                      <div class="d-flex justify-space-between align-center">
                        <p>{{ p.player.name }}</p>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-window-item>
            </v-window>
            <v-window v-model="tab">
              <v-window-item value="away">
                <v-card elevation="0">
                  <p
                    class="mt-3 text-body-2 font-weight-bold py-2 px-2 rounded bg-primary"
                  >
                    Coach
                  </p>

                  <v-list lines="one">
                    <v-list-item
                      :title="fixtureDetail.fixtures[0].lineups[1].coach.name"
                    >
                    </v-list-item>
                  </v-list>
                  <p
                    class="mt-3 text-body-2 font-weight-bold py-2 px-2 rounded bg-primary"
                  >
                    Substitutes
                  </p>

                  <v-list lines="one">
                    <v-list-item
                      v-for="(p, index) in fixtureDetail.fixtures[0].lineups[1]
                        .substitutes"
                      :key="index"
                    >
                      <template v-slot:prepend>
                        <p
                          style="width: 50px"
                          class="font-weight-bold text-grey-lighten-1"
                        >
                          {{ p.player.number }}
                        </p>
                      </template>
                      <div class="d-flex justify-space-between align-center">
                        <p>{{ p.player.name }}</p>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-window-item>
            </v-window>
          </v-col></v-row
        >
      </v-container>
    </div>
  </div>
  <div
    v-else
    class="d-flex mt-16 flex-column justify-space-between align-center"
  >
    <v-img class="" :src="nodata" width="100"></v-img>
    <p class="text-body-2 text-grey-darken-1 mt-3">
      <b>No Data Available!</b>
    </p>
    <v-btn @click="this.$router.go(-1)" color="primary mt-5">
      Back to Match Detail
    </v-btn>
  </div>
  <BottomNavigation :value="page" />
</template>

<script>
import BottomNavigation from '../components/BottomNavigation.vue';
import LineUp from '../components/Pitch/LineUp.vue';
import GoalArea from '../components/Pitch/GoalArea.vue';
import logo from '@/assets/logo.jpg';
import { mapGetters, mapActions } from 'vuex';
import nodata from '@/assets/no_data.svg';

export default {
  name: 'Lineups 2',
  components: { BottomNavigation, GoalArea, LineUp },
  computed: {
    ...mapGetters({
      fixtureDetail: 'fixture/fixtureDetail',
    }),
  },
  data: () => ({
    page: 'Line Ups 2',
    logo: logo,
    nodata: nodata,
    tab: null,
  }),
  methods: {
    ...mapActions({
      showDialogAction: 'general/showDialogAction',
    }),

    getMidfielders(index) {
      const player = this.fixtureDetail.fixtures[0].lineups[
        index
      ].startXI.filter((p) => {
        return p.player.pos === 'M';
      });
      return player;
    },
    getForwards(index) {
      const player = this.fixtureDetail.fixtures[0].lineups[
        index
      ].startXI.filter((p) => {
        return p.player.pos === 'F';
      });
      return player;
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  margin-inline: auto;
  margin-block: 2rem;
  background-color: #369d36;
  padding: 1rem;
}
.team {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}
.team-logo {
  width: 1.5rem;
}
.pitch {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1.75;
  border: solid 2px #1e1e1e;
  margin-block: 1rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.pitch::after {
  content: '';
  position: absolute;
  width: 100%;
  top: 50%;
  background-color: #1e1e1e;
  height: 2px;
  transform: translateY(-50%);
}
</style>
