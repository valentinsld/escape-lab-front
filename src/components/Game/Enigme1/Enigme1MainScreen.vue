<template>
  <div></div>
</template>

<script>
import { MUTATIONS as M } from '@/store/helpers'

export default {
  name: 'Enigme1MainScreen',
  sockets: {
    startEnigme: function () {
      this.start()
    }
  },
  mounted() {
    console.log('mounted')
    this.$store.commit(M.startLaboAmbiance)
  },
  methods: {
    start() {
      console.log('START ENIGME')
    }
  }
}
</script>
