<template>
  <div class="intro">
    <p>intro</p>
    <Components :is="'Intro' + typeScreen" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import IntroMainScreen from '@/components/Game/Intro/IntroMainScreen.vue'
import IntroPlayer from '@/components/Game/Intro/IntroPlayer.vue'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Intro',
  components: { IntroMainScreen, IntroPlayer1: IntroPlayer, IntroPlayer2: IntroPlayer },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  })
}
</script>

<style lang="scss" scoped></style>
