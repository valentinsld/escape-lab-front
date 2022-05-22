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
  top: 8px;
  left: 8px;
  z-index: 2;
  box-sizing: border-box;
  width: calc(100% - 16px);
  height: auto;
  padding: 16px 24px;
  text-align: left;
  background-color: var(--color-white);
  border: 3px solid var(--color-black);
  border-radius: 20px;
  transition: transform 250ms ease-in-out;
  // transform: translate3d(0, -100%, 0);
  will-change: transform;

  &.-see {
    transform: translate3d(0, 0, 0);
  }

  p {
    margin: 0;
  }

  &__contact {
    padding-bottom: 0.5em;
    font-size: 1.125em;
    font-weight: var(--weight-semi-bold);
  }
}
</style>
