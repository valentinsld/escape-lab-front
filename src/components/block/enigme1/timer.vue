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
    }
  },
  data() {
    return {
      timer: this.$props.initTime
    }
  },
  mounted() {
    this.updateTime()
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
