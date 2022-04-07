<template>
  <div class="messages">
    <p
      v-for="(item, index) in messages"
      ref="messages"
      :key="index"
      class="message"
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
    messages: function (newVal) {
      console.log(this.$props.messages, newVal, 'haaa')
      this.msgAnimation()
    }
  },
  methods: {
    getLastMsgIndex() {
      console.log(this.messages.map().lastIndexOf(true), 'ça passe ?')
      return this.messages.map().lastIndexOf(true)
    },
    msgAnimation() {
      const tl = Anime.timeline({
        autoplay: false,
        easing: 'easeInExpo'
      })
      tl.add({
        targets: this.$refs?.messages[0],
        opacity: [0, 1],
        duration: 2000,
        delay: 50
      })
      tl.restart()
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

  &[is-received='true'] {
    margin-right: auto;
    margin-left: 0;
  }
}
</style>
