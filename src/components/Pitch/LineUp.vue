<template>
  <div class="lineup" :style="calculateRow(playersByRow.length)">
    <div class="row" v-for="(players, index) in playersByRow" :key="index">
      <div
        class="player"
        v-for="(player, index) in players"
        :key="index"
        :style="getGridPosition(player.player.grid)"
      >
        <p class="number" :class="{ away: this.isAway }">
          {{ player.player.number }}
        </p>
        <p class="name">{{ player.player.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lineups', 'isAway'],
  methods: {
    getGridPosition(pos) {
      if (pos === '1:1') {
        return {
          'grid-row-start': 1,
        };
      }
      const position = pos?.split(':');
      return {
        'grid-row-start': position[0],
        'grid-column-start': position[1],
      };
    },
    calculateRow(number) {
      return {
        'grid-template-rows': number,
      };
    },
  },
  created() {
    const players = [[], [], [], [], []];
    this.lineups.startXI.forEach((player) => {
      const position = player.player.grid?.split(':');
      players[+position[0] - 1].push(player);
    });
    if (players[4].length === 0) {
      players.pop();
    }
    if (this.isAway) {
      players.reverse();
    }
    this.playersByRow = players;
  },
  data: () => ({
    playersByRow: [],
  }),
};
</script>

<style>
.lineup {
  position: relative;
  z-index: 10;
  display: grid;
  gap: 0.25rem;
  width: 100%;
  place-items: center;
  height: 100%;
  grid-row: revert;
}
.row {
  width: 100%;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 1fr;
}
.player {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 0.5rem;
  text-align: center;
  width: 100%;
  gap: 0.25rem;
}
.name {
  font-size: 0.8rem;
  line-height: 0.75rem;
}
.number {
  background-color: white;
  width: 1.75rem;
  aspect-ratio: 1 / 1;
  border-radius: 100vw;
  color: black;
  display: grid;
  place-items: center;
  font-size: 0.9rem;
  font-weight: bold;
}
.number.away {
  background: #1e1e1e;
  color: white;
}
.positions {
  position: relative;
  z-index: 10;
  width: 100%;
  display: grid;
  padding-top: 0.5rem;
  place-items: center;
}
</style>
