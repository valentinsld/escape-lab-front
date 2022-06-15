<template>
  <div class="enigme-2">
    <Components :is="'Enigme2' + typeScreen" v-if="isStart" :key="componentKey" :cards="cards" />
    <Components :is="'Enigme2' + typeScreen + 'Tuto'" v-if="!isStart" :key="componentKey" />
    <!--    <Components :is="'Enigme2' + typeScreen" v-if="!isStart" :key="componentKey" />-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme2MainScreen from '@/components/Game/Enigme2/Enigme2MainScreen.vue'
import Enigme2Player from '@/components/Game/Enigme2/Enigme2Player.vue'
import Enigme2MainScreenTuto from '@/components/Game/Enigme2/tuto/Enigme2MainScreenTuto'
import Enigme2Player1Tuto from '@/components/Game/Enigme2/tuto/Enigme2Player1Tuto'
import Enigme2Player2Tuto from '@/components/Game/Enigme2/tuto/Enigme2Player2Tuto'
import { STATE as S } from '@/store/helpers'
import { ACTIONS as A } from '@/store/modules/three/helpers'
export default {
  name: 'Enigme2',
  components: {
    Enigme2MainScreen,
    Enigme2Player1: Enigme2Player,
    Enigme2Player2: Enigme2Player,
    Enigme2Player1Tuto,
    Enigme2Player2Tuto,
    Enigme2MainScreenTuto
  },
  data() {
    return {
      isStart: false,
      cards: [],
      componentKey: 0,
      popups: this.$store.state.three.popups
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  }),
  watch: {
    cards: function () {
      console.log('pas normal', this.popups.length)
      if (this.cards && this.popups.length === 0 && this.typeScreen === 'MainScreen') {
        for (let card in this.cards) {
          this.$store.dispatch({
            type: A.initPopup,
            content: this.cards[card]
          })
        }
      }
    }
  },
  mounted() {
    this.$socket.emit('enigme2-getPopups')
  },
  methods: {
    getPopupsData(data) {
      this.cards = data
    }
  },
  sockets: {
    startEnigme: function () {
      this.isStart = true
    },
    'enigme2-getPopups': function (props) {
      if (this.typeScreen === 'MainScreen') {
        this.getPopupsData(props)
      }
    },
    'enigme2-sendPopups': function (props) {
      if (this.typeScreen === 'MainScreen') {
        this.getPopupsData(props)
      }
    },
    'enigme2-restart': function () {
      this.componentKey += 1
    }
  }
}
</script>

<style lang="scss" scoped>
.enigme-2 {
  width: 100%;
}
</style>
