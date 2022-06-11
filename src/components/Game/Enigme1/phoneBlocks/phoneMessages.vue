<template>
  <div class="container">
    <p class="container__top">Messages</p>

    <div class="container__list">
      <div
        v-for="(message, index) in messages"
        :key="`message_${message.contact}`"
        class="list__item"
        @click="() => setCurrentMessage(index)"
      >
        <div class="item__color" :class="'-' + message.color" />
        <div class="item__content">
          <p class="content__author">{{ message.contact }}</p>
          <p v-if="message.messages.length" class="content__message">
            {{ message.messages[message.messages.length - 1].content }}
          </p>
        </div>
        <div v-if="!readedMessages.includes(message.id)" class="item__notification" />
      </div>
    </div>

    <div class="chat" :class="{ '-open': chatIsOpen }">
      <div class="chat__header">
        <div class="header__retour" @click="closeChat">
          <img :src="BackIon" />
        </div>
        <p class="header__contact">{{ messages[currentMessage].contact }}</p>
      </div>
      <div class="chat__content">
        <Messages :is-anim="false" :messages="messages[currentMessage].messages" />
      </div>
    </div>

    <Notification :contact="notification.contact" :message="notification.message" :on-click="onClickNotification" />
  </div>
</template>

<script>
import BackIon from '@/assets/back.svg'
import Messages from '@/components/block/Messages.vue'
import Notification from '@/components/block/Notification.vue'
// data
import INIT_MESSAGE from '@/data/enigme1Messages.js'

export default {
  name: 'PhoneMessage',
  components: {
    Messages,
    Notification
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
      chatIsOpen: false,
      notification: {
        contact: '',
        message: ''
      },
      readedMessages: [11, 12, 13, 14, 15, 16, 17, 18],
      // images
      BackIon
    }
  },
  computed: {
    messages() {
      return [...this.data, ...INIT_MESSAGE]
    }
  },
  watch: {
    data: function () {
      if (this.data[0]?.messages?.length === 0) return
      if (this.data[0].messages.slice(-1)[0].content === this.$data.notification.message) return

      this.$data.notification = {
        contact: this.data[0].contact,
        message: this.data[0].messages.slice(-1)[0].content
      }

      if (this.$data.chatIsOpen && this.$data.currentMessage === 1) return
      this.$data.readedMessages = this.$data.readedMessages.filter((v) => v !== 1)
    }
  },
  methods: {
    setCurrentMessage(index) {
      this.$data.currentMessage = index
      this.$data.chatIsOpen = true

      // add
      this.$data.readedMessages.push(this.messages[index].id)
    },
    closeChat() {
      this.$data.chatIsOpen = false
    },

    onClickNotification() {
      this.setCurrentMessage(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'phoneMessages.scss';
</style>
