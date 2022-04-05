<template>
  <div>
    <p>View Connection</p>

    <Components :is="'Connection' + $data.stateScreen" />
  </div>
</template>

<script>
import ConnectionMainScreen from '@/components/Connection/ConnectionMainScreen.vue'
import ConnectionPlayer from '@/components/Connection/ConnectionPlayer.vue'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'ViewConnection',
  components: {
    ConnectionMainScreen,
    ConnectionPlayer
  },
  data() {
    return {
      stateScreen: this.$store.state[S.stateScreen]
    }
  }
}
</script>

<style lang="scss" scoped></style>
