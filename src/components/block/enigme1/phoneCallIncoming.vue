<template>
  <div @click="click">
    <p @click="click">Phone call Incoming !!!</p>
  </div>
</template>

<script>
export default {
  name: 'PhoneCallIncoming',
  props: {
    duration: {
      type: Number,
      default() {
        return 3500
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit('onEndCall', true)
    }, this.duration)
  },
  methods: {
    click() {
      this.$emit('onEndCall', true)
    }
  }
}
</script>
