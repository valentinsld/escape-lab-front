<template>
  <div
    :class="{ cardContainer: true, isCurrent: isCurrent }"
    :style="{ '--heightCard': heightCard + 50 + 'px', order: card.order }"
  >
    <div
      v-if="isShowing"
      ref="interactElement"
      :class="{
        card: true,
        isAnimating: isInteractAnimating,
        isCurrent: isCurrent || isAnimating,
        '-isWrong': isWrong,
        '-isRight': isRight
      }"
      :style="{ transform: transformString }"
    >
      <div class="enigme2-bar">
        <div class="enigme2-controls"></div>
        <div class="enigme2-controls"></div>
      </div>
      <ul class="card-content">
        <li>
          <strong>De : </strong>
          <span>{{ card.from }}</span>
        </li>
        <li>
          <strong>Objet : </strong>
          <span>{{ card.subject }}</span>
        </li>
        <li class="text">
          {{ card.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'
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
    },
    isEndSort: {
      type: Boolean,
      required: true
    },
    isFirstPlayer: {
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
      },
      isAnimating: false,
      heightCard: 200
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
    },
    isRight() {
      const player1 = this.isFirstPlayer && this.card.isSpam
      const player2 = !this.isFirstPlayer && !this.card.isSpam

      return this.isEndSort && (this.isFirstPlayer ? player1 : player2)
    },
    isWrong() {
      const player1 = this.isFirstPlayer && this.card.isSpam
      const player2 = !this.isFirstPlayer && !this.card.isSpam

      return this.isEndSort && !(this.isFirstPlayer ? player1 : player2)
    }
  }),
  watch: {
    card() {
      // console.log(this.card)
      if (this.card.owner === this.typeScreen) {
        this.resetCardPosition()
      }
    },
    isEndSort() {
      if (this.isEndSort) {
        this.interactUnsetElement()
      }
    }
  },

  mounted() {
    this.initHeightCard()

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

  //   beforeDestroy() {
  //     interact(this.$refs.interactElement).unset()
  //   },

  methods: {
    initHeightCard() {
      this.heightCard = this.$refs.interactElement.clientHeight
    },
    playCard(interaction) {
      const { interactOutOfSightXCoordinate, interactOutOfSightYCoordinate, interactMaxRotation } = this.$options.static

      // this.interactUnsetElement()

      switch (interaction) {
        case RIGHT:
          this.interactPositionAnimation({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation
          })

          this.$emit(RIGHT)
          break
        case LEFT:
          this.interactPositionAnimation({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation
          })
          this.$emit(LEFT)
          break
        case BOTTOM:
          this.interactPositionAnimation({
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
    interactPositionAnimation(coordinates) {
      // const { x = 0, y = 0, rotation = 0 } = coordinates
      const x = coordinates.x || this.interactPosition.x
      const y = coordinates.y || this.interactPosition.y
      const rotation = coordinates.rotation || this.interactPosition.rotation

      this.isAnimating = true

      Anime({
        targets: this.$refs.interactElement,
        translateX: x,
        translateY: y,
        rotate: rotation,
        easing: 'cubicBezier(.2,0,.25,1)',
        duration: 250,
        complete: () => {
          this.interactPosition = { x, y, rotation }
          this.isAnimating = false
        }
      })
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

<style lang="scss" scoped>
.cardContainer {
  flex-shrink: 0;
  max-height: 0;
  transition: all 250ms var(--custom-bezier);

  &.isCurrent {
    max-height: var(--heightCard);
  }
}

.card {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  height: auto;
  min-height: 200px;
  margin-bottom: 20px;
  color: black;
  background-color: var(--color-whiteDimmed);
  border: black solid 5px;
  border-radius: 30px;
  box-shadow: 6px 6px 0 var(--color-black);

  &.-isWrong {
    background-color: var(--color-red);
  }

  &.-isRight {
    background-color: var(--color-green);
  }
}

.card ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0;
  // max-height: 80%;
  margin: 40px 20px 20px;
  list-style: none;
}

.card-content {
  width: auto;
  height: auto;
  // border: magenta solid 2px;
  margin: 0 10px;
}

.card-content span,
.card-content li.text {
  font-weight: 200;
}

.card-content li {
  justify-content: flex-start;
  // margin-left: 0;
  padding-left: 0;
  margin: 10px 0;
  text-align: left;
}

.card .enigme2-bar {
  position: absolute;
  top: 5px;
  display: flex;
  width: 100%;
  padding: 4px;
  background-color: transparent;
  border-bottom: black solid 4px;
}

.enigme2-bar .enigme2-controls {
  width: 10px;
  height: 10px;
  margin-left: 5px;
  border: black solid 3px;
  border-radius: 50%;
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.enigme2-bar .enigme2-controls:first-of-type {
  margin-left: 15px;
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:not(.isCurrent) {
  opacity: 0;
}

.isAnimating {
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
