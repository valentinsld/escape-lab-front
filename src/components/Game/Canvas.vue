<template>
  <div ref="scene" class="scene-container"></div>
</template>

<script>
import { mapActions } from 'vuex'

import { ACTIONS as A } from '@/store/helpers'

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
      // .INIT_SCENE({
      //   width: this.$refs.scene.clientWidth,
      //   height: this.$refs.scene.clientHeight,
      //   el: this.$refs.scene
      // })
      .then(() => {
        this.$store.dispatch(A.animate)
      })
  },
  methods: {
    ...mapActions(['INIT_SCENE', 'ANIMATE'])
  }
}
</script>

<style lang="scss" scoped>
.scene-container {
  height: 100vh;
}
</style>
