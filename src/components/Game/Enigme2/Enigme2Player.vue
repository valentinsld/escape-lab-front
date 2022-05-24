<template>
  <div class="main">
    <!-- <button v-if="isFirstPlayer" @click="sendPopup">Envoyer au Joueur 2</button> -->
    <Enigme2PopupStack class="popup" :cards="cards"></Enigme2PopupStack>
  </div>
</template>

<script>
import Enigme2Popup from '@/components/Game/Enigme2/Enigme2Popup.vue'
import Enigme2PopupStack from '@/components/Game/Enigme2/Enigme2PopupStack.vue'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'Enigme2Player',
  components: {
    Enigme2Popup,
    Enigme2PopupStack
  },
  data: function () {
    return {
      showPopup: false,
      isFirstPlayer: this.$store.state[S.typeScreen] === 'Player1',
      cards: []
    }
  },
  mounted() {
    this.defineIdentity()
    this.sockets.subscribe('sendPopups', (props) => {
      this.getPopupsData(props)
      console.log('props vaut :: ', props)
    })
    this.sockets.subscribe('sendPopupToPlayer', () => {
      if (this.$store.state[S.typeScreen] === 'Player1') {
        this.showPopup = true
      }
    })

    this.sockets.subscribe('popupTransfer', () => {
      if (this.$store.state[S.typeScreen] === 'Player2') {
        this.createPopup()
      }
    })
  },
  methods: {
    getPopupsData(data) {
      this.cards = data
      // console.log(JSON.stringify(this.cards))
    },
    sendPopup() {
      if (this.$store.state[S.typeScreen] === 'Player1') {
        this.showPopup = false
      }
      this.$socket.emit('p2pPopup')
    },
    defineIdentity() {
      // alert(this.$store.state[S.typeScreen])
    },
    destroyPopup() {
      this.showPopup = false
      this.$socket.emit('sendPopupToPlayer')
    },
    createPopup() {
      this.showPopup = true
      console.log(this.showPopup)
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

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: black solid 1px;
}

// .popup {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 400px;
//   height: 280px;
//   color: blue;
//   border: blue solid 3px;
//   border-radius: 30px;
// }
</style>
