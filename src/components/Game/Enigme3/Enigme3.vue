<template>
  <div v-if="config" class="enigme-3">
    <div class="enigme-3__helper">
      <h2>Config generated :</h2>
      <h4 v-html="` is Bot : ${config.sellerType}`" />
      <div class="enigme-3__helper__rules">
        <p v-for="(rule, i) in config.trueRules" :key="i" v-html="` Règle ${rule.slug}`" />
      </div>
    </div>
    <Enigme3MainScreen v-if="typeScreen === 'MainScreen'" :true-rules="config.trueRules" :product="config.product" />
    <Enigme3Player1
      v-if="typeScreen === 'Player1'"
      :true-rules="config.trueRules"
      :seller-type="config.sellerType"
      :product="config.product"
      :questions-to-display="config.settings.questionsToDisplay"
    />
    <Enigme3Player2 v-if="typeScreen === 'Player2'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme3MainScreen from '@/components/Game/Enigme3/Enigme3MainScreen.vue'
import Enigme3Player1 from '@/components/Game/Enigme3/Enigme3Player1.vue'
import Enigme3Player2 from '@/components/Game/Enigme3/Enigme3Player2.vue'
import { MUTATIONS as M, STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme3',
  components: { Enigme3MainScreen, Enigme3Player1, Enigme3Player2 },
  data() {
    return {
      trueRules: null
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen],
    config: (state) => state[S.enigme3Config]
  }),
  watch: {
    config: function (newVal) {
      console.log('true rules enigme 3 : ', newVal)
    }
  },
  mounted() {
    //if main screen get config rules from back
    if (this.typeScreen === 'MainScreen') {
      this.$socket.emit('sendEnigme3Config')
    }
    this.sockets.subscribe('sendEnigme3Config', (config) => {
      this.$store.commit(M.enigme3Config, config)
    })
  }
}
</script>

<style lang="scss" scoped>
.enigme-3__helper {
  position: fixed;
  top: 20px;
  display: block;
  padding: 1em;
  background: var(--color-grey-light);
}

.enigme-3__helper__rules {
  display: flex;
  justify-content: center;

  p {
    margin: 10px;
  }
}
</style>
