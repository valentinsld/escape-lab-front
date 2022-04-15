<template>
  <div class="containerVideoMainScreen" :class="{ '-hide': !seePlayer }">
    <video ref="videoPlayer" class="video-js" disablePictureInPicture="true" controlslist="nodownload">
      <source src="/video/testRenduVideo.mp4" type="video/mp4" />
      <track kind="captions" src="/video/Intro.vtt" srclang="en" label="English" default />
    </video>
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
  startOutro: '0:46:21',
  outroStartMessages: '0:51:12'
}

const OPTIONS = {
  responsive: true,
  fluid: true,
  autoplay: false,
  controls: false,
  muted: true,

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
  }
}

export default {
  name: 'VideoMainScreen',
  data() {
    return {
      player: null,
      seePlayer: false,
      eventsTime: []
    }
  },
  sockets: {
    'intro-startVideo': function () {
      this.startVideo()
      this.$data.seePlayer = true
    },
    endEnigme: function ({ stepGame }) {
      console.log('endEnigme', { stepGame }, this[`play${stepGame}`])
      this[`playEnd${stepGame}`]?.call()
    }
  },
  mounted() {
    const THAT = this
    const VideoJS = videojs
    abLoopPlugin(window, VideoJS)

    const eventsTime = this.initEventsTime()

    this.player = VideoJS(this.$refs.videoPlayer, OPTIONS, function onPlayerReady() {
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

    this.playEnigme1()

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
    endVideo() {
      console.log('END VIDEO')
    },

    // events on playing video
    playintroDarkness() {
      this.$socket.emit('intro-darkScene')
    },
    playloopEnigme1() {
      // START ENIGME 1
      this.$socket.emit('nextEnigme')
    },
    playloopEnigme2() {
      this.$socket.emit('nextEnigme')
    },
    playloopEnigme3() {
      this.$socket.emit('nextEnigme')
    },
    playstartOutro() {
      this.$socket.emit('nextEnigme')
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
  }
}
</style>
