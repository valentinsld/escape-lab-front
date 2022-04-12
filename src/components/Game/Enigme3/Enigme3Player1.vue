<template>
  <div class="chat">
    <p class="chat__title">Chat interface</p>
    <Messages :messages="messages" @onanimation:iscomplete="handleMessagesComplete" />
    <div ref="choice-buttons" class="chat__choices">
      <button v-if="questions[0]" @click="chooseQuestion(0)" v-html="questions[0].chat.question"></button>
      <button v-if="questions[1]" @click="chooseQuestion(1)" v-html="questions[1].chat.question"></button>
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'

import Messages from '@/components/block/Messages'
import { enigme3Data } from '@/data/enigme3'
export default {
  name: 'Enigme3player1',
  components: { Messages },
  props: {
    trueRules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: enigme3Data(),
      choicePos: null,
      buttons: null,
      questions: null,
      choices: [],
      messages: [{ isReveal: true, isReceived: false, content: 'Le premier message' }]
    }
  },
  mounted() {
    this.generateQuestions()
    this.$nextTick(() => {
      this.buttons = this.$refs?.['choice-buttons']
    })
  },
  methods: {
    generateQuestions() {
      this.questions = this.data.rules
        .filter(function (obj) {
          return obj.chat
        })
        .sort(() => Math.random() - Math.random())
        .slice(0, this.data.config.questionsToDisplay)
    },
    chooseQuestion(pos) {
      this.hideButtons()
      this.choicePos = pos
      this.messages.push({ isReceived: false, isReveal: false, content: this.questions[this.choicePos].chat.question })
      this.getResponse()
    },
    nextChoice() {
      // remove choice btn and place non selected question btn at the end of questions
      this.questions.splice(this.choicePos, 1)
      this.questions.splice(this.questions.length, 0, this.questions.splice(0, 1)[0])
    },
    getResponse() {
      const answer =
        this.trueRules.filter((e) => e.slug === this.questions[this.choicePos].slug).length > 0
          ? 'botAnswer'
          : 'normalAnswer'
      console.log('answer :', answer, 'rules :', this.trueRules, 'response :', this.questions[this.choicePos])
      //const answer =
      this.messages.push({
        isReveal: false,
        isReceived: true,
        content: this.questions[this.choicePos].chat[answer]
      })
    },
    handleMessagesComplete() {
      this.nextChoice()
      // Show back choices buttons
      const tl = Anime.timeline({
        easing: 'easeInExpo'
      })
      tl.add({
        targets: this.buttons,
        opacity: [0, 1],
        duration: 250
      })
    },
    hideButtons() {
      const tl = Anime.timeline({
        easing: 'easeInExpo'
      })
      tl.add({
        targets: this.buttons,
        opacity: [1, 0],
        duration: 150
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chat__choices {
  position: fixed;
  bottom: 5vh;
  left: 50%;
  transform: translate(-50%);
}
</style>
