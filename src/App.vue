<template>
  <div id="app" class="app">
    <h1>Le lab de l'arnaque</h1>

    <!-- Views -->
    <transition name="fade-page" mode="out-in">
      <router-view />
    </transition>

    <UserDisconnected v-if="listUsers.length < 3 && isStart" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import UserDisconnected from '@/components/Connection/UserDisconnected.vue'
import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'

export default {
  name: 'App',
  components: {
    UserDisconnected
  },
  computed: mapState([S.listUsers, S.isStart]),
  mounted() {
    this.initSubscribeConnexion()
  },
  methods: {
    initSubscribeConnexion() {
      this.sockets.subscribe('connect', () => {
        console.log(this.$socket.id)
        this.$store.commit(M.socketID, this.$socket.id)
      })

      this.sockets.subscribe('userConnected', ({ idRoom, listUsers, isStart, newUser }) => {
        this.$store.commit(M.idRoom, idRoom)
        this.$store.commit(M.listUsers, listUsers)

        // if is you
        console.log(this.$store.state[S.typeScreen])
        if (!this.$store.state[S.typeScreen]) {
          this.$store.commit(M.typeScreen, newUser.type)
        }

        console.log('isStart', isStart)
        if (isStart) {
          this.$router.push('/game')
        }
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
