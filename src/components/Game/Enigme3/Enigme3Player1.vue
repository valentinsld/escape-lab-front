<template>
  <div class="chat">
    <div class="chat__header">
      <p v-if="text.sailerName" class="chat__title" v-html="text.sailerName" />
    </div>
    <div class="chat__messages">
      <Messages :messages="messages" @onanimation:iscomplete="handleMessagesComplete" />
    </div>
    <div ref="choice-buttons" class="chat__choices">
      <h4 v-html="'Répondez au vendeur'" />
      <div class="chat__choices__buttons">
        <button v-if="questions[0]" @click="chooseQuestion(0)" v-html="questions[0].question"></button>
        <button v-if="questions[1]" @click="chooseQuestion(1)" v-html="questions[1].question"></button>
        <!-- if last question to choose bot -->
        <button
          v-if="finalAnswers[0]"
          class="chat__choices__btn--strong"
          @click="chooseBotAnswer('bot')"
          v-html="finalAnswers[0]"
        />
        <button
          v-if="finalAnswers[1]"
          class="chat__choices__btn--strong"
          @click="chooseBotAnswer('normal')"
          v-html="finalAnswers[1]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'

import Messages from '@/components/block/Messages'
import { finalAnswer, questionsData, textContent } from '@/data/enigme3'
export default {
  name: 'Enigme3player1',
  sockets: {
    startEnigme: function () {
      this.start()
    }
  },
  components: { Messages },
  props: {
    trueRules: {
      type: Array,
      default: () => []
    },
    sellerType: {
      type: String,
      default: null
    },
    product: {
      type: Object,
      default: () => {}
    },
    questionsToDisplay: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      choicePos: null,
      buttons: null,
      questions: [],
      finalAnswers: [],
      choices: [],
      text: textContent,
      messages: [{ isReveal: true, isReceived: false, content: 'Bonjour !' }]
    }
  },
  mounted() {
    console.log(this.product, 'data')
    this.generateQuestions()
    this.$nextTick(() => {
      this.buttons = this.$refs?.['choice-buttons']
    })
  },
  methods: {
    start() {
      console.log('START ENIGME')
    },

    generateQuestions() {
      this.questions = questionsData(this.product)
        .sort(() => Math.random() - Math.random())
        .slice(0, this.questionsToDisplay)
    },
    chooseQuestion(pos) {
      this.hideButtons()
      this.choicePos = pos
      this.messages.push({ isReceived: false, isReveal: false, content: this.questions[this.choicePos].question })
      this.getResponse()
    },
    nextChoice() {
      // remove choice btn and place non selected question btn at the end of questions
      this.questions.splice(this.choicePos, 1)
      this.questions.length > 0
        ? this.questions.splice(this.questions.length, 0, this.questions.splice(0, 1)[0])
        : this.finalChoice()
    },
    getResponse() {
      const answer =
        this.trueRules.filter((e) => e.slug === this.questions[this.choicePos].slug).length > 0
          ? 'botAnswer'
          : 'normalAnswer'
      this.messages.push({
        isReveal: false,
        isReceived: true,
        content: this.questions[this.choicePos][answer]
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
    },
    finalChoice() {
      // push final choices
      this.finalAnswers = [finalAnswer.bot, finalAnswer.normal]
    },
    chooseBotAnswer(sellerType) {
      sellerType === this.sellerType ? console.log('ouiii réussi !') : console.log('raté')
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.chat {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8px);
  border: 4px solid var(--color-black);
}

.chat__header {
  padding: 2em;
  text-align: center;
  border-bottom: 4px solid var(--color-black);
}

.chat__title {
  font-size: 1.5rem;
  font-weight: bold;
}

.chat__messages {
  flex: 1;
  padding: 2em 1em;
  overflow: scroll;
}

.chat__choices {
  padding: 2em;
  border-top: 4px solid var(--color-black);
}

.chat__choices__btn {
  &--strong {
    font-weight: bold;
  }
}
</style>
