<template>
  <div class="outro">
    <div ref="messages" class="outro__messages">
      <Messages
        :messages="messages"
        :delay="{ default: 0, firstMsg: 0 }"
        @onanimation:iscomplete="handleMessageComplete"
      />
    </div>
    <Button v-if="endVideo" text="Voir des statistiques" :on-click="goToStats" />
  </div>
</template>

<script>
import Anime from 'animejs'

import Button from '@/components/block/button'
import Messages from '@/components/block/Messages'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'OutroPlayer',
  components: {
    Button,
    Messages
  },
  data() {
    return {
      messages: [],
      endVideo: false
    }
  },
  sockets: {
    endVideo: function () {
      console.log('endVideo')
      // this.endVideo = true
    },
    'outro-startMessages': function () {
      this.$socket.emit('outro-recevedMessage')
    },
    'outro-message': function ({ user, message }) {
      const newMessage = {
        isReceived: user === this.$store.state[S.typeScreen],
        isReveal: false,
        content: message
      }
      this.$data.messages.push(newMessage)
      this.$socket.emit('outro-recevedMessage')
    },
    'outro-end': function () {
      this.endVideo = true
    }
  },
  methods: {
    goToStats() {
      this.$router.push({ path: '/results' })
    },

    handleMessageComplete() {
      Anime({
        targets: this.$refs.messages,
        scrollTop: this.$refs.messages.scrollHeight,
        duration: 750,
        easing: 'cubicBezier(0.12, 0.74, 1.0, 0.99)'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.outro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__messages {
    width: 100%;
  }
}
</style>
