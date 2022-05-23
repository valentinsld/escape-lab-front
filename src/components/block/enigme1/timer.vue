<template>
  <div class="timer">
    <p class="timer__text">{{ time }}</p>

    <Notification :contact="notification.contact" :message="notification.message" :duration="4500" />
  </div>
</template>

<script>
import Notification from '@/components/block/Notification.vue'
import convertSecondsToTime from '@/helpers/convertSecondToTIme.js'

export default {
  name: 'Timer',
  components: {
    Notification
  },
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
      timerStarted: false,
      notification: {
        contact: '',
        message: ''
      }
    }
  },
  computed: {
    time() {
      return convertSecondsToTime(this.timer, true)
    }
  },
  watch: {
    isStart: function () {
      if (this.$data.timerStarted) return
      this.updateTime()
      this.$data.timerStarted = true
    }
  },
  sockets: {
    'enigme1-endNotRecall': function ({ contact, message }) {
      this.$data.notification = { contact, message }
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

<style lang="scss" scoped>
@import 'timer.scss';
</style>
