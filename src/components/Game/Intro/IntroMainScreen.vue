<template>
  <div>
    <h1>Intro MainScreen</h1>

    <div v-if="startVideo">
      <h2>Video is started</h2>

      <button @click="sendEndVideo">End Video</button>
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
      console.log('intro-startVideo !!!!!!')
      this.$data.startVideo = true
    }
  },
  methods: {
    sendEndVideo() {
      this.$socket.emit('intro-endVideo')
    }
  }
}
</script>
