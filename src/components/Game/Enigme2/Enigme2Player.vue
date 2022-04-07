<template>
  <div class="main">
    <h1>Enigme 2 Player</h1>
    <button v-if="isFirstPlayer" @click="sendPopup">Envoyer au Joueur 2</button>

    <div v-if="showPopup" class="popup">
      <span>Popup</span>
    </div>
  </div>
</template>

<script>
import { STATE as S } from '@/store/helpers'

export default {
  name: 'Enigme2Player',
  data: function () {
    return {
      showPopup: false,
      isFirstPlayer: this.$store.state[S.typeScreen] === 'Player1'
    }
  },
  mounted() {
    this.defineIdentity()
    this.sockets.subscribe('sendPopupToPlayer', () => {
      // alert('sendPopupToPlayer')
      if (this.$store.state[S.typeScreen] === 'Player1') {
        this.showPopup = true
      }
    })

    this.sockets.subscribe('popupTransfer', () => {
      // alert('sendPopupToPlayer')
      if (this.$store.state[S.typeScreen] === 'Player2') {
        this.createPopup()
      }
    })
  },
  methods: {
    sendPopup() {
      if (this.$store.state[S.typeScreen] === 'Player1') {
        this.showPopup = false
      }
      this.$socket.emit('p2pPopup')
    },
    defineIdentity() {
      alert(this.$store.state[S.typeScreen])
    },
    destroyPopup() {
      this.showPopup = false
      this.$socket.emit('sendPopupToPlayer')
    },
    createPopup() {
      this.showPopup = true
      console.log(this.showPopup)
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

.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 280px;
  color: blue;
  border: blue solid 3px;
  border-radius: 30px;
}
</style>
