<template>
  <div></div>
</template>

<script>
import { MUTATIONS as M } from '@/store/modules/three/helpers'
export default {
  name: 'Enigme1MainScreen',
  sockets: {
    startEnigme: function () {
      this.start()
    }
  },
  mounted() {
    console.log(this.$store.state.three.camera, 'cam pos')
    this.$store.commit(M.setCamPosition, { x: -0.5, y: 0, z: 1 })
  },
  methods: {
    start() {
      console.log('START ENIGME')
    }
  }
}
</script>
