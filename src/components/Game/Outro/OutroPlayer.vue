<template>
  <div class="screenContainer outroPlayer">
    <div ref="messages" class="outroPlayer__messages">
      <Messages
        :messages="messages"
        :delay="{ default: 0, firstMsg: 0 }"
        @onanimation:iscomplete="handleMessageComplete"
      />
    </div>

    <div v-if="endVideo" class="outroPlayer__end">
      <Button class="end__stats" text="En savoir plus sur les arnaques" :on-click="goToStats" />
      <Button class="end__restart" text="Recommencer l'expérience" :on-click="goToHome" />
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'

import Button from '@/components/block/button'
import Messages from '@/components/block/Messages'
import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'

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
      // console.log('endVideo')
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
    goToHome() {
      this.$socket.emit('leave')

      this.$store.commit(M.typeScreen, null)
      this.$store.commit(M.idRoom, null)
      this.$store.commit(M.listUsers, {})
      this.$store.commit(M.playerIsReady, [])
      this.$store.commit(M.isStart, false)
      this.$store.commit(M.stepGame, null)

      this.$nextTick(() => {
        this.$router.push({ path: '/' })
        window.location.reload()
      })
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
.outroPlayer {
  display: flex;
  // flex-direction: column;
  // align-items: align;
  // justify-content: center;

  padding: 0;

  &__messages {
    width: 100%;
  }

  &__end {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 32px;
    background-color: rgba(0, 0, 0, 0.6);
    animation: enShow 450ms var(--custom-bezier);

    & > * {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@keyframes enShow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
