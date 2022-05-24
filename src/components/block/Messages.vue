<template>
  <div class="messages">
    <div
      v-for="(item, index) in messages"
      ref="messages"
      :key="index"
      class="message"
      :is-reveal="isAnim ? item.isReveal : true"
      :is-received="item.isReceived"
    >
      <div v-if="typeof item.content === 'object'" class="message__payment">
        <img v-if="item.content.image" :src="getSource(item.content.image)" />
        <p v-if="item.content.url" class="message__payment__link" v-html="item.content.url" />
        <p v-if="item.content.text" v-html="item.content.text" />
      </div>
      <p v-else v-html="item.content" />
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'

import CanapDeLuxe from '@/assets/CANAPDELUXE.png'

export default {
  name: 'Messages',
  props: {
    messages: {
      type: Array,
      default: null
    },
    isAnim: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Object,
      default: () => ({ default: 400, firstMsg: 50 })
    },
    duration: {
      type: Object,
      default: () => ({ default: 300, firstMsg: null })
    }
  },
  data() {
    return {
      CanapDeLuxe,
      animLogComplete: 0
    }
  },
  watch: {
    messages: function () {
      this.$nextTick(() => {
        console.log(this.messages, 'messages')
        this.msgAnimation()
      })
    }
  },
  methods: {
    getFirstMsgIndex() {
      return this.$props.messages.map((obj) => obj.isReveal === false).indexOf(true)
    },
    checkEnd() {
      if (this.getFirstMsgIndex() > 0) {
        this.msgAnimation()
      } else {
        this.animLogComplete = 0
        this.$emit('onanimation:iscomplete', true)
      }
    },
    msgAnimation() {
      const tl = Anime.timeline({
        easing: 'easeInExpo',
        complete: () => {
          this.animLogComplete++
          this.checkEnd()
        }
      })
      tl.add({
        targets: this.$refs?.messages[this.getFirstMsgIndex()],
        opacity: [0, 1],
        duration: this.duration.firstMsg && this.animLogComplete === 0 ? this.duration.firstMsg : this.duration.default,
        delay: this.delay.firstMsg && this.animLogComplete === 0 ? this.delay.firstMsg : this.delay.default,
        complete: () => {
          this.$props.messages[this.getFirstMsgIndex()] = {
            ...this.$props.messages[this.getFirstMsgIndex()],
            isReveal: true
          }
        }
      })
    },
    getSource(name) {
      return require(`@/assets/images/enigme3/messages/${name}.png`)
    }
  }
}
</script>

<style lang="scss" scoped>
.messages {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  //height: 100%;
  padding: 45px 8px 24px;
  overflow-y: auto;
}

.message {
  position: relative;
  z-index: 2;
  max-width: 75%;
  padding: 8px;
  // margin-top: -2.2em;
  margin-bottom: 2em;
  margin-left: auto;
  font-size: 0.9em;
  line-height: 1.6;
  text-align: right;
  background-color: var(--color-whiteDimmed);
  border: 3px solid var(--color-black);
  border-radius: 10px;
  opacity: 0;

  &[is-reveal='true'] {
    opacity: 1;
  }

  p {
    margin: 0;
  }

  img {
    width: 100%;
  }

  //
  // triangle
  //
  &::after {
    position: absolute;
    right: 16px;
    bottom: -16px;
    z-index: 2;
    width: 0;
    height: 0;
    content: '';
    border-top: 6px solid var(--color-whiteDimmed);
    border-right: 12px solid var(--color-whiteDimmed);
    border-bottom: 10px solid transparent;
    border-left: 6px solid transparent;
  }

  &::before {
    position: absolute;
    right: 12px;
    bottom: -24px;
    z-index: 1;
    width: 0;
    height: 0;
    content: '';
    border-top: 9px solid var(--color-black);
    border-right: 18px solid var(--color-black);
    border-bottom: 15px solid transparent;
    border-left: 9px solid transparent;
  }

  &[is-received='true'] {
    margin-right: auto;
    margin-left: 0;
    text-align: left;

    &::after {
      right: inherit;
      left: 16px;
      border-right: 6px solid transparent;
      border-left: 12px solid var(--color-whiteDimmed);
    }

    &::before {
      right: inherit;
      left: 12px;
      border-right: 9px solid transparent;
      border-left: 18px solid var(--color-black);
    }
  }
}

.message__payment {
  img {
    width: 90px;
  }
}

.message__payment__link {
  margin-top: 0;
  font-size: 12px;
  text-decoration: underline;
}
</style>
