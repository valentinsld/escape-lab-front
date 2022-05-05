<template>
  <div class="notification" :class="{ '-see': display }" @click="action">
    <p class="notification__contact">{{ contact }}</p>
    <p class="notification__message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    contact: {
      type: String,
      default() {
        return ''
      }
    },
    message: {
      type: String,
      default() {
        return ''
      }
    },
    duration: {
      type: Number,
      default() {
        return 3000
      }
    },
    onClick: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      display: false
    }
  },
  watch: {
    message: function () {
      this.$data.display = true

      setTimeout(() => {
        this.$data.display = false
      }, this.duration)
    }
  },
  methods: {
    action() {
      this.$data.display = false
      this.onClick()
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: red;
  transition: transform 250ms ease-in-out;
  will-change: transform;
  transform: translate3d(0, -100%, 0);

  &.-see {
    transform: translate3d(0, 0, 0);
  }
}
</style>
