/** ALL CARD LOGIC IN POPUP COMPONENT */

<template>
  <div class="card" :class="{ isCurrent: isCurrent }" :style="{ transform: transformString }">
    <h3 class="cardTitle">{{ card.keyword }}</h3>
  </div>
</template>

<script>
import interact from 'interact.js'
export default {
  name: 'Enigme2Popup',
  props: {
    card: {
      type: Object,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      interactPosition: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    transformString() {
      const { x, y } = this.interactPosition
      return `translate3D(${x}px, ${y}px, 0)`
    }
  },
  mounted() {
    const element = this.$refs.interactElement
    interact(element).draggable({
      onmove: (event) => {
        const x = this.interactPosition.x + event.dx
        const y = this.interactPosition.y + event.dy
        this.interactSetPosition({ x, y })
      },
      onend: () => {
        this.resetCardPosition()
      }
    })
  },
  beforeDestroy() {
    interact(this.$refs.interactElement).unset()
  },
  methods: {
    interactSetPosition(coordinates) {
      const { x = 0, y = 0 } = coordinates
      this.interactPosition = { x, y }
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0 })
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 280px;
  color: blue;
  border: blue solid 5px;
  border-radius: 30px;
}
</style>
