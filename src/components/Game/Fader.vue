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
      let time = 0
      switch (stepGame) {
        case 'Enigme2':
          time = 1000
          break
        case 'Enigme3':
          time = 2000
          break
      }
      setTimeout(() => {
        this.show = true
      }, time)
    },
    buildEnigme: function ({ stepGame }) {
      if (!stepGame) return
      this.show = false
    },
    'outro-startMessages': function () {
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
