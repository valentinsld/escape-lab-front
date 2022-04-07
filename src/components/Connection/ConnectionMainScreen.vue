<template>
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
</template>

<script>
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'

export default {
  name: 'ConnectionMainScreen',
  data() {
    return {
      seeJoinRoom: false
    }
  },
  computed: mapState({
    idRoom: (state) => state[S.idRoom],
    listUsers: (state) => state[S.listUsers]
  }),
  mounted() {
    this.$socket.emit('connection')

    const loginData = {
      isMainScreen: this.$store.state[S.stateScreen] === STATE_SCREEN.mainScreen,
      isPlayer: this.$store.state[S.stateScreen] === STATE_SCREEN.player
    }
    this.$socket.emit('connectToRoom', loginData, () => {
      console.log('connectToRoom', this.$socket.id)
    })

    this.sockets.subscribe('startGame', () => {
      console.log('startGame !!!')
      this.$store.commit(M.stepGame, 'Intro')
      this.$router.push('/game')
    })
  },
  methods: {
    seeJoinRoomClick() {
      this.$data.seeJoinRoom = true
    },
    connectToRoom() {
      const idRoom = this.$refs.inputIdRoom.value
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
