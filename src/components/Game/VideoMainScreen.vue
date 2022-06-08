<template>
  <div class="containerVideoMainScreen" :class="{ '-hide': !seePlayer }">
    <video ref="videoPlayer" class="video-js">
      <source src="/video/videos.m3u8" type="application/x-mpegURL" />
      <track kind="captions" src="/video/Intro.vtt" srclang="en" label="English" default />
    </video>
  </div>
</template>

<script>
// require('!style-loader!css-loader!video.js/dist/video-js.css')
import 'video.js/dist/video-js.css'

// var VideoJS = require('video.js')
import videojs from 'video.js'
import abLoopPlugin from 'videojs-abloop'

require('videojs-contrib-quality-levels')
require('videojs-hls-quality-selector')
require('@videojs/http-streaming')

import { STATE as S } from '@/store/helpers'

function convertTimeToSeconds(time) {
  const timeArray = time.split(':').map((t) => parseInt(t), 10)
  const seconds = timeArray[0] * 60 + timeArray[1] + timeArray[2] / 24
  return seconds
}

const MARKERS_PLAYER = {
  introDarkness: '0:14:02',
  loopEnigme1: { start: '0:17:18', end: '0:19:18' },
  loopEnigme2: { start: '0:29:18', end: '0:31:20' },
  loopEnigme3: { start: '0:41:20', end: '0:43:21' },
  startOutro: '0:54:21',
  outroStartMessages: '0:59:12'
}

const OPTIONS = {
  responsive: true,
  fluid: true,
  autoplay: false,
  controls: false,
  muted: false,

  preload: true,
  controlBar: {
    liveDisplay: true,
    pictureInPictureToggle: false
  },

  plugins: {
    abLoopPlugin: {
      loopIfBeforeStart: false,
      loopIfAfterEnd: true
    }
  },

  loadingSpinner: true,
  html5: {
    vhs: {
      limitRenditionByPlayerDimensions: false,
      bandwidth: 6194304
    }
  },
  withCredentials: true
}

const IS_DEV = process.env.NODE_ENV === 'development' && !process.env.VUE_APP_LOAD_SOCKETS_FROM_PROD

export default {
  name: 'VideoMainScreen',
  data() {
    return {
      player: null,
      seePlayer: false,
      eventsTime: [],
      isStepGame: false
    }
  },
  sockets: {
    'intro-startVideo': function () {
      this.startVideo()
      this.$data.seePlayer = true
    },
    setStepGame: function ({ stepGame, stepGameNumber }) {
      console.log('setStepGame', { stepGame, stepGameNumber })

      this.$data.isStepGame = true
      this.$data.seePlayer = true
      if (stepGame === 'Outro') {
        this.playEndOutro()
      } else {
        this.setLoop(MARKERS_PLAYER[`loop${stepGame}`])
        this.player.abLoopPlugin.playLoop()
      }

      // reset time for nextEnigme
      for (let i = stepGameNumber; i < this.$data.eventsTime.length; i++) {
        this.$data.eventsTime[i].isPlayed = false
      }

      setTimeout(() => {
        this.$data.isStepGame = false
      }, 1000)
    },
    endEnigme: function ({ stepGame }) {
      // console.log('endEnigme', { stepGame }, this[`play${stepGame}`])
      this[`playEnd${stepGame}`]?.call()
    },
    playEndOutro: function () {
      this.player.abLoopPlugin.disable()
      this.player.play()
    }
  },
  mounted() {
    const THAT = this
    // const VideoJS = VideoJS
    abLoopPlugin(window, videojs)

    const eventsTime = this.initEventsTime()

    this.player = videojs(this.$refs.videoPlayer, OPTIONS, function onPlayerReady() {
      // console.log('onPlayerReady', this)

      this.on('timeupdate', function () {
        const currentTime = this.currentTime()

        for (const time of eventsTime) {
          if (currentTime > time.time && !time.isPlayed) {
            time.isPlayed = true
            THAT[time.key]?.call()
          }
        }
      })

      this.on('ended', function () {
        THAT.endVideo()
      })
    })

    this.player.hlsQualitySelector({
      displayCurrentQuality: true
    })

    // console.log(this.$store.state[S.isStart], this.$store.state[S.stepGame])
    if (this.$store.state[S.stepGame] === 'Intro') {
      this.playEnigme1()
    } else if (IS_DEV) {
      let stepGame

      switch (this.$store.state[S.stepGame]) {
        case 'Enigme1':
          stepGame = 1
          break
        case 'Enigme2':
          stepGame = 2
          break
        case 'Enigme3':
          stepGame = 3
          break
      }
      if (stepGame) this.$socket.emit('setStepGame', { stepGame })
    }
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
        const time = typeof value === 'object' ? value.start : value
        array.push({
          time: convertTimeToSeconds(time),
          isPlayed: false,
          key: 'play' + key
        })
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

      this.player.abLoopPlugin.setStart(startSeconds).setEnd(endSeconds).enable()
    },
    stopLoop: function () {
      this.player.abLoopPlugin.disable()
    },

    playEnigme1() {
      this.setLoop(MARKERS_PLAYER.loopEnigme1)
    },
    playEndEnigme1() {
      // TODO : add forced from PANE
      this.setLoop(MARKERS_PLAYER.loopEnigme2)
    },
    playEndEnigme2() {
      this.setLoop(MARKERS_PLAYER.loopEnigme3)
    },
    playEndEnigme3() {
      this.stopLoop()
    },
    playEndOutro() {
      this.stopLoop()
      this.player.currentTime(convertTimeToSeconds(MARKERS_PLAYER.startOutro))
      this.player.play()
    },
    endVideo() {
      console.log('END VIDEO')
      this.$socket.emit('endVideo')
    },

    // events on playing video
    playintroDarkness() {
      if (this.$data.isStepGame) return
      this.$socket.emit('intro-darkScene')
    },
    playloopEnigme1() {
      if (this.$data.isStepGame) return
      this.$socket.emit('nextEnigme')
    },
    playloopEnigme2() {
      if (this.$data.isStepGame) return
      this.$socket.emit('nextEnigme')
    },
    playloopEnigme3() {
      if (this.$data.isStepGame) return
      this.$socket.emit('nextEnigme')
    },
    // playstartOutro() {
    //   if (this.$data.isStepGame) return
    //   this.$socket.emit('nextEnigme')
    // },
    playoutroStartMessages() {
      console.log('outro-startMessages')
      this.$socket.emit('outro-startMessages')
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
  transition: opacity 0.3s ease-in-out;

  &.-hide {
    opacity: 0;
  }

  > video,
  .video-js {
    width: 100%;
    height: 100%;
  }

  .vjs-tech {
    object-fit: cover;
    object-position: center center;
    max-height: 100vh;
  }
}
</style>
