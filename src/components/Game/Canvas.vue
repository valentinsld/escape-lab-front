<template>
  <div ref="scene" class="scene-container"></div>
</template>

<script>
import { mapActions } from 'vuex'

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
    this.INIT_SCENE({
      width: this.$refs.scene.clientWidth,
      height: this.$refs.scene.clientHeight,
      el: this.$refs.scene
    }).then(() => {
      this.ANIMATE()
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
