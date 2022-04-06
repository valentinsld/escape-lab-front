<template>
  <div class="sample">
    <!-- Routing example -->
    <router-link v-slot="{ href, navigate }" to="/" custom>
      <Link :href="href" :on-click="navigate">Go to connection</Link>
    </router-link>
    <h1 v-html="text"></h1>
    <router-link v-slot="{ href, navigate }" to="game" custom>
      <Link :href="href" :on-click="navigate">Go to game</Link>
    </router-link>
    <!-- Store mutation example -->
    <button @click="storeMutation()">action</button>
  </div>
</template>

<script>
import Link from '@/components/primitives/Link'
import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'

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
  },
  data() {
    return {
      stateFromStore: this.$store.state[S.myState]
    }
  },
  methods: {
    storeMutation() {
      this.$store.commit(M.myState, 100)
    }
  }
}
</script>

<style lang="scss" scoped></style>
