<template>
  <div class="messages">
    <p
      v-for="(item, index) in messages"
      ref="messages"
      :key="index"
      class="message"
      :is-reveal="item.isReveal"
      :is-received="item.isReceived"
      v-html="item.content"
    />
  </div>
</template>

<script>
import Anime from 'animejs'
export default {
  name: 'Messages',
  props: {
    messages: {
      type: Array,
      default: null
    }
  },
  watch: {
    messages: function () {
      this.$nextTick(() => {
        this.msgAnimation()
      })
    }
  },
  methods: {
    getFirstMsgIndex() {
      return this.$props.messages.map((obj) => obj.isReveal === false).indexOf(true)
    },
    restart() {
      if (this.getFirstMsgIndex() > 0) this.msgAnimation()
    },
    msgAnimation() {
      const tl = Anime.timeline({
        easing: 'easeInExpo',
        complete: () => {
          this.restart()
        }
      })
      tl.add({
        targets: this.$refs?.messages[this.getFirstMsgIndex()],
        opacity: [0, 1],
        duration: 250,
        delay: 50,
        complete: () => {
          this.$props.messages[this.getFirstMsgIndex()] = {
            ...this.$props.messages[this.getFirstMsgIndex()],
            isReveal: true
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.messages {
  display: flex;
  flex-direction: column;
}

.message {
  margin-left: auto;
  opacity: 0;

  &[is-received='true'] {
    margin-right: auto;
    margin-left: 0;
  }

  &[is-reveal='true'] {
    opacity: 1;
  }
}
</style>
