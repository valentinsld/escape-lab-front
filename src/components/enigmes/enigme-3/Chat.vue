<template>
  <div class="chat">
    <p class="chat__title">Chat interface</p>
    <Messages :messages="messages" />
    <!--    <div class="chat__messages">
      <p
        v-for="(item, index) in messages"
        ref="messages"
        :key="index"
        class="chat__message"
        :is-received="item.isReceived"
        v-html="item.content"
      />
    </div>-->
    <div ref="choice-buttons" class="chat__choices">
      <button v-if="questions[0]" @click="chooseQuestion(0)" v-html="questions[0].chat.question"></button>
      <button v-if="questions[1]" @click="chooseQuestion(1)" v-html="questions[1].chat.question"></button>
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'

import Messages from '@/components/block/Messages'
export default {
  name: 'Chat',
  components: { Messages },
  props: {
    questions: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      choicePos: null,
      buttons: null,
      choices: [],
      messages: [{ isReveal: true, isReceived: false, content: 'Le premier message' }]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.buttons = this.$refs?.['choice-buttons']
      console.log(this.buttons)
    })
  },
  methods: {
    chooseQuestion(pos) {
      this.choicePos = pos
      this.messages.push({ isReceived: false, isReveal: false, content: this.questions[this.choicePos].chat.question })
      this.getResponse()
      this.nextChoice()
      /*this.$nextTick(() => {
        this.msgAnimation()
      })*/
    },
    nextChoice() {
      // remove choice and place non selected question at the end
      this.$props.questions.splice(this.choicePos, 1)
      this.$props.questions.splice(this.$props.questions.length, 0, this.$props.questions.splice(0, 1)[0])
      console.log(this.$props.questions, 'question')
    },
    getResponse() {
      this.messages.push({
        isReveal: false,
        isReceived: true,
        content: this.questions[this.choicePos].chat.normalAnswer
      })
    },
    getLastMsgIndex(isReceived) {
      return this.messages.map((obj) => obj.isReceived === isReceived).lastIndexOf(true)
    },
    msgAnimation() {
      const tl = Anime.timeline({
        autoplay: false,
        easing: 'easeInExpo'
      })
      tl.add({
        targets: this.buttons,
        opacity: [1, 0],
        duration: 200,
        complete: () => {
          this.nextChoice()
        }
      })
      tl.add({
        targets: this.$refs?.messages[this.getLastMsgIndex(false)],
        opacity: [0, 1],
        duration: 200,
        delay: 50
      })
      tl.add({
        targets: this.$refs?.messages[this.getLastMsgIndex(true)],
        opacity: [0, 1],
        duration: 300,
        delay: 350
      })
      tl.add({
        targets: this.buttons,
        opacity: [0, 1],
        duration: 250
      })
      tl.restart()
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  background: var(--color-grey-light);
}

.chat__messages {
  display: flex;
  flex-direction: column;
}

.chat__message {
  margin-left: auto;

  &[is-received='true'] {
    margin-right: auto;
    margin-left: 0;
  }
}

.chat__choices {
  position: fixed;
  bottom: 5vh;
  left: 50%;
  transform: translate(-50%);
}
</style>
