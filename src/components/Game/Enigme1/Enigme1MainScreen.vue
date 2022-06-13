<template>
  <div></div>
</template>

<script>
import Sound from '@/helpers/Sound'
import { MUTATIONS as M } from '@/store/helpers'

export default {
  name: 'Enigme1MainScreen',
  sockets: {
    startEnigme: function () {
      this.start()
    }
  },
  mounted() {
    this.$store.commit(M.laboAmbiance, new Sound('labo_ambiance', { volume: 0.2, isLoop: true }))
  },
  methods: {
    start() {
      console.log('START ENIGME')
    }
  }
}
</script>
