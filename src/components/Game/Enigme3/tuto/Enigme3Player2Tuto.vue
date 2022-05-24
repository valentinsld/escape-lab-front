<template>
  <div class="tuto">
    <div class="screenContainer">
      <p v-html="textContent.consigne.notice" />
      <button class="tuto__start-btn" :class="btnClass" @click="toggleStart">Start</button>
      <p v-if="isReady">En attente du joueur 2</p>
    </div>
  </div>
</template>

<script>
import { textContent } from '@/data/enigme3'
export default {
  name: 'Enigme3Player2Tuto',
  data() {
    return {
      textContent: textContent,
      isReady: false
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
      this.$socket.emit('readyTutoEnigme')
    }
  }
}
</script>
<style lang="scss" scoped>
.tuto {
  display: flex;
  align-items: center;
  height: 100%;
}

.tuto__start-btn {
  display: block;
  min-width: 100px;
  padding: 1em;
  margin: auto;
  font-weight: bold;
  color: #f8f8f8;
  background: #3577f5;
  border: 4px solid var(--color-black);
  border-radius: 27px;

  &:disabled {
    background: gray;
  }
}
</style>
