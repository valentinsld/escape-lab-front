<template>
  <div class="view" :class="`view--${name} -is${stateScreen}`">
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'

export default {
  name: 'ViewContainer',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: mapState({
    stateScreen: (state) => state[S.stateScreen]
  })
}
</script>

<style lang="scss" scoped>
.view {
  position: relative;
  display: flex;
  height: calc(100 * var(--vhRes, 1vh)) !important;
  max-height: calc(100 * var(--vhRes, 1vh));
}
</style>
