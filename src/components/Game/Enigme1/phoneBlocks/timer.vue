<template>
  <div class="timer">
    <p class="timer__text">{{ time }}</p>

    <Notification :contact="notification.contact" :message="notification.message" :duration="4500" />
  </div>
</template>

<script>
import Notification from '@/components/block/Notification.vue'
import convertSecondsToTime from '@/helpers/convertSecondToTIme.js'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'Timer',
  components: {
    Notification
  },
  props: {
    initTime: {
      type: Number,
      default: 36
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
      timeout: null,
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
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    updateTime() {
      this.timeout = setTimeout(() => {
        this.$data.timer -= 1
        this.$store.state[S.sounds]?.['tick-2'].play()
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
