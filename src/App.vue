<template>
  <main id="app" className="app">
    <!-- Views -->
    <transition name="fade-page" mode="out-in">
      <router-view />
    </transition>
  </main>
</template>

<script>
import { mapState } from 'vuex'

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
  computed: mapState({
    listUsers: (state) => state[S.listUsers],
    isStart: (state) => state[S.isStart],
    stepGame: (state) => state[S.stepGame]
  }),
  mounted() {
    this.initSubscribeConnexion()
    this.initAutoVh()
    setTimeout(this.initAutoVh.bind(this), 1000)
    this.removePinchOnMobile()
    this.initHighMode()
    this.$store.commit(M.initSounds)
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
      // console.log(this.$store.state[S.typeScreen])
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
    },
    initAutoVh() {
      this.$el.style.setProperty('--vh', window.innerHeight / 100 + 'px')
      this.$el.style.setProperty('--vhRes', window.innerHeight / 100 + 'px')
      window.addEventListener('resize', () => this.$el.style.setProperty('--vhRes', window.innerHeight / 100 + 'px'))
    },
    removePinchOnMobile() {
      // remove pintch zoom
      this.$nextTick(() => {
        document.addEventListener('gesturestart', function (e) {
          e.preventDefault()
        })
      })
    },
    initHighMode() {
      if (window.location.hash.toLowerCase() === '#highmode') {
        this.$store.commit(M.highmode, true)
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss/app';
// Remove scroll to reload page for ios
body {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
}

// remove double tap (zoom)
* {
  touch-action: manipulation;
}

#app {
  display: flex;
  height: calc(100 * var(--vhRes, 1vh));
  font-family: 'grenadine-mvb', arial, sans-serif;
  color: var(--color-black);
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  & > * {
    width: 100%;
    height: 100%;
  }
}
</style>
