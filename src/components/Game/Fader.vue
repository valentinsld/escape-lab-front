<template>
  <div
    :class="{
      fader: true,
      '-show': show
    }"
  />
</template>

<script>
export default {
  name: 'Fader',
  data() {
    return {
      show: false
    }
  },
  sockets: {
    endEnigme: function ({ stepGame }) {
      console.log('END ENIGME', stepGame)
      setTimeout(
        () => {
          this.show = true
        },
        stepGame === 'Enigme2' ? 1000 : 0
      )
    },
    buildEnigme: function ({ stepGame }) {
      console.log('BUILD ENIGME', stepGame)
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.fader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: black;
  opacity: 0;
  transition: all 400ms var(--custom-bezier);

  &.-show {
    pointer-events: initial;
    opacity: 1;
  }
}
</style>
