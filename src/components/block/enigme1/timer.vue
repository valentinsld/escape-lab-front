<template>
  <div>Timer: {{ timer }}</div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    initTime: {
      type: Number,
      default: 26
    },
    isStart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: this.$props.initTime,
      timerStarted: false
    }
  },
  watch: {
    isStart: function () {
      if (this.$data.timerStarted) return
      this.updateTime()
      this.$data.timerStarted = true
    }
  },
  methods: {
    updateTime() {
      setTimeout(() => {
        this.$data.timer -= 1
        this.$emit('onTimeChange:step', this.$data.timer)

        if (this.$data.timer > 0) {
          this.updateTime()
        } else {
          this.$emit('onTimeChange:end', this.$data.timer)
        }
      }, 23 * (this.$props.initTime - this.$data.timer) + 700) // calcule d'une droite entre A=(0,700) & B=(26,1300)
    }
  }
}
</script>
