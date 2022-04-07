<template>
  <div>
    <h1>Connexion Player</h1>
    <div v-if="!idRoom">
      <input ref="inputIdRoom" />
      <button @click="connectToRoom">Connect to room</button>
    </div>

    <div v-else>
      <p>idRoom : {{ idRoom }}</p>
      <p v-if="listUsers.mainScreen">mainScreen :{{ listUsers.mainScreen }}</p>
      <p v-if="listUsers.player1">Player 1 :{{ listUsers.player1 }}</p>
      <p v-if="listUsers.player2">Player 2 :{{ listUsers.player2 }}</p>
    </div>

    <button v-if="listUsers.player1 && listUsers.player2" @click="isReady">isReady</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'

export default {
  name: 'ConnectionPlayer',
  computed: mapState({
    idRoom: (state) => state[S.idRoom],
    listUsers: (state) => state[S.listUsers]
  }),
  mounted() {
    console.log('mounted', this.$socket)

    this.$socket.emit('connection')

    this.sockets.subscribe('startGame', () => {
      console.log('startGame !!!')
      this.$store.commit(M.stepGame, 'Intro')
      this.$router.push('/game')
    })
  },
  methods: {
    connectToRoom() {
      const idRoom = this.$refs.inputIdRoom.value

      const loginData = {
        isMainScreen: this.$store.state[S.stateScreen] === STATE_SCREEN.mainScreen,
        isPlayer: this.$store.state[S.stateScreen] === STATE_SCREEN.player,
        idRoom
      }
      // console.log(loginData)
      this.$socket.emit('connectToRoom', loginData)
    },
    isReady() {
      this.$socket.emit('isReady')
    }
  }
}
</script>

<style lang="scss" scoped></style>
