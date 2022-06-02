/* eslint-disable unused-imports/no-unused-vars */
<template>
  <div class="main enigme2">
    <Enigme2Restart v-if="showFailure" />
    <h1>Enigme 2 MainScreen</h1>
    <!-- <button @click="enigme2GameLoop">Start Enigme 2</button> -->
    <Enigme2PopupStack :cards="cards"></Enigme2PopupStack>
  </div>
</template>

<script>
import Enigme2Popup from '@/components/Game/Enigme2/Enigme2Popup.vue'
import Enigme2PopupStack from '@/components/Game/Enigme2/Enigme2PopupStack.vue'
import Enigme2Restart from '@/components/Game/Enigme2/restart/Enigme2MainScreenRestart.vue'

export default {
  name: 'Enigme2MainScreen',
  components: {
    Enigme2Popup,
    Enigme2PopupStack,
    Enigme2Restart
  },
  data: function () {
    return {
      cards: [],
      showFailure: false
    }
  },
  mounted() {
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
/* .popup {
  border: black dotted 5px;
  height: 200px;
  width: 200px;
} */
</style>
