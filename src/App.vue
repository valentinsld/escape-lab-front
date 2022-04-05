<template>
  <div id="app" class="app">
    <h1>Le lab de l'arnaque</h1>

    <!-- Views -->
    <transition name="fade-page" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { MUTATIONS as M } from '@/store/helpers'

export default {
  name: 'App',
  mounted() {
    this.initSubscribeConnexion()
  },
  methods: {
    initSubscribeConnexion() {
      this.sockets.subscribe('connect', () => {
        console.log(this.$socket.id)
        this.$store.commit(M.socketID, this.$socket.id)
      })

      this.sockets.subscribe('userConnected', ({ idRoom, listUsers }) => {
        this.$store.commit(M.idRoom, idRoom)
        this.$store.commit(M.listUsers, listUsers)
      })

      this.sockets.subscribe('userDisconnected', ({ listUsers }) => {
        this.$store.commit(M.listUsers, listUsers)
      })
    }
  }
}
</script>

<style lang="scss">
@import 'scss/app';

#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
