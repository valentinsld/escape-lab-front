<template>
  <div class="cardsContainer">
    <!--    <Enigme2MainScreenCard v-for="card in cards" :key="'card' + card.id" :data="card" />-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/modules/three/helpers'
import { ACTIONS as A } from '@/store/modules/three/helpers'
import { GETTERS as G } from '@/store/modules/three/helpers'

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
  sockets: {
    'enigme2-restart': function () {
      this.$store.commit(M.resetPopup)
      this.$socket.emit('enigme2-getPopups')
      console.log(this.popups, 'restart')
    }
  },
  watch: {
    cards: function () {
      console.log(this.popups, 'alors')
      if (this.cards && this.popups.length > 0) {
        this.cards.filter((card) => {
          const index = this.$store.getters[G.getPopupArrayIndex](card.id)
          if (card.owner === this.typeScreen && this.popups[index].isTriggered === false) {
            this.$store.commit(M.triggerPopup, index)
            if (card.id === 4) this.$store.state[S.sounds]?.['simlich-rire'].play()
            this.$store.dispatch({
              type: A.animatePopup,
              id: index
            })
          }
        })
      }
    }
  },
  mounted() {
    this.$store.state[S.sounds]?.['music-enigme-speed-up'].play()
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
