<template>
  <div
    :class="{ cardContainer: true, isCurrent: isCurrent }"
    :style="{ '--heightCard': heightCard + 50 + 'px', order: card.order }"
  >
    <div
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
import interact from 'interactjs'
import { mapState } from 'vuex'

import Sound from '@/helpers/Sound'
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
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0
      },
      isAnimating: false,
      heightCard: 200,
      hasDragged: false
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen], // Player1 ; Player2 ; MainScreen
    transformString() {
      const { x, y, rotation } = this.interactPosition
      return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`
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
    },
    owner() {
      return this.card.owner
    }
  }),
  watch: {
    owner() {
      if (this.isAnimating || this.card.owner !== this.typeScreen) return
      this.isAnimating = true

      switch (this.card.incomingDirection) {
        case 'top':
          Anime({
            targets: this.$refs.interactElement,
            translateX: 0,
            translateY: [-this.heightCard, 0],
            rotate: 0,
            easing: 'cubicBezier(.2,0,.25,1)',
            duration: 450,
            begin: () => {
              new Sound('swoosh-2', { volume: 0.2 })
            },
            complete: () => {
              this.resetCardPosition()
              this.isAnimating = false

              // start animation for help
              if (this.card.id === 1 && this.typeScreen === 'Player1') {
                setTimeout(() => {
                  this.initAnimationTuto()
                }, 3000)
              } else if (this.card.id === 2 && this.typeScreen === 'Player2') {
                setTimeout(() => {
                  this.initAnimationTuto()
                }, 3000)
              }
            }
          })
          break
        case LEFT:
          Anime({
            targets: this.$refs.interactElement,
            translateX: [-window.innerWidth, 0],
            translateY: 0,
            rotate: 0,
            easing: 'cubicBezier(.2,0,.25,1)',
            duration: 450,
            begin: () => {
              new Sound('swoosh-2', { volume: 0.2 })
            },
            complete: () => {
              console.log('END anim left')
              this.resetCardPosition()
              this.isAnimating = false
            }
          })
          break
        case RIGHT:
          Anime({
            targets: this.$refs.interactElement,
            translateX: [window.innerWidth, 0],
            translateY: 0,
            rotate: 0,
            easing: 'cubicBezier(.2,0,.25,1)',
            duration: 450,
            begin: () => {
              new Sound('swoosh-2', { volume: 0.2 })
            },
            complete: () => {
              this.resetCardPosition()
              this.isAnimating = false
            }
          })
          break
        default:
          this.resetCardPosition()
          break
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
      startAxis: 'x',
      lockAxis: 'xy',

      onstart: () => {
        this.isInteractAnimating = false
        this.hasDragged = true
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
        const { x } = this.interactPosition
        const { interactXThreshold } = this.$options.static
        this.isInteractAnimating = true

        if (x > interactXThreshold) this.playCard(RIGHT)
        else if (x < -interactXThreshold) this.playCard(LEFT)
        else this.resetCardPosition()
      }
    })
  },

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
        begin: () => {
          new Sound('swoosh-3', { volume: 0.2 })
        },
        complete: () => {
          this.isAnimating = false
          this.resetCardPosition()
        }
      })
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset()
      this.isInteractDragged = true
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 })
    },

    // animartion tuto
    initAnimationTuto() {
      if (this.hasDragged || this.isEndSort) return

      const tl = Anime.timeline({
        targets: this.$refs.interactElement,
        easing: 'easeOutBack',
        duration: 450,
        update: () => {
          if (this.hasDragged) tl.pause()
        }
      })

      tl.add({
        translateX: 35,
        rotate: 7
      })
        .add({
          translateX: 0,
          rotate: 0
        })
        .add({
          translateX: 35,
          rotate: 7
        })
        .add({
          translateX: 0,
          rotate: 0
        })

      tl.finished.then(() => {
        setTimeout(() => this.initAnimationTuto(), 2000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cardContainer {
  flex-shrink: 0;
  max-height: 0;
  transition: max-height 450ms var(--custom-bezier);

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
  pointer-events: none;
  touch-action: pan-y;
  user-select: none;
  background-color: var(--color-whiteDimmed);
  border: black solid 5px;
  border-radius: 30px;
  box-shadow: 6px 6px 0 var(--color-black);
  opacity: 0;
  will-change: transform;

  &.isCurrent {
    pointer-events: initial;
    opacity: 1;
  }

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
  border-bottom: var(--color-black) solid 4px;
}

.enigme2-bar .enigme2-controls {
  width: 10px;
  height: 10px;
  margin-left: 5px;
  border: var(--color-black) solid 3px;
  border-radius: 50%; // Cercle des controls, ne pas appliquer variable radius
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.enigme2-bar .enigme2-controls:first-of-type {
  margin-left: 15px;
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
