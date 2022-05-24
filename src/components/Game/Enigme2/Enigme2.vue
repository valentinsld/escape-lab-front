<template>
  <div class="enigme-2">
    <Components :is="'Enigme2' + typeScreen" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme2MainScreen from '@/components/Game/Enigme2/Enigme2MainScreen.vue'
import Enigme2Player from '@/components/Game/Enigme2/Enigme2Player.vue'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme2',
  components: { Enigme2MainScreen, Enigme2Player1: Enigme2Player, Enigme2Player2: Enigme2Player },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  }),
  mounted() {
    this.$socket.emit('readyEnigme')
  }
}
</script>

<style lang="scss" scoped>
.enigme-2 {
  width: 100%;
}
</style>
