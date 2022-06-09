<template>
  <div class="introContainer" :class="`${startVideo ? '-disable' : ''}`">
    <div class="introContainer__content">
      <p class="content__notif">1</p>

      <h1 class="content__messages">
        Vous avez reçu un message,<br />
        regardez votre téléphone pour le lire
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntroMainScreen',
  data() {
    return {
      startVideo: false
    }
  },
  sockets: {
    'intro-startVideo': function () {
      this.$data.startVideo = true
    }
  },
  methods: {
    sendDarkScene() {
      this.$socket.emit('intro-darkScene')
    },
    sendEndVideo() {
      this.$socket.emit('intro-endVideo')
    }
  }
}
</script>

<style lang="scss" scoped>
.introContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  transition: opacity 250ms ease-in-out;

  &.-disable {
    opacity: 0;
  }

  &__content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 550px;
    max-width: 100%;
    min-height: 290px;
    max-height: 100%;
    padding: 50px 40px;
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

    .content {
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
      &__messages {
        font-size: 26px;
        line-height: 36px;
      }
    }
  }
}
</style>
