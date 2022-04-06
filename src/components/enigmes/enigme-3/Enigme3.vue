<template>
  <div class="enigme-3">
    <p>Enigme 3</p>
  </div>
</template>

<script>
import { enigme3Data } from '@/data/enigme3'
export default {
  name: 'Enigme3',
  data() {
    return {
      isBot: false
    }
  },
  mounted() {
    this.generateAnnonce()
  },
  methods: {
    generateAnnonce() {
      // choose if fake annonce or not
      this.isBot = Math.random() < 0.5

      console.log(this.isBot)

      this.pickRules()
    },
    pickRules() {
      console.log(
        enigme3Data()
          .rules.sort(() => Math.random() - Math.random())
          .slice(0, enigme3Data().config.rulesToDetectBot)
      )
      //pick rules to detect bot
      /*if (this.isBot) {
        enigme3Data().rules
      } else {
      }*/
    }
  }
}
</script>

<style lang="scss" scoped></style>
