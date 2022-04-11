<template>
  <div style="display: flex">
    <div style="width: 50%">
      <QrcodeVue v-if="idRoom" :value="urlQrCode + idRoom" :size="200" level="H" />
    </div>
    <div>
      <h1>Connexion Main Screen</h1>

      <div v-if="!idRoom">Pas de connexion</div>
      <p>{{ idRoom }}</p>
      <p v-if="listUsers.player1">Player 1 :{{ listUsers.player1 }}</p>
      <p v-if="listUsers.player2">Player 2 :{{ listUsers.player2 }}</p>

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

    urlQrCode: () => window.location.origin + '?room='
  }),
  mounted() {
    this.$socket.emit('connection')

    this.sockets.subscribe('startGame', () => {
      console.log('startGame !!!')
      this.$store.commit(M.stepGame, 'Intro')
      this.$router.push('/game')
    })

    // Si c'est en developpement se connecter direct à la room
    if (IS_DEV) {
      this.connectToRoom('DEV001')
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
    connectToRoom(id = null) {
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
