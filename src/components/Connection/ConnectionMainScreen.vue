<template>
  <div>
    <h1>Connexion Main Screen</h1>

    <div v-if="!idRoom">TRUE</div>
    <p>{{ idRoom }}</p>
    <p v-if="listUsers.player1">Player 1 :{{ listUsers.player1 }}</p>
    <p v-if="listUsers.player2">Player 2 :{{ listUsers.player2 }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'

export default {
  name: 'ConnectionMainScreen',
  computed: mapState([S.idRoom, S.listUsers]),
  mounted() {
    console.log('mounted', this.$socket)

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
  }
}
</script>

<style lang="scss" scoped></style>
