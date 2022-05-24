<template>
  <div class="chat">
    <div v-if="solutionAnswer" class="chat__solution">
      <div class="chat__solution__overlay" />
      <div class="chat__solution_popup-end">
        <p class="chat__solution__answer" v-html="solutionAnswer" />
        <div class="chat__solution__rules">
          <p v-for="(rule, item) in trueRules" :key="item" v-html="rule.name" />
        </div>
        <button @click="nextStep">suivant</button>
      </div>
    </div>
    <div class="chat__header">
      <p v-if="text.sailerName" class="chat__title" v-html="text.sailerName" />
    </div>
    <div ref="messages" class="chat__messages">
      <p v-if="!isMessageSend" class="chat__messages__helper-message">
        Envoyez une première question pour lancer la discussion avec le vendeur.
      </p>
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
            v-html="questions[0].btnLabel"
          ></button>
          <p v-if="questions[1]">ou</p>
          <button
            v-if="questions[1]"
            class="chat__choices__btn"
            @click="chooseQuestion(1)"
            v-html="questions[1].btnLabel"
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
import { finalAnswer, questionsData, solution, textContent } from '@/data/enigme3'
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
      isMessageSend: false,
      finalAnswers: [],
      choices: [],
      text: textContent,
      messages: [],
      solutionAnswer: null
    }
  },
  mounted() {
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
      this.isMessageSend = true
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
      this.solutionAnswer =
        sellerType === this.sellerType ? solution[this.sellerType]['success'] : solution[this.sellerType]['fail']
    },
    nextStep() {
      this.$socket.emit('nextEnigme')
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.chat__popup-end {
  width: 70vw;
  background: white;
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
  padding: 0 1em;
  overflow: scroll;
}

.chat__messages__helper-message {
  margin-top: 50%;
  text-align: center;
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

.chat__solution {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.chat__solution_popup-end {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 1em;
  background: white;
  border: 5px solid var(--color-black);
  border-radius: 30px;
  transform: translate(-50%, -50%);
}

.chat__solution__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: 300ms var(--custom-bezier);
}
</style>
