<template>
  <div class="containerVideoMainScreen">
    <video ref="videoPlayer" class="video-js">
      <source src="http://localhost:8080/video/testRenduVideo.mp4" type="video/mp4" />
      <track kind="captions" src="http://localhost:8080/video/Intro.vtt" srclang="en" label="English" default />
    </video>

    <!--
      <button @click="startVideo">Start Video</button>
      <button @click="playEnigme2">Start Enigme2</button>
      <button @click="playEnigme3">Start Enigme3</button>
      <button @click="playOutro">Start Outro</button>
    -->
  </div>
</template>

<script>
// require('!style-loader!css-loader!video.js/dist/video-js.css')
import 'video.js/dist/video-js.css'

import videojs from 'video.js'
import abLoopPlugin from 'videojs-abloop'

function convertTimeToSeconds(time) {
  const timeArray = time.split(':').map((t) => parseInt(t), 10)
  const seconds = timeArray[0] * 60 + timeArray[1] + timeArray[2] / 24
  return seconds
}

const MARKERS_PLAYER = {
  introDarkness: '0:03:23',
  loopEnigme1: { start: '0:09:18', end: '0:11:18' },
  loopEnigme2: { start: '0:21:18', end: '0:23:20' },
  loopEnigme3: { start: '0:33:20', end: '0:35:21' },
  endEnigme3: '0:46:21',
  outroStartMessages: '0:51:12'
}

const OPTIONS = {
  // responsive: true,
  fluid: true,
  autoplay: true,
  controls: true,

  plugins: {
    abLoopPlugin: {
      loopIfBeforeStart: false,
      loopIfAfterEnd: true
    }
  }
}

export default {
  name: 'VideoMainScreen',
  data() {
    return {
      player: null,
      eventsTime: []
    }
  },
  mounted() {
    const VideoJS = videojs
    abLoopPlugin(window, VideoJS)

    const eventsTime = this.initEventsTime()

    this.player = VideoJS(this.$refs.videoPlayer, OPTIONS, function onPlayerReady() {
      console.log('onPlayerReady', this)

      this.on('timeupdate', function () {
        const currentTime = this.currentTime()

        // console.log(eventsTime, currentTime)

        for (const time of eventsTime) {
          if (currentTime > time.time && time.isPlayed) {
            time.isPlayed = true
            console.log(time.key)
          }
        }
      })
    })

    this.setLoop(MARKERS_PLAYER.loopEnigme1)

    // this.player.abLoopPlugin.onLoopCallBack = function () {
    //   console.log('NEW LOOP')
    // }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    initEventsTime: function () {
      const array = []

      for (const [key, value] of Object.entries(MARKERS_PLAYER)) {
        if (typeof value === 'object') {
          array.push({
            time: convertTimeToSeconds(value.start),
            isPlayed: false,
            key: 'play' + key
          })
        } else {
          array.push({
            time: convertTimeToSeconds(value),
            isPlayed: false,
            key: 'play' + key
          })
        }
      }

      this.$data.eventsTime = array
      return this.$data.eventsTime
    },
    startVideo: function () {
      this.player.play()
    },
    setLoop: function ({ start, end }) {
      const startSeconds = convertTimeToSeconds(start)
      const endSeconds = convertTimeToSeconds(end)
      console.log('setLoop', { start, end }, { startSeconds, endSeconds })
      this.player.abLoopPlugin.setStart(startSeconds).setEnd(endSeconds).enable()
    },
    stopLoop: function () {
      this.player.abLoopPlugin.disable()
    },

    playEnigme2() {
      this.setLoop(MARKERS_PLAYER.loopEnigme2)
    },
    playEnigme3() {
      this.setLoop(MARKERS_PLAYER.loopEnigme3)
    },
    playOutro() {
      this.stopLoop()
    }
  }
}
</script>

<style lang="scss" scoped>
.containerVideoMainScreen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;

  > video,
  .video-js {
    width: 100%;
    height: 100%;
  }

  .vjs-tech {
    object-fit: cover;
  }
}
</style>
