<template>
  <div class="tuto">
    <p v-html="textContent.consigne.chat" />
    <button class="tuto__start-btn" :class="btnClass" @click="toggleStart">Start</button>
    <p v-if="isReady">En attente du joueur 2</p>
  </div>
</template>

<script>
import { textContent } from '@/data/enigme3'
import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'
export default {
  name: 'Enigme3Player1Tuto',
  data() {
    return {
      textContent: textContent,
      isReady: this.$store.state[S.enigme3PlayerIsReady]
    }
  },
  computed: {
    btnClass() {
      return {
        'tuto__start-btn--ready': this.isReady
      }
    }
  },
  methods: {
    toggleStart() {
      //this.isReady = !this.isReady
      this.$socket.emit('sendEnigme3Config')
      this.sockets.subscribe('sendEnigme3Config', (config) => {
        this.$store.commit(M.enigme3PlayerIsReady, config)
      })
      console.log('is ready', this.isReady)
    }
  }
}
</script>
<style lang="scss" scoped>
.tuto__start-btn {
  &--ready {
    background: green;
  }
}
</style>
