<template>
  <main id="app" class="app">
    <!-- Views -->
    <transition name="fade-page" mode="out-in">
      <router-view />
    </transition>

    <UserDisconnected v-if="listUsers.length < 3 && isStart" />
  </main>
</template>

<script>
import { mapState } from 'vuex'

import UserDisconnected from '@/components/Connection/UserDisconnected.vue'
import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'

const ERROR_SOCKETS = [
  'error',
  'reconnect',
  'reconnect_attempt',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed',
  'connect_error',
  'connect_timeout',
  'connecting',
  'ping',
  'pong'
]

export default {
  name: 'App',
  components: {
    UserDisconnected
  },
  computed: mapState({
    listUsers: (state) => state[S.listUsers],
    isStart: (state) => state[S.isStart]
  }),
  mounted() {
    this.initSubscribeConnexion()
  },
  sockets: {
    connect: function () {
      console.log(this.$socket.id)
      this.$store.commit(M.socketID, this.$socket.id)
    },
    userConnected: function ({ idRoom, listUsers, isStart, newUser, stepGame }) {
      this.$store.commit(M.idRoom, idRoom)
      this.$store.commit(M.listUsers, listUsers)
      this.$store.commit(M.stepGame, stepGame)
      this.$store.commit(M.isStart, isStart)

      // if is you
      console.log(this.$store.state[S.typeScreen])
      if (!this.$store.state[S.typeScreen]) {
        this.$store.commit(M.typeScreen, newUser.type)
      }

      if (isStart) {
        this.$router.push('/game')
      }
    },
    userDisconnected: function ({ listUsers }) {
      this.$store.commit(M.listUsers, listUsers)
    }
  },
  methods: {
    initSubscribeConnexion() {
      this.$socket.on('disconnect', () => {
        console.error('YOU ARE DISCONNECTED')
        if (process.env.NODE_ENV !== 'development') return
        this.$router.push('/')
        this.$store.commit(M.resetRoom)
        setTimeout(() => {
          window.location.reload()
        }, 100)
      })

      ERROR_SOCKETS.forEach((err) => {
        this.$socket.on(err, () => {
          console.error('Socket : ', err)
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import 'scss/app';

#app {
  display: flex;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  & > * {
    width: 100%;
    height: 100%;
  }
}
</style>
