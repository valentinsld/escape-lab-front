<template>
  <div class="enigme-2">
    <Components :is="'Enigme2' + typeScreen" v-if="isStart" :key="componentKey" />
    <Components :is="'Enigme2' + typeScreen + 'Tuto'" v-if="!isStart" :key="componentKey" />
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
      componentKey: 0
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  }),
  sockets: {
    startEnigme: function () {
      this.isStart = true
    },
    'enigme2-restart': function () {
      console.log('restart')
      this.componentKey += 1
    }
  },
  mounted() {
    //this.$socket.emit('readyEnigme')
  }
}
</script>

<style lang="scss" scoped>
.enigme-2 {
  width: 100%;
}
</style>
