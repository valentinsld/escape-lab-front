<template>
  <div class="messages">
    <!--    <p
      v-for="(item, index) in messages"
      ref="messages"
      :key="index"
      class="message"
      :is-reveal="item.isReveal"
      :is-received="item.isReceived"
      v-html="item.content"
    />-->
    <div
      v-for="(item, index) in messages"
      ref="messages"
      :key="index"
      class="message"
      :is-reveal="item.isReveal"
      :is-received="item.isReceived"
    >
      <div v-if="typeof item.content === 'object'" class="message__payment">
        <p>Voici le lien du paiement :</p>
        <img v-if="item.content.image" :src="getSource(item.content.image)" />
        <p v-if="item.content.url" class="message__payment__link" v-html="item.content.url" />
      </div>
      <p v-else v-html="item.content" />
    </div>
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
      return require(`@/assets/images/enigme3/payments/${name}.png`)
    }
  }
}
</script>

<style lang="scss" scoped>
.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message {
  max-width: 65%;
  padding: 0 1em;
  margin: 20px 0 20px 20px;
  color: #2b2b2b;
  text-align: right;
  background: #f5f5f5;
  border: 3px solid var(--color-black);
  border-radius: 10px;
  opacity: 0;

  &[is-received='true'] {
    margin-right: auto;
    margin-left: 0;
    text-align: left;
  }

  &[is-reveal='true'] {
    opacity: 1;
  }
}

.message__payment {
  img {
    width: 60px;
  }
}

.message__payment__link {
  margin-top: 0;
  text-decoration: underline;
}
</style>
