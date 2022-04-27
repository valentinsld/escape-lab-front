<template>
  <div ref="scene" class="scene-container"></div>
</template>

<script>
import { ACTIONS as A } from '@/store/modules/three/helpers'

export default {
  name: 'Canvas',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  mounted() {
    this.$store
      .dispatch({
        type: A.initScene,
        width: this.$refs.scene.clientWidth,
        height: this.$refs.scene.clientHeight,
        el: this.$refs.scene
      })
      .then(() => {
        this.$store.dispatch(A.animate)
      })
  }
}
</script>

<style lang="scss" scoped>
.scene-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
</style>
