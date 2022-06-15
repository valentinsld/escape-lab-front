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
import { STATE as S } from '@/store/helpers'

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
    this.$store.state[S.sounds]?.['phone'].play()
    setTimeout(() => {
      this.$emit('onEndCall', true)
    }, this.duration)
  },
  beforeDestroy() {
    this.$store.state[S.sounds]?.['phone'].stop(0)
  },
  methods: {
    click() {
      this.$store.state[S.sounds]?.['select-2'].play()
      this.$emit('onEndCall', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './phoneCallIncoming';
</style>
