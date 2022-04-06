<template>
  <div class="enigme-3">
    <p>Enigme 3</p>
    <Chat />
  </div>
</template>

<script>
import Chat from '@/components/enigmes/enigme-3/Chat'
import { enigme3Data } from '@/data/enigme3'
export default {
  name: 'Enigme3',
  components: { Chat },
  data() {
    return {
      isBot: false,
      trueRules: []
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
      const trueRulesNumber = this.isBot ? enigme3Data().config.rulesToDetectBot : 2
      // choose true rules
      /*for (let i = 0; i < trueRulesNumber; i++) {
        this.trueRules.push(Math.floor(Math.random() * enigme3Data().rules.length) + 1)
      }*/
      this.trueRules = enigme3Data()
        .rules.sort(() => Math.random() - Math.random())
        .slice(0, trueRulesNumber)
      console.log(this.trueRules, 'rules')
    }
  }
}
</script>

<style lang="scss" scoped></style>
