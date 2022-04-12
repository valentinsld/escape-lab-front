<template>
  <div style="display: flex">
    <div style="width: 50%">
      <QrcodeVue v-if="idRoom" :value="urlQrCode + idRoom" :size="200" level="H" />
    </div>
    <div>
      <h1>Connexion Main Screen</h1>

      <div v-if="!idRoom">Pas de connexion</div>
      <p>{{ idRoom }}</p>
      <p>Player 1 : {{ statusPlayer1 }}</p>
      <p>Player 2 : {{ statusPlayer2 }}</p>
      <button v-if="!seeJoinRoom" @click="seeJoinRoomClick">Rejoindre une room en cours</button>
      <div v-if="seeJoinRoom">
        <p>Rejoindre une room</p>
        <input ref="inputIdRoom" />
        <button @click="connectToRoom">Connect to room</button>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'

const IS_DEV = process.env.NODE_ENV === 'development'

export default {
  name: 'ConnectionMainScreen',
  components: {
    QrcodeVue
  },
  data() {
    return {
      seeJoinRoom: false
    }
  },
  computed: mapState({
    idRoom: (state) => state[S.idRoom],
    listUsers: (state) => state[S.listUsers],
    playerIsReady: (state) => state[S.playerIsReady],

    urlQrCode: () => window.location.origin + '?room=',
    statusPlayer1: function () {
      return this.listUsers.player1 ? (this.playerIsReady.includes(this.listUsers.player1) ? 'PRET' : 'connected') : ''
    },
    statusPlayer2: function () {
      return this.listUsers.player2 ? (this.playerIsReady.includes(this.listUsers.player2) ? 'PRET' : 'connected') : ''
    }
  }),
  mounted() {
    this.$socket.emit('connection')

    this.sockets.subscribe('startGame', () => {
      console.log('startGame !!!')
      this.$store.commit(M.stepGame, 'Intro')
      this.$router.push('/game')
    })
    this.sockets.subscribe('playerIsReady', (data) => {
      this.$store.commit(M.playerIsReady, data)
    })

    // Si c'est en developpement se connecter direct à la room
    if (IS_DEV) {
      this.connectToRoom(null, 'DEV001')
      return
    }

    const loginData = {
      isMainScreen: this.$store.state[S.stateScreen] === STATE_SCREEN.mainScreen,
      isPlayer: this.$store.state[S.stateScreen] === STATE_SCREEN.player
    }
    this.$socket.emit('connectToRoom', loginData, () => {
      console.log('connectToRoom', this.$socket.id)
    })
  },
  methods: {
    seeJoinRoomClick() {
      this.$data.seeJoinRoom = true
    },
    connectToRoom(ev, id = null) {
      console.log('connectToRoom', ev, id)
      const idRoom = id || this.$refs.inputIdRoom.value
      this.$data.seeJoinRoom = false

      const loginData = {
        isMainScreen: this.$store.state[S.stateScreen] === STATE_SCREEN.mainScreen,
        isPlayer: this.$store.state[S.stateScreen] === STATE_SCREEN.player,
        idRoom
      }
      this.$socket.emit('connectToRoom', loginData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
