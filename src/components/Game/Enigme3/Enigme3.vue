<template>
  <div class="enigme-3">
    <p>Enigme 3</p>
    <Enigme3Player1 v-if="typeScreen === 'Player1'" :questions="questions" :true-rules="trueRules" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme3MainScreen from '@/components/Game/Enigme3/Enigme3MainScreen.vue'
import Enigme3Player1 from '@/components/Game/Enigme3/Enigme3Player1.vue'
import Enigme3Player2 from '@/components/Game/Enigme3/Enigme3Player2.vue'
import { enigme3Data } from '@/data/enigme3'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme3',
  components: { Enigme3MainScreen, Enigme3Player1, Enigme3Player2 },
  data() {
    return {
      isBot: false,
      trueRules: [],
      questions: []
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  }),
  mounted() {
    this.generateAnnonce()
  },
  methods: {
    generateAnnonce() {
      // choose if will be fake annonce or not
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
