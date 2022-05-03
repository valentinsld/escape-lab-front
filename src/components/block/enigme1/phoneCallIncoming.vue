<template>
  <div @click="click">
    <p @click="click">Phone call Incoming !!!</p>
  </div>
</template>

<script>
const TIME_BEFORE_AUTO_HANG_UP = 3500

export default {
  name: 'PhoneCallIncoming',
  mounted() {
    setTimeout(() => {
      this.$emit('onEndCall', true)
    }, TIME_BEFORE_AUTO_HANG_UP)
  },
  methods: {
    click() {
      console.log('click')
      this.$emit('onEndCall', true)
    }
  }
}
</script>
