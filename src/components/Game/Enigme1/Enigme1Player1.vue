<template>
  <div class="screenContainer -enigme1">
    <Timer v-if="!recalled" :is-start="isStart" @onTimeChange:end="endTime" />
    <PhoneMessage v-else :data="dataMessages" />
  </div>
</template>

<script>
import PhoneMessage from './phoneBlocks/phoneMessages.vue'
import Timer from './phoneBlocks/timer.vue'

export default {
  name: 'Enigme1Player1',
  components: {
    Timer,
    PhoneMessage
  },
  data() {
    return {
      isStart: false,
      recalled: false,
      dataMessages: []
    }
  },
  sockets: {
    startEnigme: function () {
      this.start()
    },
    'enigme1-recall': function () {
      this.$data.recalled = true
    },
    'enigme1-action': function (data) {
      if (data.messages.messages.length > 0) this.$data.dataMessages = [data.messages]
    },
    'enigme1-end': function ({ messages }) {
      this.$data.dataMessages = messages
    },
    'enigme1-restart': function () {
      this.$data.isStart = false
      this.$data.recalled = false
      this.$data.dataMessages = []

      this.$socket.emit('readyTutoEnigme')
    }
  },
  methods: {
    start() {
      this.$data.isStart = true
    },

    // updateTime(time) {
    //   console.log('updateTime', time)
    // },
    endTime() {
      this.$socket.emit('enigme1-endNotRecall')
    }
  }
}
</script>
