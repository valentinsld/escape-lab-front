<template>
  <div class="chat screenContainer -enigme3">
    <div class="chat__header">
      <p v-if="text.sailerName" class="chat__title" v-html="text.sailerName" />
    </div>
    <div ref="messages" class="chat__messages">
      <p v-if="!isMessageSend" class="chat__messages__helper-message">
        Envoyez une première question pour lancer la discussion avec le vendeur.
      </p>
      <Messages :messages="messages" color="enigme3" @onanimation:iscomplete="handleMessagesComplete" />
    </div>
    <div class="chat__choices-container">
      <div ref="choice-buttons" class="chat__choices">
        <div class="chat__choices__buttons">
          <button
            v-if="questions[0]"
            class="chat__choices__btn"
            :style="{ 'background-image': `url(' ${getSource(questions[0].slug)}  ')` }"
            @click="chooseQuestion(0)"
            v-html="questions[0].btnLabel"
          ></button>
          <p v-if="questions[1]" class="chat__choices__or">ou</p>
          <button
            v-if="questions[1]"
            class="chat__choices__btn"
            :style="{ 'background-image': `url(' ${getSource(questions[1].slug)}  ')` }"
            @click="chooseQuestion(1)"
            v-html="questions[1].btnLabel"
          ></button>
          <p v-if="allQuestionsAsked">Je crois avoir posé toutes les questions</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'

import Messages from '@/components/block/Messages'
import { questionsData, textContent } from '@/data/enigme3'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme3player1',
  sockets: {
    'enigme3-restart': function () {
      this.reInitData()
    }
  },
  components: { Messages },
  props: {
    trueRules: {
      type: Array,
      default: () => []
    },
    product: {
      type: Object,
      default: () => {}
    },
    questionsToDisplay: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      choicePos: null,
      buttons: null,
      questions: [],
      isMessageSend: false,
      choices: [],
      text: textContent,
      messages: [],
      allQuestionsAsked: false
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
      this.questions = questionsData(this.product)
        .sort(() => Math.random() - Math.random())
        .slice(0, this.questionsToDisplay)
    },
    chooseQuestion(pos) {
      this.$store.state[S.sounds]?.['select-3'].play()
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
        : (this.allQuestionsAsked = true)
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
    reInitData() {
      this.messages = []
      this.choicePos = null
      this.buttons = null
      this.questions = []
      this.isMessageSend = false
      this.choices = []
      this.allQuestionsAsked = false

      this.$nextTick(() => {
        this.generateQuestions()

        this.buttons = this.$refs?.['choice-buttons']
      })
    },
    getSource(slug) {
      return require(`@/assets/images/enigme3/notice/icons/${slug}.svg`)
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
  background: var(--color-white);
}

.chat {
  display: flex;
  flex-direction: column;
  // height: calc(100 * var(--vhRes, 1vh));
  // border: 4px solid var(--color-black);

  padding: 0;
}

.chat__header {
  padding: 20px;
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
  // height: 30vh;
  padding: 1em 2em;
  text-align: center;
  border-top: 4px solid var(--color-black);

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }
}

.chat__choices__or {
  margin: 12px 0;
}

.chat__choices__btn {
  width: 100%;
  padding: 1em 1em 1em 4em;
  // margin: 1em 0;
  font-weight: bold;
  color: var(--color-whiteDimmed);
  text-align: left;
  background: var(--color-enigme3) no-repeat center left 15px;
  border: 4px solid var(--color-black);
  border-radius: var(--box-rounded-radius);

  &--strong {
    background: var(--color-blue);
  }
}
</style>
