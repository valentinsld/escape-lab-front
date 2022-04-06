<template>
  <div class="enigme-3">
    <p>Enigme 3</p>
    <Chat :questions="questions" />
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
      trueRules: [],
      questions: []
    }
  },
  mounted() {
    this.generateAnnonce()
  },
  methods: {
    generateAnnonce() {
      // choose if fake annonce or not
      this.isBot = Math.random() < 0.5
      this.pickValidRules()
      this.generateQuestions()
      console.log('CONFIG bot:', this.isBot, 'trueRules:', this.trueRules, 'questions:', this.questions)
    },
    pickValidRules() {
      const trueRulesNumber = this.isBot ? enigme3Data().config.rulesToDetectBot : 2
      this.trueRules = enigme3Data()
        .rules.sort(() => Math.random() - Math.random())
        .slice(0, trueRulesNumber)
    },
    generateQuestions() {
      this.questions = enigme3Data()
        .rules.filter(function (obj) {
          return obj.chat
        })
        .sort(() => Math.random() - Math.random())
        .slice(0, enigme3Data().config.questionsToDisplay)
    }
  }
}
</script>

<style lang="scss" scoped></style>
