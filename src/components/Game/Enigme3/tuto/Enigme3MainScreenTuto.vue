<template>
  <div class="tuto" :style="`--scale: ${scale}`">
    <h2>Consigne</h2>
    <h3 v-html="textContent.consigne.mainScreen" />
  </div>
</template>

<script>
import { textContent } from '@/data/enigme3'

export default {
  name: 'Enigme3MainScreenTuto',
  data() {
    return {
      textContent: textContent,
      scale: 1
    }
  },
  mounted() {
    this.initScale()
  },
  methods: {
    initScale() {
      this.scale = Math.max(window.innerWidth / 1920, window.innerHeight / 1080) * 0.8

      window.addEventListener('resize', () => {
        this.scale = Math.max(window.innerWidth / 1920, window.innerHeight / 1080) * 0.8
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tuto {
  position: absolute;
  top: 45.8vh;
  left: 49.1%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 986px;
  height: 560px;
  padding: 2.2em 5em;
  overflow: hidden;
  background: var(--color-white);
  border: 5px solid var(--color-black);
  border-radius: 160px;
  transition: opacity 400ms var(--custom-bezier);
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%) scale(var(--scale, 1));

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: '';
    background-color: #b5a79e;
    opacity: 0.25;
  }

  h2 {
    font-size: 3em;
    text-align: center;
  }

  h3 {
    font-size: 1.7em;
    line-height: 2em;
    text-align: center;
  }
}
</style>
