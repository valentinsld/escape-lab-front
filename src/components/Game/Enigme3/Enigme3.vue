<template>
  <div v-if="config" class="enigme-3">
    <div v-if="isStart" class="enigme-3__game">
      <Enigme3MainScreen v-if="typeScreen === 'MainScreen'" :product="config.product" :true-rules="config.trueRules" />
      <Enigme3Player1
        v-if="typeScreen === 'Player1'"
        :true-rules="config.trueRules"
        :product="config.product"
        :questions-to-display="config.settings.questionsToDisplay"
      />
      <Enigme3Player2 v-if="typeScreen === 'Player2'" :true-rules="config.trueRules" />
    </div>
    <div v-else class="enigme-3__tuto">
      <Enigme3MainScreenTuto v-if="typeScreen === 'MainScreen'" />
      <PlayerTuto
        v-if="typeScreen === 'Player1'"
        :text="textContent.consigne.chat"
        color-background="enigme3"
        :gif="gif_player1"
      />
      <PlayerTuto
        v-if="typeScreen === 'Player2'"
        :text="textContent.consigne.notice"
        color-background="enigme3"
        :gif="gif_player2"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import gif_player2 from '@/assets/Intro_3_1.gif'
import gif_player1 from '@/assets/Intro_3_2.gif'
import PlayerTuto from '@/components/block/PlayerTuto'
import Enigme3MainScreen from '@/components/Game/Enigme3/Enigme3MainScreen.vue'
import Enigme3Player1 from '@/components/Game/Enigme3/Enigme3Player1.vue'
import Enigme3Player2 from '@/components/Game/Enigme3/Enigme3Player2.vue'
import Enigme3MainScreenTuto from '@/components/Game/Enigme3/tuto/Enigme3MainScreenTuto'
import { textContent } from '@/data/enigme3'
import { MUTATIONS as M, STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme3',
  components: {
    PlayerTuto,
    Enigme3MainScreenTuto,
    Enigme3MainScreen,
    Enigme3Player1,
    Enigme3Player2
  },
  data() {
    return {
      trueRules: null,
      isStart: false,
      textContent: textContent,

      // gif
      gif_player1,
      gif_player2
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
  sockets: {
    startEnigme: function () {
      this.isStart = true
    },
    'enigme3-config': function (config) {
      this.$store.commit(M.enigme3Config, config)
    },
    'enigme3-restart': function (config) {
      this.$forceUpdate()
      this.$store.commit(M.enigme3Config, config)
    }
  },
  mounted() {
    //if main screen get config rules from back
    if (this.typeScreen === 'MainScreen') {
      this.$socket.emit('enigme3-config')
    }
  }
}
</script>

<style lang="scss" scoped>
.enigme-3 {
  width: 100%;
  height: 100%;
  text-align: left;
}

.enigme-3__tuto {
  height: 100%;
}

.enigme-3__game {
  display: flex;
  height: 100%;
}
</style>
