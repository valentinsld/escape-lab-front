<template>
  <div
    :class="{
      introPlayer: true,
      '-isDark': isDark
    }"
  >
    <h1>Intro Player</h1>

    <div v-if="!startVideo">
      <Messages :messages="messages" :delay="{ default: 0, firstMsg: 0 }" />
    </div>

    <p v-else>{{ textIntro }}</p>
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
      console.log('intro-startVideo !!!!!!')
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
  &.-isDark {
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      content: '';
      background-color: black;
    }
  }
}
</style>
