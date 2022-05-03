<template>
  <div>
    <h1>Enigme 1 Player2</h1>
    <PhoneCallIncoming v-if="isFakeCalling" @onEndCall="endFakeCall" />
    <PhoneLocked v-else-if="!recalled" :called="!recalled && isStart" :message="messageEnd" @onRecall="recall" />
    <PhoneCall v-else />
  </div>
</template>

<script>
import PhoneCall from '@/components/block/enigme1/phoneCall.vue'
import PhoneCallIncoming from '@/components/block/enigme1/phoneCallIncoming.vue'
import PhoneLocked from '@/components/block/enigme1/phoneLocked.vue'

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
      isStart: false,
      recalled: false,
      messageEnd: ''
    }
  },
  sockets: {
    startEnigme: function () {
      this.start()
      this.$data.isStart = true
    }
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
    }
  }
}
</script>
