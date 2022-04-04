<template>
  <div class="sample">
    <router-link v-slot="{ href, navigate }" to="/" custom>
      <Link :href="href" :on-click="navigate">Go to connection</Link>
    </router-link>
    <h1 v-html="text"></h1>
    <router-link v-slot="{ href, navigate }" to="game" custom>
      <Link :href="href" :on-click="navigate">Go to game</Link>
    </router-link>
  </div>
</template>

<script>
import Link from '@/components/primitives/Link'
export default {
  name: 'Sample',
  components: {
    Link
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sample {
  h1 {
    color: red;
  }
}
</style>
