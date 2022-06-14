<template>
  <div class="tuto">
    <div class="screenContainer tuto__container" :class="'-' + colorBackground">
      <img class="tuto__logo" :src="Logo" />
      <p v-if="text" class="tuto__consigne" v-html="text" />

      <img v-if="gif" :src="gif" class="tuto__gif" />

      <div class="tuto__btn-container">
        <button :disabled="isReady" :class="`button tuto__start-btn -${colorBackground}`" @click="toggleStart">
          {{ textButton }}
        </button>
        <p class="tuto__player-info" :style="`opacity: ${isReady ? 1 : 0}`">En attente de l'autre joueur</p>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.svg'
import { textContent } from '@/data/enigme3'
import Sound from '@/helpers/Sound'

export default {
  name: 'PlayerTuto',
  props: {
    text: {
      type: String,
      required: true
    },
    gif: {
      type: String,
      default() {
        return ''
      }
    },
    socketSend: {
      type: String,
      default() {
        return 'readyTutoEnigme'
      }
    },
    textButton: {
      type: String,
      default() {
        return 'Start'
      }
    },
    colorBackground: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      Logo,
      textContent: textContent,
      isReady: false
    }
  },
  methods: {
    toggleStart() {
      new Sound('validation', { volume: 0.3 })
      this.isReady = true
      this.$socket.emit(this.socketSend)
    }
  }
}
</script>
<style lang="scss" scoped>
.tuto {
  display: flex;
  align-items: center;
  width: 100%;
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

.tuto__gif {
  max-width: 84%;
  margin: 0 auto;
}

.tuto__start-btn {
  display: block;
  min-width: 100px;
  padding: 1em;
  margin: auto;
  font-weight: bold;
  color: var(--color-whiteDimmed);
  background: var(--color-primary);
  border: 4px solid var(--color-black);
  border-radius: var(--box-rounded-radius);
  transition: 200ms var(--custom-bezier);

  &:disabled {
    background: var(--color-disabled);
  }

  &.-enigme1 {
    background-color: $enigme1;

    &:hover {
      background-color: $orange-highlighted;
    }
  }

  &.-enigme2 {
    background-color: $enigme2;

    &:hover {
      background-color: $purple-highlighted;
    }
  }

  &.-enigme3 {
    background-color: $enigme3;

    &:hover {
      background-color: $blue-highlighted;
    }
  }
}
</style>
