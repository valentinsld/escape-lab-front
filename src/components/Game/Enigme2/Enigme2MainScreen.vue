/* eslint-disable unused-imports/no-unused-vars */
<template>
  <div class="main">
    <h1>Enigme 2 MainScreen</h1>
    <!-- <button @click="enigme2GameLoop">Start Enigme 2</button> -->
    <Enigme2PopupStack :cards="cards"></Enigme2PopupStack>
  </div>
</template>

<script>
import Enigme2Popup from '@/components/Game/Enigme2/Enigme2Popup.vue'
import Enigme2PopupStack from '@/components/Game/Enigme2/Enigme2PopupStack.vue'

const TIME_BEFORE_POPUP_SEND = 3500

export default {
  name: 'Enigme2MainScreen',
  components: {
    Enigme2Popup,
    Enigme2PopupStack
  },
  data: function () {
    return {
      showPopup: false,
      cards: []
    }
  },
  mounted() {
    this.$socket.emit('sendPopups')
    this.sockets.subscribe('sendPopups', (props) => {
      this.getPopupsData(props)
    })

    this.sockets.subscribe('popupIsReady', () => {
      // document.querySelector('.popup').style.display = 'none'
    })
  },
  methods: {
    getPopupsData(data) {
      this.cards = data

      const lastPopupsIndex = data.reverse().findIndex((d) => d.owner === 'MainScreen')
      console.log(data, lastPopupsIndex)

      setTimeout(() => {
        this.$socket.emit('enigme2-popupOwnerChanged', {
          id: this.cards[lastPopupsIndex].id,
          direction: 'bottom'
        })
      }, TIME_BEFORE_POPUP_SEND)
      // console.log(JSON.stringify(this.cards))
    },
    destroyPopup() {
      this.showPopup = false
      this.$socket.emit('sendPopupToPlayer')
    },
    enigme2GameLoop() {
      this.createPopup()
      setTimeout(() => {
        this.destroyPopup()
        this.$socket.emit('popupIsReady')
      }, 1500)
    },
    createPopup() {
      this.showPopup = true
      // console.log(this.showPopup)
    },
    start() {
      console.log('START ENIGME')
    }
  },
  sockets: {
    startEnigme: function () {
      this.start()
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
