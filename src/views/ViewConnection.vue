<template>
  <div>
    <ViewContainer name="connection">
      <p>View Connection</p>
      <Components :is="'Connection' + $data.stateScreen" />
    </ViewContainer>
  </div>
</template>

<script>
import ConnectionMainScreen from '@/components/Connection/ConnectionMainScreen.vue'
import ConnectionPlayer from '@/components/Connection/ConnectionPlayer.vue'
import { STATE as S } from '@/store/helpers'
import ViewContainer from '@/views/ViewContainer'

export default {
  name: 'ViewConnection',
  components: {
    ConnectionMainScreen,
    ConnectionPlayer,
    ViewContainer
  },
  data() {
    return {
      stateScreen: this.$store.state[S.stateScreen]
    }
  }
}
</script>

<style lang="scss" scoped></style>
