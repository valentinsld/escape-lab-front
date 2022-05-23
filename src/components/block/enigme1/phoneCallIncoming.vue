<template>
  <div class="phoneCall" @click="click">
    <p class="phoneCall__phoneNumber">+0834871831</p>
    <p class="phoneCall__phoneNumberInfos">Peut-être : LaPorte Services</p>

    <button class="phoneCall__end" @click="click">
      <img :src="PhoneIcon" />
    </button>
  </div>
</template>

<script>
import PhoneIcon from '@/assets/icon-phone.svg'

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
  data() {
    return {
      PhoneIcon
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

<style lang="scss" scoped>
@import './phoneCallIncoming';
</style>
