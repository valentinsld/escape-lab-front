<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }"
    class="card"
    :style="{ transform: transformString }"
  >
    <h3>{{ card.text }}</h3>
  </div>
</template>

<script>
import interact from 'interact.js'
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'

const RIGHT = 'right'
const LEFT = 'left'
const BOTTOM = 'bottom'

export default {
  name: 'Enigme2Popup',
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100
  },

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
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0
      }
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen], // Player1 ; Player2 ; MainScreen
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`
      }

      return null
    }
  }),
  watch: {
    card() {
      console.log(this.card)
      if (this.card.owner === this.typeScreen) {
        this.resetCardPosition()
      }
    }
  },

  mounted() {
    const element = this.$refs.interactElement

    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false
      },

      onmove: (event) => {
        const { interactMaxRotation, interactXThreshold } = this.$options.static
        const x = this.interactPosition.x + event.dx
        const y = this.interactPosition.y + event.dy

        let rotation = interactMaxRotation * (x / interactXThreshold)

        if (rotation > interactMaxRotation) rotation = interactMaxRotation
        else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation

        this.interactSetPosition({ x, y, rotation })
      },

      onend: () => {
        const { x, y } = this.interactPosition
        const { interactXThreshold, interactYThreshold } = this.$options.static
        this.isInteractAnimating = true

        if (x > interactXThreshold) this.playCard(RIGHT)
        else if (x < -interactXThreshold) this.playCard(LEFT)
        else if (y > interactYThreshold) this.playCard(BOTTOM)
        else this.resetCardPosition()
      }
    })
  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset()
  },

  methods: {
    playCard(interaction) {
      const { interactOutOfSightXCoordinate, interactOutOfSightYCoordinate, interactMaxRotation } = this.$options.static

      this.interactUnsetElement()

      switch (interaction) {
        case RIGHT:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation
          })

          this.$emit(RIGHT)
          break
        case LEFT:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation
          })
          this.$emit(LEFT)
          break
        case BOTTOM:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate
          })
          this.$emit(BOTTOM)
          break
      }

      this.$socket.emit('enigme2-popupOwnerChanged', {
        id: this.card.id,
        direction: interaction
      })
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates
      this.interactPosition = { x, y, rotation }
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset()
      this.isInteractDragged = true
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 })
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
  background-color: azure;
  border: blue solid 5px;
  border-radius: 30px;
}

.card:not(.isCurrent) {
  display: none;
}

.isAnimating {
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
