<template>
  <div class="phoneLocked">
    <p class="phoneLocked__hour">15:01</p>

    <div v-if="called && !message.message" class="phoneLocked__recall" @click="recall">
      <img class="recall__img" :src="PhoneIcon" />
      <div class="recall__content">
        <p class="recall__number">+0834871831</p>
        <p class="recall__infos">Peut-être : LaPorte Service</p>
      </div>
    </div>

    <div v-if="message.message" class="phoneLocked__message">
      <p class="message__contact">{{ message.contact }}</p>
      <p class="message__message">{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
import PhoneIcon from '@/assets/icon-phone.svg'

export default {
  name: 'PhoneLocked',
  props: {
    called: {
      type: Boolean,
      default: false
    },
    message: {
      type: Object,
      default() {
        return {
          contact: '',
          message: ''
        }
      }
    }
  },
  data() {
    return {
      PhoneIcon
    }
  },
  methods: {
    recall() {
      this.$emit('onRecall', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './phoneLocked';
</style>
