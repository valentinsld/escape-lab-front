<template>
  <div></div>
</template>

<script>
import { MUTATIONS as M } from '@/store/helpers'

export default {
  name: 'Enigme1MainScreen',
  mounted() {
    this.$store.commit(M.startLaboAmbiance)
  }
}
</script>
