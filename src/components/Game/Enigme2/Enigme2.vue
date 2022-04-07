<template>
  <div class="enigme-1">
    <p>Enigme 2</p>
    <Components :is="'Enigme2' + typeScreen" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme2MainScreen from '@/components/Game/Enigme2/Enigme2MainScreen.vue'
import Enigme2Player1 from '@/components/Game/Enigme2/Enigme2Player1.vue'
import Enigme2Player2 from '@/components/Game/Enigme2/Enigme2Player2.vue'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme2',
  components: { Enigme2MainScreen, Enigme2Player1, Enigme2Player2 },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  })
}
</script>

<style lang="scss" scoped></style>
