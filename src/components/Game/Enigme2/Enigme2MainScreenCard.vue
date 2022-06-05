<template>
  <div :class="{ card: true, isCurrent: isCurrent }">
    <p>
      <strong>De : </strong>
      <span>{{ data.from }}</span>
    </p>
    <p>
      <strong>Objet : </strong>
      <span>{{ data.subject }}</span>
    </p>
    <p>
      {{ data.text }}
    </p>
  </div>
</template>

<script>
import Anime from 'animejs'
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'

export default {
  name: 'Enigme2MainScreenCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen],
    owner() {
      return this.data.owner
    },
    isCurrent() {
      return this.data.owner === this.typeScreen
    }
  }),
  watch: {
    owner() {
      //
      // PLAY ANIMATION ON OWNER CHANGE & ISCURRENT
      //
      if (!this.isCurrent) return

      const P0 = -this.$el.clientHeight
      const P_END = window.innerHeight + this.$el.clientHeight
      const P1 = window.innerHeight * 0.2
      const P2 = window.innerHeight * 0.8 - this.$el.clientHeight / 2

      Anime({
        targets: this.$el,
        keyframes: [
          { translateY: P0, duration: 0 },
          { translateY: P1, duration: (this.data.duration * 1) / 12 },
          { translateY: P2, duration: (this.data.duration * 10) / 12 },
          { translateY: P_END, duration: (this.data.duration * 1) / 12 }
        ],
        // translateY: [-this.$el.clientHeight, window.innerHeight + this.$el.clientHeight],
        translateX: ['-50%', '-50%'],
        duration: this.data.duration,
        easing: 'linear',
        complete: () => {
          console.log('END')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  top: 0;
  left: 50%;
  background-color: var(--color-whiteDimmed);
  border: black solid 5px;
  border-radius: 30px;
  box-shadow: 6px 6px 0 var(--color-black);
  opacity: 0;
  transition: opacity 250ms ease-in-out;
  transform: translate3d(-50%, 0, 0);
  will-change: transform;

  &.isCurrent {
    opacity: 1;
  }
}
</style>
