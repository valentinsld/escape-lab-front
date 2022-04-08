<template>
  <div class="enigme-1">
    <p>Enigme 1</p>
    <Components :is="'Enigme1' + typeScreen" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme1MainScreen from '@/components/Game/Enigme1/Enigme1MainScreen.vue'
import Enigme1Player1 from '@/components/Game/Enigme1/Enigme1Player1.vue'
import Enigme1Player2 from '@/components/Game/Enigme1/Enigme1Player2.vue'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme1',
  components: { Enigme1MainScreen, Enigme1Player1, Enigme1Player2 },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  })
}
</script>

<style lang="scss" scoped></style>
