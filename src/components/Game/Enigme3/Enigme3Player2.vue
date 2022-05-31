<template>
  <div ref="interactElement" class="notice">
    <div class="notice__rules-container">
      <div
        v-for="i in numberOfPages"
        ref="rule"
        :key="i"
        :class="`notice__rule notice__rule--${i}`"
        :style="ruleStyle(i)"
      >
        <div class="notice__rule__wrapper">
          <img class="notice__rule__img" :src="getSource(i)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'
import interact from 'interact.js'

export default {
  name: 'Enigme3Player2',
  data() {
    return {
      currentPage: 1,
      numberOfPages: 7,
      listeningSwipe: true
    }
  },
  mounted() {
    this.currentPage = 1

    const element = this.$refs.interactElement
    interact(element).draggable({
      onmove: (event) => {
        if (event.dx > 2 && this.listeningSwipe) {
          this.listeningSwipe = false
          this.prevRule()
        }
        if (event.dx < -2 && this.listeningSwipe) {
          this.listeningSwipe = false
          this.nextRule()
        }
      },
      onend: () => {
        this.listeningSwipe = true
      }
    })
  },
  beforeDestroy() {
    interact(this.$refs.interactElement).unset()
  },
  sockets: {
    startEnigme: function () {
      this.start()
    }
  },
  methods: {
    start() {
      console.log('START ENIGME')
    },
    getSource(i) {
      return require(`@/assets/images/enigme3/notice/page-${i}.png`)
    },
    ruleStyle(i) {
      return {
        zIndex: 100 - i
      }
    },
    nextRule() {
      if (this.currentPage < this.numberOfPages) {
        Anime({
          targets: this.$refs?.rule[this.currentPage - 1],
          translateX: ['-50%', -140],
          rotate: -15,
          translateY: ['-50%', '-50%'],
          duration: 500,
          easing: 'cubicBezier(0.12, 0.74, 1.0, 0.99)'
        })
        this.currentPage += 1
      }
    },
    prevRule() {
      if (this.currentPage > 1) {
        Anime({
          targets: this.$refs?.rule[this.currentPage - 2],
          rotate: 0,
          translateX: [-140, '-50%'],
          translateY: ['-50%', '-50%'],
          duration: 500,
          easing: 'cubicBezier(0.12, 0.74, 1.0, 0.99)'
        })
        this.currentPage -= 1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.notice {
  height: calc(100 * var(--vhRes, 1vh));
  background: #3577f5;
}

.notice__rule {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 305px;
  transform: translate(-50%, -50%);
}

.notice__rule__img {
  width: 100%;
  height: 100%;
}

.notice__rule__wrapper {
  .notice__rule--2 & {
    transform: rotate(3deg);
  }

  .notice__rule--4 & {
    transform: rotate(-2deg);
  }

  .notice__rule--6 & {
    transform: rotate(2deg);
  }
}
</style>
