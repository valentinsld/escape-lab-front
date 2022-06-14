/* eslint-disable unused-imports/no-unused-vars */
<template>
  <div class="main enigme2">
    <Enigme2Restart v-if="showFailure" />
    <!-- <button @click="enigme2GameLoop">Start Enigme 2</button> -->
    <Enigme2MainScreenPopups :cards="cards" />
  </div>
</template>

<script>
import Enigme2MainScreenPopups from '@/components/Game/Enigme2/Enigme2MainScreenPopups.vue'
import Enigme2Restart from '@/components/Game/Enigme2/restart/Enigme2MainScreenRestart.vue'
import { MUTATIONS as M } from '@/store/helpers'

export default {
  name: 'Enigme2MainScreen',
  components: {
    Enigme2MainScreenPopups,
    Enigme2Restart
  },
  data: function () {
    return {
      cards: [],
      showFailure: false
    }
  },
  mounted() {
    this.$store.commit(M.startLaboAmbiance)
    this.$socket.emit('enigme2-sendPopups')
  },
  methods: {
    getPopupsData(data) {
      this.cards = data
      // console.log(JSON.stringify(this.cards))
    },
    start() {
      console.log('START ENIGME')
    }
  },
  sockets: {
    startEnigme: function () {
      this.start()
    },
    'enigme2-sendPopups': function (props) {
      this.getPopupsData(props)
    },
    'enigme2-endSort': function ({ success }) {
      setTimeout(() => {
        this.showFailure = !success
      }, 800)
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
