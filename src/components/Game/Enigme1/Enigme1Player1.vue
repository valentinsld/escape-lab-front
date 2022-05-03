<template>
  <div>
    <h1>Enigme 1 Player1</h1>
    <Timer @onTimeChange:step="updateTime" @onTimeChange:end="endTime" />
  </div>
</template>

<script>
import Timer from '@/components/block/enigme1/timer.vue'

export default {
  name: 'Enigme1Player1',
  components: {
    Timer
  },
  sockets: {
    startEnigme: function () {
      this.start()
    }
  },
  methods: {
    start() {
      console.log('START ENIGME')
    },

    updateTime(time) {
      console.log('updateTime', time)
    },
    endTime(time) {
      console.log('endTime', time)
    }
  }
}
</script>
