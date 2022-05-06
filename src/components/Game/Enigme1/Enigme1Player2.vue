<template>
  <div>
    <h1>Enigme 1 Player2</h1>
    <PhoneCallIncoming v-if="isFakeCalling" :duration="isFakeCallingDuration" @onEndCall="endFakeCall" />
    <PhoneLocked
      v-else-if="!recalled || callEnd"
      :called="!recalled && isStart && !callEnd"
      :message="messageEnd"
      @onRecall="recall"
    />
    <PhoneCall v-else />
  </div>
</template>

<script>
import PhoneCall from '@/components/block/enigme1/phoneCall.vue'
import PhoneCallIncoming from '@/components/block/enigme1/phoneCallIncoming.vue'
import PhoneLocked from '@/components/block/enigme1/phoneLocked.vue'

const SECOND_CALL = 15000

export default {
  name: 'Enigme1Player2',
  components: {
    PhoneCallIncoming,
    PhoneCall,
    PhoneLocked
  },
  data() {
    return {
      isFakeCalling: true,
      isFakeCallingDuration: 3500,
      isStart: false,
      recalled: false,
      messageEnd: {
        contact: '',
        message: ''
      },
      callEnd: false
    }
  },
  sockets: {
    startEnigme: function () {
      this.start()
      this.$data.isStart = true
    },
    'enigme1-end': function ({ messages }) {
      console.log('enigme1-end', messages)
      this.$data.callEnd = true

      this.$data.messageEnd.contact = messages[0].contact
      this.$data.messageEnd.message = messages[0].messages[0].content
    },
    'enigme1-endNotRecall': function ({ contact, message }) {
      this.$data.messageEnd = { contact, message }
    }
  },
  mounted() {
    this.secondCall()
  },
  methods: {
    start() {
      console.log('START ENIGME')
    },
    endFakeCall() {
      this.$data.isFakeCalling = false
    },
    recall() {
      this.$data.recalled = true
      this.$socket.emit('enigme1-recall')
    },
    secondCall() {
      setTimeout(() => {
        if (this.$data.recall) return

        this.$data.isFakeCallingDuration = 1000
        this.$data.isFakeCalling = true
      }, SECOND_CALL)
    }
  }
}
</script>
