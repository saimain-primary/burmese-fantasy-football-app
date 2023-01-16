<template>
  <div class="mt-3">
    <button class="select" @click="show = !show">
      {{ potm.id ? 'Pick another player' : 'Who will be player of the match?' }}
    </button>
    <p class="potm" v-if="potm.id">{{ potm.name }} from {{ potm.team }}</p>
    <div v-if="players.length > 0 && show" class="players-container">
      <button @click="show = !show" class="back-btn">
        <v-icon color="#4c2fe3">mdi-arrow-left</v-icon> Back
      </button>
      <v-tabs v-model="tab" bg-color="primary" grow>
        <v-tab style="width: 50%" value="home">
          {{ players[0].team }}
        </v-tab>
        <v-tab style="width: 50%" value="away">
          {{ players[1].team }}
        </v-tab>
      </v-tabs>
      <v-container>
        <v-row>
          <v-col>
            <v-window v-model="tab">
              <v-window-item value="home">
                <v-card elevation="0">
                  <v-list lines="one" style="padding: 0">
                    <v-list-item
                      v-for="(p, index) in players[0].players"
                      :key="index"
                      class="bg-grey-lighten-4 mb-1"
                      @click="setPOTM(p, players[0].team)"
                    >
                      <div class="d-flex justify-space-between align-center">
                        <p>{{ p.name }}</p>
                        <p class="font-weight-bold text-grey-darken-2">
                          {{ p.number }}
                        </p>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-window-item>
            </v-window>
            <v-window v-model="tab">
              <v-window-item value="away">
                <v-card elevation="0">
                  <v-list lines="one" style="padding: 0">
                    <v-list-item
                      v-for="(p, index) in players[1].players"
                      :key="index"
                      class="bg-grey-lighten-4 mb-1"
                      @click="setPOTM(p, players[1].team)"
                    >
                      <div class="d-flex justify-space-between align-center">
                        <p>{{ p.name }}</p>
                        <p class="font-weight-bold text-grey-darken-2">
                          {{ p.number }}
                        </p>
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
</template>

<script>
export default {
  props: {
    players: Array,
    potm: Object,
  },
  methods: {
    setPOTM(player, team) {
      const body = {
        name: player.name,
        number: player.number,
        id: player.id,
        team: team,
      };
      this.$emit('set-potm', body);
      this.show = false;
    },
  },

  data() {
    return {
      tab: 'home',
      show: false,
    };
  },
};
</script>

<style>
.select {
  color: #4c2fe3;
  border: solid 1px currentColor;
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
}
.potm {
  color: #4c2fe3;
  margin-top: 0.5rem;
  font-weight: 600;
}
.back-btn {
  width: 100%;
  padding-block: 0.25rem;
  color: #4c2fe3;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
}
.players-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
}
</style>
