<template>
  <div></div>
</template>

<script>
import { STATE as S } from '@/store/helpers'

export default {
  name: 'Enigme1MainScreen',
  mounted() {
    this.$store.state[S.sounds]?.['labo_ambiance'].play()
  }
}
</script>
