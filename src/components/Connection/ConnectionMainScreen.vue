<template>
  <div class="container">
    <div v-if="highmode" class="highmode" />

    <div
      :class="{
        homeContainer: true,
        '-see': seeHome
      }"
    >
      <div class="home screenContainer">
        <img class="home__img" :src="Logo" />
        <p class="home__baseline">Sortirez-vous de ce bric-à-brac ?</p>
        <Button class="home__button" text="Commencer l’expérience" :on-click="goToConnection" />
      </div>
    </div>

    <div class="connection">
      <div class="connection__content">
        <p class="content__notif">1</p>

        <p class="content__top">
          Vous avez reçu un nouveau message ! <br />
          Connectez vous pour le lire !
        </p>

        <div class="content__connect">
          <div class="connect__qrcode">
            <QrcodeVue v-if="idRoom" :value="urlQrCode + idRoom" :size="110" level="H" />
          </div>
          <p v-if="idRoom" class="connect__text">
            ou rendez-vous sur<br />
            <b>{{ url }}</b>
            <br />
            et entrez le code <span>{{ idRoom }}</span>
          </p>
          <p v-else class="connect__text">Pas de connexion</p>

          <!--
            <p>Player 1 : {{ statusPlayer1 }}</p>
            <p>Player 2 : {{ statusPlayer2 }}</p>
            
            <Button v-if="!seeJoinRoom" :on-click="seeJoinRoomClick" text="Rejoindre une room en cours" />
            <div v-if="seeJoinRoom">
              <p>Rejoindre une room</p>
              <input ref="inputIdRoom" />
              <Button :on-click="connectToRoom" text="Connect to room" />
            </div>
          -->
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
      seeHome: true,
      url: window.location.host
    }
  },
  computed: mapState({
    idRoom: (state) => state[S.idRoom],
    listUsers: (state) => state[S.listUsers],
    playerIsReady: (state) => state[S.playerIsReady],
    sounds: (state) => state[S.sounds],
    highmode: (state) => state[S.highmode],

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
      this.sounds?.['select-3'].play()
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
