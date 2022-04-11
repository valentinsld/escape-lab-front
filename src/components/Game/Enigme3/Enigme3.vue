<template>
  <div class="enigme-3">
    <p>Enigme 3</p>
    <Enigme3MainScreen v-if="typeScreen === 'MainScreen'" :product="product" />
    <Enigme3Player1 v-if="typeScreen === 'Player1'" :questions="questions" :true-rules="trueRules" />
    <Enigme3Player2 v-if="typeScreen === 'Player2'" />
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
      data: enigme3Data(),
      isBot: false,
      product: null,
      trueRules: [],
      questions: []
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  }),
  mounted() {
    this.generateConfig()
  },
  methods: {
    generateConfig() {
      // choose if will be fake annonce or not
      this.isBot = Math.random() < 0.5
      this.pickValidRules()
      this.generateQuestions()
      this.generateAnnonce()
      console.log(
        'CONFIG bot:',
        this.isBot,
        'trueRules:',
        this.trueRules,
        'questions:',
        this.questions,
        'product:',
        this.product
      )
    },
    pickValidRules() {
      const trueRulesNumber = this.isBot ? this.data.config.rulesToDetectBot : 2
      this.trueRules = this.data.rules.sort(() => Math.random() - Math.random()).slice(0, trueRulesNumber)
    },
    generateQuestions() {
      this.questions = this.data.rules
        .filter(function (obj) {
          return obj.chat
        })
        .sort(() => Math.random() - Math.random())
        .slice(0, this.data.config.questionsToDisplay)
    },
    generateAnnonce() {
      // select random product
      const product = this.data.products[Math.floor(Math.random() * this.data.products.length)]
      // check if has normal or bot image
      const image = this.trueRules.some((obj) => obj.slug === 'stock') ? product.botImg : product.normalImg
      // check rules to see
      this.product = { name: product.name, description: product.description, img: image }
    }
  }
}
</script>

<style lang="scss" scoped></style>
