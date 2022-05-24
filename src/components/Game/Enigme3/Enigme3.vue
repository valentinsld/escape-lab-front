<template>
  <div v-if="config" class="enigme-3">
    <div v-if="isStart" class="enigme-3__game">
      <Enigme3MainScreen v-if="typeScreen === 'MainScreen'" :product="config.product" :true-rules="config.trueRules" />
      <Enigme3Player1
        v-if="typeScreen === 'Player1'"
        :true-rules="config.trueRules"
        :seller-type="config.sellerType"
        :product="config.product"
        :questions-to-display="config.settings.questionsToDisplay"
      />
      <Enigme3Player2 v-if="typeScreen === 'Player2'" />
    </div>
    <div v-else class="enigme-3__tuto">
      <Enigme3MainScreenTuto v-if="typeScreen === 'MainScreen'" />
      <Enigme3Player2Tuto v-if="typeScreen === 'Player2'" />
      <Enigme3player1Tuto v-if="typeScreen === 'Player1'" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme3MainScreen from '@/components/Game/Enigme3/Enigme3MainScreen.vue'
import Enigme3Player1 from '@/components/Game/Enigme3/Enigme3Player1.vue'
import Enigme3Player2 from '@/components/Game/Enigme3/Enigme3Player2.vue'
import Enigme3MainScreenTuto from '@/components/Game/Enigme3/tuto/Enigme3MainScreenTuto'
import Enigme3player1Tuto from '@/components/Game/Enigme3/tuto/Enigme3Player1Tuto'
import Enigme3Player2Tuto from '@/components/Game/Enigme3/tuto/Enigme3Player2Tuto'
import { MUTATIONS as M, STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme3',
  components: {
    Enigme3player1Tuto,
    Enigme3Player2Tuto,
    Enigme3MainScreenTuto,
    Enigme3MainScreen,
    Enigme3Player1,
    Enigme3Player2
  },
  data() {
    return {
      trueRules: null,
      isStart: true
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen],
    config: (state) => state[S.enigme3Config]
  }),
  watch: {
    config: function (newVal) {
      console.groupCollapsed()
      console.log('true rules enigme 3 : ', newVal.trueRules)
      console.log('seller type : ', newVal.sellerType)
      console.groupEnd()
    }
  },
  mounted() {
    this.$socket.emit('readyEnigme')

    //if main screen get config rules from back
    if (this.typeScreen === 'MainScreen') {
      this.$socket.emit('sendEnigme3Config')
    }
    this.sockets.subscribe('sendEnigme3Config', (config) => {
      this.$store.commit(M.enigme3Config, config)
    })
  }
}
</script>

<style lang="scss" scoped>
.enigme-3 {
  width: 100%;
  height: 100%;
}

.enigme-3__tuto {
  height: 100%;
}

.enigme-3__game {
  height: 100%;
}
</style>
