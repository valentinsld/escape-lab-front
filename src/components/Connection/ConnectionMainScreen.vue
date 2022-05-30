<template>
  <div class="container">
    <div
      :class="{
        homeContainer: true,
        '-see': seeHome
      }"
    >
      <div class="home screenContainer">
        <img class="home__img" :src="Logo" />
        <p class="home__baseline">TODO : Ici une superbe baseline !!</p>
        <Button text="Commencer l’expérience" :on-click="goToConnection" />
      </div>
    </div>

    <div class="connection screenContainer">
      <div class="connection__qrcode">
        <QrcodeVue v-if="idRoom" :value="urlQrCode + idRoom" :size="200" level="H" />
      </div>
      <div class="connection__content">
        <h1 class="content__title">Rejoindre la room</h1>
        <h2 class="content__idRoom">{{ idRoom }}</h2>

        <div v-if="!idRoom">Pas de connexion</div>
        <p>Player 1 : {{ statusPlayer1 }}</p>
        <p>Player 2 : {{ statusPlayer2 }}</p>
        <!-- <Button v-if="!seeJoinRoom" :on-click="seeJoinRoomClick" text="Rejoindre une room en cours" /> -->
        <div v-if="seeJoinRoom">
          <p>Rejoindre une room</p>
          <input ref="inputIdRoom" />
          <Button :on-click="connectToRoom" text="Connect to room" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapState } from 'vuex'

import Logo from '@/assets/logo.svg'
import Button from '@/components/block/button.vue'
import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'

const IS_DEV = process.env.NODE_ENV === 'development'

export default {
  name: 'ConnectionMainScreen',
  components: {
    QrcodeVue,
    Button
  },
  data() {
    return {
      Logo,
      seeJoinRoom: false,
      seeHome: true
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
  sockets: {
    startGame: function () {
      this.$store.commit(M.stepGame, 'Intro')
      this.$router.push('/game')
    },
    playerIsReady: function (data) {
      this.$store.commit(M.playerIsReady, data)
    }
  },
  mounted() {
    this.$socket.emit('connection')

    // Si c'est en developpement se connecter direct à la room
    if (IS_DEV) {
      this.connectToRoom(null, 'dev1')
      return
    }

    const loginData = {
      isMainScreen: this.$store.state[S.stateScreen] === STATE_SCREEN.mainScreen,
      isPlayer: this.$store.state[S.stateScreen] === STATE_SCREEN.player
    }
    this.$socket.emit('connectToRoom', loginData)
  },
  methods: {
    goToConnection() {
      this.$data.seeHome = false
    },

    seeJoinRoomClick() {
      this.$data.seeJoinRoom = true
    },
    connectToRoom(ev, id = null) {
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

<style lang="scss" scoped>
@import './ConnectionMainScreen';
</style>
