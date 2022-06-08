<template>
  <div class="cardsContainer">
    <Enigme2MainScreenCard v-for="card in cards" :key="'card' + card.id" :data="card" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'
import { ACTIONS as A } from '@/store/modules/three/helpers'
import { MUTATIONS as M } from '@/store/modules/three/helpers'

import Enigme2MainScreenCard from './Enigme2MainScreenCard.vue'

export default {
  name: 'Enigme2MainScreenPopups',
  components: {
    Enigme2MainScreenCard
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      popups: this.$store.state.three.popups
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  }),
  watch: {
    cards: function () {
      if (this.cards && this.popups.length === 0) {
        for (let card in this.cards) {
          this.$store.dispatch({
            type: A.initPopup,
            content: this.cards[card]
          })
        }
      } else {
        this.cards.filter((e) => {
          if (e.owner === this.typeScreen) {
            this.$store.commit(M.triggerPopup, e.id)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cardsContainer {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
