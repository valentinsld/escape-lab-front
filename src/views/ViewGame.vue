<template>
  <p>View Game</p>
</template>

<script>
import { MUTATIONS as M } from '@/store/helpers'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'ViewGame',
  beforeMount() {
    console.log(this.$store.state[S.idRoom])
    if (!this.$store.state[S.idRoom]) {
      return this.$router.push('/')
    }

    this.$store.commit(M.isStart, true)
  }
}
</script>

<style lang="scss" scoped></style>
