<template>
  <div>
    <p>Phone call to + 00 8 34 87 18 31</p>
    <p>{{ numbeEntered.join('') }}</p>
    <p>Time: {{ timeString }}</p>

    <p>STEP : {{ soundStep }}</p>

    <div class="pad">
      <button v-for="num in 9" :key="`button_${num}`" @click="() => clickPad(num)">{{ num }}</button>
      <button @click="() => clickPad(0)">0</button>
    </div>

    <button @click="nextSound">next</button>
  </div>
</template>

<script>
/* eslint-disable unused-imports/no-unused-vars, no-unused-vars */
const SOUNDS_ORIGIN = 'soundsEnigme1/'
const SOUNDS_STEPS = ['0-intro', '0-wrong', '1-0', '1-1', '1-wrongCode', '1-2', '1-3-wrong', '2-0', '2-1', '2-2-end']
const PARAMS = {
  timeBeforeLoop: 500
}

import { Howl } from 'howler'

import convertSecondToTime from '@/helpers/convertSecondToTIme.js'

export default {
  name: 'PhoneCall',
  data() {
    return {
      time: 0,
      timeString: '0:00',
      numbeEntered: [],
      soundStep: 0,
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
      this.soundStep = data.step
      this.setSound()
    }
  },
  mounted() {
    this.updateTime()
    this.setSound()
  },
  methods: {
    updateTime() {
      setTimeout(() => {
        this.$data.time += 1
        this.$data.timeString = convertSecondToTime(this.$data.time)
        this.updateTime()
      }, 1000)
    },
    clickPad(number) {
      this.$data.numbeEntered.push(number)
      this.$socket.emit('enigme1-enteredNumber', number)
    },

    //
    // SOUNDS
    //
    setSound() {
      this.$data.sound?.pause()
      this.$data.sound = new Howl({
        src: this.soundSrc,
        autoplay: true,
        volume: 0.5,
        onend: () => {
          if (this.soundStep === 9) {
            this.$socket.emit('enigme1-end')
            return
          }
          setTimeout(() => this.$data.sound.play(), PARAMS.timeBeforeLoop)
        }
      })

      this.$data.sound.play()
    },
    nextSound(ev, setIndex = null) {
      console.log(this.$data.soundStep, setIndex, SOUNDS_STEPS.length)
      this.$data.soundStep = setIndex || this.$data.soundStep + 1

      if (this.$data.soundStep >= SOUNDS_STEPS.length) return

      this.setSound()
    }
  }
}
</script>
