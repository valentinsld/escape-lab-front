<template>
  <div class="phoneCall">
    <img class="phoneCall__sound" :src="SoundIcon" />
    <p class="phoneCall__phoneNumber">+0834871831</p>
    <p class="phoneCall__phoneNumberInfos">Peut-être : LaPorte Services</p>

    <p class="phoneCall__time">{{ timeString }}</p>
    <p class="phoneCall__numbeEntered">{{ numbeEntered.join('') }}</p>

    <div class="phoneCall__pad">
      <button v-for="num in 9" :key="`button_${num}`" @click="() => clickPad(num)">{{ num }}</button>
      <div class="-close">
        <button @click="hangUp">
          <img :src="PhoneIcon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable unused-imports/no-unused-vars, no-unused-vars */
import Sound from '@/helpers/Sound'

const SOUNDS_ORIGIN = 'soundsEnigme1/'
const SOUNDS_STEPS = [
  '0-intro',
  '0-wrong',
  '1-0',
  '1-wrongCode',
  '1-1',
  '1-wrongCode',
  '1-2',
  '1-3-wrong',
  '2-0',
  '1-wrongCode',
  '2-1',
  '2-2-end'
]
const PARAMS = {
  timeBeforeLoop: 500
}

import { Howl } from 'howler'

import PhoneIcon from '@/assets/icon-phone.svg'
import SoundIcon from '@/assets/icon-sound.svg'
import convertSecondToTime from '@/helpers/convertSecondToTIme.js'

export default {
  name: 'PhoneCall',
  data() {
    return {
      PhoneIcon,
      SoundIcon,
      time: 0,
      timeString: '0:00',
      numbeEntered: [],
      soundLastStep: 0,
      soundStep: 0,
      callingSound: null,
      sound: null
    }
  },
  computed: {
    soundSrc() {
      const audio = SOUNDS_ORIGIN + SOUNDS_STEPS[this.soundStep]
      return [audio + '.webm', audio + '.mp3']
    }
  },
  sockets: {
    'enigme1-action': function (data) {
      this.numbeEntered.push(' ')
      this.$data.soundLastStep = this.$data.soundStep
      this.$data.soundStep = data.step
      this.setSound()
    }
  },
  mounted() {
    this.$data.callingSound = new Sound('calling', { volume: 0.2 })
    setTimeout(() => {
      this.updateTime()
      this.setSound()
    }, 5000)
  },
  beforeDestroy() {
    this.$data.sound?.stop()
    this.$data.callingSound?.stop()
  },
  methods: {
    updateTime() {
      setTimeout(() => {
        this.$data.time += 1
        this.$data.timeString = convertSecondToTime(this.$data.time, true)
        this.updateTime()
      }, 1000)
    },
    clickPad(number) {
      new Sound('pad-1', { volume: 2 })
      this.$data.numbeEntered.push(number)
      this.$socket.emit('enigme1-enteredNumber', number)
    },
    hangUp() {
      new Sound('select-2', { volume: 0.2 })
      this.$socket.emit('enigme1-end')
      this.$data.sound.pause()
      this.$data.callingSound?.stop()
    },

    //
    // SOUNDS
    //
    setSound() {
      this.$data.sound?.stop()
      this.$data.sound = new Howl({
        src: this.soundSrc,
        autoplay: true,
        volume: 0.5,
        onend: () => {
          if (this.$data.soundStep === SOUNDS_STEPS.length - 1) {
            this.$socket.emit('enigme1-end')
            return
          }
          // console.log(this.$data.soundStep, [2, 3, 4, 7].includes(this.$data.soundStep))
          // if ([2, 3, 4, 7].includes(this.$data.soundStep)) {
          //   console.log('includes !!')
          //   this.$data.soundStep = this.$data.soundLastStep

          //   return setTimeout(() => this.setSound(), PARAMS.timeBeforeLoop)
          // }

          setTimeout(() => this.$data.sound.play(), PARAMS.timeBeforeLoop)
        }
      })

      this.$data.sound.play()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './phoneCall';
</style>
