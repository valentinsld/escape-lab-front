/** ALL CARD LOGIC IN POPUP COMPONENT */

<template>
  <!-- TODO pour anims isAnimating: isInteractAnimating dans {} css classes -->
  <div ref="interactElement" class="card" :class="{ isCurrent: isCurrent }" :style="{ transform: transformString }">
    <!-- On applique le transform css renvoyé au composant -->
    <h3 class="cardTitle">{{ card.text }}</h3>
  </div>
</template>

<script>
import interact from 'interact.js'
const RIGHT_DIRECTION = 'cardAccepted'
const LEFT_DIRECTION = 'cardRejected'
const BOTTOM_DIRECTION = 'cardSkipped'

export default {
  name: 'Enigme2PopupOld',
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
  static: {
    // accessible via this.$options.static.interactYThreshold/interactXTreshold
    interactYTreshold: 150,
    interactXTreshold: 100
  },
  data() {
    return {
      // isInteractAnimating: true, // rend possible de desactiver/activer animations
      // Valeurs indiquent l'ordre de la popup dans la "stack" quand elle est déplacée de sa position initiale
      interactPosition: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    // fonction qui créer une valeur pour un transform (en css) qui s'applique à la popup
    transformString() {
      const { x, y } = this.interactPosition
      return `translate3D(${x}px, ${y}px, 0)`
      // if (!this.isInteractAnimating) {
      //   const { x, y } = this.interactPosition
      //   return `translate3D(${x}px, ${y}px, 0)`
      // }
      // return null // sécurité, on ne renvoit une chaine que si on déplace la popup
    }
  },
  mounted() {
    // Bloc rendant la popup "draggable"
    const element = this.$refs.interactElement
    interact(element).draggable(
      // {
      //   onstart: () => {
      //     this.isInteractAnimating = false //on desactive les animations pendant le drag
      //   }
      // },
      {
        // permet d'appeler une fonction à chaque fois que la popup est dragged (onmove)
        onmove: (event) => {
          // renvoi un évenement qui contient la distance la distance de la popup de sa position initiale
          const x = this.interactPosition.x + event.dx
          const y = this.interactPosition.y + event.dy // à chaque fois que l'utilisateur déplace la popup, on calcule sa nouvelle position et ...
          this.interactSetPosition({ x, y }) // ... on la passe à la propriété interactPosition (ligne 26), on déclenche alors la fonction transformString ligne 34 qui met à jour le transform de la popup
        },
        onend: () => {
          // Interact.js hook qui permet d'écouter quand l'utilisateur relache la souris et termine le drag, NOW: on reset la position de la carte à sa position initale
          // TODO: Voir direction et envoyer au bon endroit
          // this.isInteractAnimating = true // on réactive les animations quand utilisateur relace popup
          // verifier si un des seuils est dépassé et appeler la méthode appropriée
          const { x, y } = this.interactPosition
          const { interactXThreshold, interactYThreshold } = this.$options.static
          // this.isInteractAnimating = true;
          if (x > interactXThreshold) this.playCard(RIGHT_DIRECTION)
          else if (x < -interactXThreshold) this.playCard(LEFT_DIRECTION)
          else if (y > interactYThreshold) this.playCard(BOTTOM_DIRECTION)
          // si popup ne dépasse aucun seuil, on reset la position (TODO: échanger z-index...) note à moi même : en parler avec les autres car trop bizarre cette interaction, pas logique
          else this.resetCardPosition()
        }
      }
    )
  },
  /**
   *
   * We also need to make sure to remove the card element from the Interactable object before it gets destroyed. We do that in the beforeDestroy lifecycle hook by using interact(target).unset(). That removes all event listeners and makes interact.js completely forget about the target.
   */
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
    },
    playCard(interaction) {
      const { interactOutOfSightXCoordinate, interactOutOfSightYCoordinate } = this.$options.static

      this.interactUnsetElement()

      switch (interaction) {
        case RIGHT_DIRECTION:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate
          })
          this.$emit(RIGHT_DIRECTION)
          break
        case LEFT_DIRECTION:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate
          })
          this.$emit(LEFT_DIRECTION)
          break
        case BOTTOM_DIRECTION:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate
          })
          this.$emit(BOTTOM_DIRECTION)
          break
      }

      this.hideCard()
    },

    hideCard() {
      setTimeout(() => {
        this.isShowing = false
        this.$emit('hideCard', this.card)
      }, 300)
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset()
      this.interactDragged = true
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
</style>
