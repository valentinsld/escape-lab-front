<template>
  <div class="outro" :class="endVideo ? '-black' : ''">
    <h2 class="outro__title">Félicitations !!</h2>
    <p class="outro__text">Vous avez réussi à déjoué les pièges du professeur Aymeriche</p>
    <Button text="En savoir plus sur les arnaques" :on-click="goToStats" />
    <Button text="Recommencer l'expérience" :on-click="goToStats" />
  </div>
</template>

<script>
import Button from '@/components/block/button'
import { MUTATIONS as M } from '@/store/helpers'

export default {
  name: 'OutroMainScreen',
  components: {
    Button
  },
  data() {
    return {
      endVideo: false
    }
  },
  sockets: {
    'outro-end': function () {
      // console.log('endVideo')
      this.endVideo = true
    }
  },
  methods: {
    goToStats() {
      this.$router.push({ path: '/results' })
    },
    goToHome() {
      this.$socket.emit('leave')

      this.$store.commit(M.typeScreen, null)
      this.$store.commit(M.idRoom, null)
      this.$store.commit(M.listUsers, {})
      this.$store.commit(M.playerIsReady, [])
      this.$store.commit(M.isStart, false)
      this.$store.commit(M.stepGame, null)

      this.$nextTick(() => {
        this.$router.push({ path: '/' })
        window.location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.outro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--color-white);
  pointer-events: none;
  background-color: var(--color-black);
  opacity: 0;
  transition: all 500ms var(--custom-bezier);

  &__title {
    margin-bottom: 0.2em;
    font-size: 3.5em;
  }

  &__text {
    max-width: 600px;
    margin-top: 0;
    margin-bottom: 48px;
    font-size: 1.25em;
  }

  .button {
    margin-bottom: 12px;
  }

  &.-black {
    pointer-events: initial;
    opacity: 1;
  }
}
</style>
