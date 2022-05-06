<template>
  <div class="notice">
    <div class="notice__rules-container">
      <div v-for="i in 2" :key="i" :class="`notice__rule notice__rule--${i}`" :style="ruleStyle(i)">
        <img class="notice__rule__img" :src="getSource(i)" />
      </div>
      <button @click="prevQuestion">Prev</button>
      <button @click="nextQuestion">Next</button>
    </div>
  </div>
</template>

<script>
import { noticeData } from '@/data/enigme3'
export default {
  name: 'Enigme3Player2',
  data() {
    return {
      rules: noticeData(),
      currentPage: 1
    }
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
    nextQuestion() {
      if (this.currentPage < 2) this.currentPage += 1
    },
    prevQuestion() {
      if (this.currentPage > 1) this.currentPage -= 1
    }
  }
}
</script>
<style lang="scss" scoped>
.notice {
  height: 100vh;
  background: #3577f5;
}

.notice__rule {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
