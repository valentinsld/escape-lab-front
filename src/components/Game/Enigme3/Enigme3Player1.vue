<template>
  <div class="chat">
    <div class="chat__header">
      <p v-if="text.sailerName" class="chat__title" v-html="text.sailerName" />
    </div>
    <div ref="messages" class="chat__messages">
      <Messages :messages="messages" @onanimation:iscomplete="handleMessagesComplete" />
    </div>
    <div class="chat__choices-container">
      <div ref="choice-buttons" class="chat__choices">
        <!--        <h4 v-html="'Répondez au vendeur'" />-->
        <div class="chat__choices__buttons">
          <button
            v-if="questions[0]"
            class="chat__choices__btn"
            @click="chooseQuestion(0)"
            v-html="questions[0].question"
          ></button>
          <p v-if="questions[1]">ou</p>
          <button
            v-if="questions[1]"
            class="chat__choices__btn"
            @click="chooseQuestion(1)"
            v-html="questions[1].question"
          ></button>
          <!-- if last question to choose bot -->
          <button
            v-if="finalAnswers[0]"
            class="chat__choices__btn chat__choices__btn--strong"
            @click="chooseBotAnswer('bot')"
            v-html="finalAnswers[0]"
          />
          <p v-if="finalAnswers[1]">ou</p>
          <button
            v-if="finalAnswers[1]"
            class="chat__choices__btn chat__choices__btn--strong"
            @click="chooseBotAnswer('normal')"
            v-html="finalAnswers[1]"
          />
        </div>
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
      Anime({
        targets: this.$refs.messages,
        scrollTop: this.$refs.messages.scrollHeight,
        duration: 750,
        easing: 'cubicBezier(0.12, 0.74, 1.0, 0.99)'
      })
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
      Anime({
        targets: this.buttons,
        opacity: [0, 1],
        duration: 250,
        easing: 'easeInExpo'
      })
    },
    hideButtons() {
      Anime({
        targets: this.buttons,
        opacity: [1, 0],
        duration: 150,
        easing: 'easeInExpo'
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

.chat__choices-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
  padding: 1em 2em;
  text-align: center;
  border-top: 4px solid var(--color-black);

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }
}

.chat__choices__btn {
  width: 100%;
  padding: 1em;
  margin: 1em 0;
  font-weight: bold;
  color: #f8f8f8;
  background: #f59535;
  border: 4px solid var(--color-black);
  border-radius: 27px;

  &--strong {
    background: #3577f5;
  }
}
</style>
