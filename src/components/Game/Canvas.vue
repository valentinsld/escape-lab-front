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
    })
    //this.init()
    //this.animate()
  },
  methods: {
    ...mapActions(['INIT_SCENE']),
    animate() {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style lang="scss" scoped>
.scene-container {
  height: 100vh;
}
</style>
