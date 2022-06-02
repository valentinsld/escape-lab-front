<template>
  <div class="outroContainer">
    <Components :is="'Outro' + typeScreen" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import OutroMainScreen from '@/components/Game/Outro/OutroMainScreen.vue'
import OutroPlayer from '@/components/Game/Outro/OutroPlayer.vue'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Outro',
  components: { OutroMainScreen, OutroPlayer1: OutroPlayer, OutroPlayer2: OutroPlayer },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  })
}
</script>

<style lang="scss" scoped>
.outroContainer {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
