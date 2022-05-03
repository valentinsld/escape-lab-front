<template>
  <div>Timer: {{ timer }}</div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    initTime: {
      type: Number,
      default: 20
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
      }, 1000)
    }
  }
}
</script>
