<template>
  <div class="screenContainer introPlayer">
    <div></div>
    <Messages v-if="!startVideo" :messages="messages" :delay="{ default: 0, firstMsg: 0 }" />

    <p v-else class="dark">{{ textIntro }}</p>
  </div>
</template>

<script>
import Messages from '@/components/block/Messages'
import { STATE as S } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'

export default {
  name: 'IntroPlayer',
  components: { Messages },
  data() {
    return {
      messages: [],
      startVideo: false,
      isDark: false,
      textIntro:
        this.$store.state[S.typeScreen] === STATE_SCREEN.player + '1'
          ? 'Ce n’est pas très poli de regarder son téléphone quand quelqu’un vous parle !'
          : 'Vous devriez écouter le vendeur qui vous parle, c’est plus poli …'
    }
  },
  mounted() {
    this.initSocketsMessage()
  },
  sockets: {
    // subscribe new message
    'intro-message': function ({ user, message }) {
      const newMessage = {
        isReceived: user === this.$store.state[S.typeScreen],
        isReveal: false,
        content: message
      }
      this.$data.messages.push(newMessage)
      this.$socket.emit('intro-recevedMessage')
    },
    // dark screen
    'intro-darkScene': function () {
      this.$data.isDark = true
    },
    // startVideo
    'intro-startVideo': function () {
      this.$data.startVideo = true
    }
  },
  methods: {
    initSocketsMessage() {
      // launch start
      this.$socket.emit('intro-recevedMessage')
    }
  }
}
</script>

<style lang="scss" scoped>
.introPlayer {
  padding: 0;
}

.dark {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 24px;
  margin: 0;
  color: #fff;
  background-color: #000;
}
</style>
