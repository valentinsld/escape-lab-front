<template>
  <div class="notice">
    <div v-for="(rule, i) in rules" :key="i" class="notice__rules-container">
      <div class="notice__rule">
        <h2 class="notice__rule__title" v-html="rule.name" />
        <p class="notice__rule__description" v-html="rule.description" />
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
    }
  }
}
</script>
