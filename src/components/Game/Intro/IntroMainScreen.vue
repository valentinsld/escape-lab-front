<template>
  <div>
    <h1>Intro MainScreen</h1>

    <div v-if="startVideo">
      <h2>Video is started</h2>

      <!-- <button @click="sendDarkScene">Il va faire tout noir</button>
      <button @click="sendEndVideo">Fin Video</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntroMainScreen',
  data() {
    return {
      startVideo: false
    }
  },
  sockets: {
    'intro-startVideo': function () {
      //this.$data.startVideo = true
    }
  },
  methods: {
    sendDarkScene() {
      this.$socket.emit('intro-darkScene')
    },
    sendEndVideo() {
      this.$socket.emit('intro-endVideo')
    }
  }
}
</script>
