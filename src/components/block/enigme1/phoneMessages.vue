<template>
  <div class="container">
    <p>Phone messageeee</p>

    <div class="list">
      <div
        v-for="(message, index) in messages"
        :key="`message_${message.contact}`"
        class="list__item"
        @click="() => setCurrentMessage(index)"
      >
        <p>{{ message.contact }}</p>
        <p v-if="message.messages.length">{{ message.messages[message.messages.length - 1].content }}</p>
      </div>
    </div>

    <div class="chat" :class="{ '-open': chatIsOpen }">
      <div class="chat__header">
        <p @click="closeChat">Back</p>
        <p>{{ messages[currentMessage].contact }}</p>
      </div>
      <div class="chat__content">
        <Messages :messages="messages[currentMessage].messages" />
      </div>
    </div>
  </div>
</template>

<script>
import Messages from '@/components/block/Messages.vue'
import INIT_MESSAGE from '@/data/enigme1Messages.js'

export default {
  name: 'PhoneMessage',
  components: {
    Messages
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentMessage: 0,
      chatIsOpen: false
    }
  },
  computed: {
    messages() {
      return [...this.data, ...INIT_MESSAGE]
    }
  },
  methods: {
    setCurrentMessage(index) {
      this.$data.currentMessage = index
      this.$data.chatIsOpen = true
    },
    closeChat() {
      this.$data.chatIsOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'phoneMessages.scss';
</style>
