<template>
  <div class="tuto">
    <div class="screenContainer tuto__container">
      <img class="tuto__logo" :src="Logo" />
      <p class="tuto__consigne" v-html="textContent.consigne.chat" />
      <div class="tuto__btn-container">
        <button :disabled="isReady" class="tuto__start-btn" @click="toggleStart">Start</button>
        <p class="tuto__player-info" :style="`opacity: ${isReady ? 1 : 0}`">En attente de l'autre joueur</p>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.svg'
import { textContent } from '@/data/enigme3'
export default {
  name: 'Enigme3Player1Tuto',
  data() {
    return {
      Logo,
      textContent: textContent,
      isReady: false
    }
  },
  methods: {
    toggleStart() {
      this.isReady = true
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

.tuto__logo {
  max-width: 80px;
}

.tuto__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tuto__consigne {
  font-size: 1.3rem;
  text-align: center;
}

.tuto__player-info {
  text-align: center;
  transition: 200ms var(--custom-bezier);
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
  transition: 200ms var(--custom-bezier);

  &:disabled {
    background: gray;
  }
}
</style>
