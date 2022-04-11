<template>
  <div>
    <h1>Connexion Player</h1>

    <div v-if="!idRoom">
      <input ref="inputIdRoom" :value="idRoomFromUrl" />
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

const getIdRoomFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search)

  if (searchParams.has('room')) {
    return searchParams.get('room')
  }
  return ''
}

const IS_DEV = process.env.NODE_ENV === 'development' && !process.env.VUE_APP_LOAD_SOCKETS_FROM_PROD

export default {
  name: 'ConnectionPlayer',
  data() {
    return {
      idRoomFromUrl: getIdRoomFromUrl()
    }
  },
  computed: mapState({
    idRoom: (state) => state[S.idRoom],
    listUsers: (state) => state[S.listUsers]
  }),
  mounted() {
    this.$socket.emit('connection')

    this.sockets.subscribe('startGame', () => {
      console.log('startGame !!!')
      this.$store.commit(M.stepGame, 'Intro')
      this.$router.push('/game')
    })

    if (this.$data.idRoomFromUrl) {
      this.connectToRoom()
    }

    // Si c'est en developpement se connecter direct à la room
    if (IS_DEV) {
      this.connectToRoom('DEV001')
    }
  },
  methods: {
    connectToRoom(id = null) {
      const idRoom = id || this.$refs.inputIdRoom.value

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
