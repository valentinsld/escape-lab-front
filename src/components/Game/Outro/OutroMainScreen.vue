<template>
  <div class="outro" :class="endVideo ? '-see' : ''">
    <Button class="outro__about" text="À propos de ClicClack" :on-click="showModalAbout" />
    <About :see="seeAbout" @hide="hideModalAbout" />

    <div class="message">
      <p class="message__notif">1</p>

      <p class="message__text">Félicitations !!</p>
      <p class="message__text">Vous avez réussi à déjoué les pièges du professeur Aymeriche</p>
    </div>

    <Button text="En savoir plus sur les arnaques" :on-click="goToStats" color="white" class="-isFirstBtn" />
    <Button text="Recommencer l'expérience" :on-click="goToStats" color="white" />
  </div>
</template>

<script>
import About from '@/components/about'
import Button from '@/components/block/button'
import { MUTATIONS as M } from '@/store/helpers'

export default {
  name: 'OutroMainScreen',
  components: {
    About,
    Button
  },
  data() {
    return {
      endVideo: false,
      seeAbout: false
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
    },

    showModalAbout() {
      console.log('click')
      this.seeAbout = true
    },
    hideModalAbout() {
      this.seeAbout = false
    }
  }
}
</script>

<style lang="scss">
.outro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--color-white);
  pointer-events: none;
  background-color: var(--color-primary);
  opacity: 0;
  transition: all 500ms var(--custom-bezier);

  &.-see {
    pointer-events: initial;
    opacity: 1;
  }

  &__about {
    position: absolute;
    top: 36px;
    right: 36px;
    transform: scale(0.8);
    transform-origin: top right;

    &:active {
      transform: translateY(5px) translateX(5px) scale(0.8) !important;
    }
  }

  .message {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 450px;
    max-width: 550px;
    min-height: 290px;
    max-height: 100%;
    padding: 50px 40px;
    margin-bottom: 10%;
    background-color: var(--color-white);
    border: 3px solid var(--color-black);
    border-radius: var(--box-rounded-radius);
    box-shadow: 6px 6px 0 var(--color-black);

    //
    // triangle
    //
    &::after {
      position: absolute;
      right: 19px;
      bottom: -32px;
      z-index: 2;
      width: 0;
      height: 0;
      content: '';
      border-top: 16px solid var(--color-white);
      border-right: 28px solid var(--color-white);
      border-bottom: 22px solid transparent;
      border-left: 18px solid transparent;
    }

    &::before {
      position: absolute;
      right: 14px;
      bottom: -46px;
      z-index: 1;
      width: 0;
      height: 0;
      content: '';
      border-top: 16px solid var(--color-black);
      border-right: 36px solid var(--color-black);
      border-bottom: 30px solid transparent;
      border-left: 18px solid transparent;
    }

    &__notif {
      position: absolute;
      top: 0;
      right: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      padding-bottom: 10px;
      margin: 0;
      font-family: $font;
      font-size: 40px;
      font-weight: 500;
      color: var(--color-white);
      background-color: var(--color-red);
      border: 3px solid var(--color-black);
      border-radius: 100px;
      box-shadow: 4px 4px 0 var(--color-black);
      transform: translate3d(30%, -30%, 0) rotate(8deg);
    }

    // text during messages
    &__text {
      margin: 0;
      font-size: 1.5em;
      font-weight: var(--weight-medium);
      line-height: 36px;
      color: var(--color-black);
    }
  }
}

.-isFirstBtn {
  margin-bottom: 2%;
}
</style>
