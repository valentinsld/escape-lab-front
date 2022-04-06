<template>
  <div class="chat">
    <p class="chat__title">Chat interface</p>
    <ul class="chat__messages">
      <li v-for="(item, index) in messages" :key="index" v-html="item" />
    </ul>
    <div class="chat__choices">
      <button v-if="questions[0]" @click="chooseQuestion(0)" v-html="questions[0].chat.question"></button>
      <button v-if="questions[1]" @click="chooseQuestion(1)" v-html="questions[1].chat.question"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    questions: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      choices: [],
      messages: ['Le premier message', 'le second mesg']
    }
  },
  mounted() {},
  methods: {
    chooseQuestion(pos) {
      this.messages.push(this.questions[pos].chat.question)
      // remove choice and place non selected question at the end
      this.$props.questions.splice(pos, 1)
      this.$props.questions.splice(this.$props.questions.length, 0, this.$props.questions.splice(0, 1)[0])
      console.log(this.$props.questions, 'question')
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  background: var(--color-grey-light);
}
</style>
