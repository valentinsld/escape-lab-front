/* eslint-disable unused-imports/no-unused-vars */
<template>
  <div class="main enigme2">
    <Enigme2Restart v-if="showFailure" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme2Restart from '@/components/Game/Enigme2/restart/Enigme2MainScreenRestart.vue'
import { STATE as S } from '@/store/helpers'
import { ACTIONS as A, GETTERS as G, MUTATIONS as M } from '@/store/modules/three/helpers'

export default {
  name: 'Enigme2MainScreen',
  components: {
    Enigme2Restart
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      showFailure: false,
      popups: this.$store.state.three.popups
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  }),
  watch: {
    cards: function () {
      if (this.cards && this.popups.length === 0) {
        this.initThreePopups()
      }
      if (this.popups.length > 0) {
        this.animThreePopups()
      }
    }
  },
  mounted() {
    this.$socket.emit('enigme2-sendPopups')
    this.$store.state[S.sounds]?.['music-enigme-speed-up'].play()
  },
  sockets: {
    'enigme2-endSort': function ({ success }) {
      setTimeout(() => {
        this.showFailure = !success
        this.$store.state[S.sounds]?.['music-enigme-speed-up'].stop()
      }, 800)
    },
    'enigme2-restart': function () {
      this.$store.commit(M.resetPopup)
    }
  },
  methods: {
    initThreePopups() {
      for (let card in this.cards) {
        this.$store.dispatch({
          type: A.initPopup,
          content: this.cards[card]
        })
      }
    },
    animThreePopups() {
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
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
