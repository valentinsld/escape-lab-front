<template>
  <div class="notice">
    <div class="notice__rules-container">
      <div v-for="i in 2" :key="i" class="notice__rule">
        <img :src="getSource(i)" />
      </div>
    </div>
  </div>
</template>

<script>
import { noticeData } from '@/data/enigme3'
export default {
  name: 'Enigme3Player2',
  data() {
    return {
      rules: noticeData()
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
    }
  }
}
</script>
<style lang="scss" scoped>
.notice__rule {
  position: absolute;
}
</style>
