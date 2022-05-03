<template>
  <div>
    <p>Phone call to + 00 8 34 87 18 31</p>
    <p>{{ numbeEntered.join('') }}</p>
    <p>Time: {{ timeString }}</p>

    <div class="pad">
      <button v-for="num in 9" :key="`button_${num}`" @click="() => clickPad(num)">{{ num }}</button>
      <button @click="() => clickPad(0)">0</button>
    </div>
  </div>
</template>

<script>
import convertSecondToTime from '@/helpers/convertSecondToTIme.js'

export default {
  name: 'PhoneCall',
  data() {
    return {
      time: 0,
      timeString: '0:00',
      numbeEntered: []
    }
  },
  mounted() {
    this.updateTime()
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
    }
  }
}
</script>
