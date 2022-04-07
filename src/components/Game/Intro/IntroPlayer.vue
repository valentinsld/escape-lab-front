<template>
  <div>
    <h1>Intro Player</h1>

    <div v-for="m in messages" :key="`message${m.id}`">
      {{ m.text }}
    </div>

    <h2 v-if="startVideo">VIdeo is started</h2>
  </div>
</template>

<script>
export default {
  name: 'IntroPlayer',
  data() {
    return {
      messages: [],
      startVideo: false
    }
  },
  mounted() {
    this.initSocketsMessage()
  },
  methods: {
    initSocketsMessage() {
      // launch start
      this.$socket.emit('intro-recevedMessage')

      // subscribe new message
      this.sockets.subscribe('intro-message', (props) => {
        this.$data.messages.push(props)
        this.$socket.emit('intro-recevedMessage')
      })

      // startVideo
      this.sockets.subscribe('intro-startVideo', () => {
        console.log('intro-startVideo !!!!!!')
        this.$data.startVideo = true
      })
    }
  }
}
</script>
