<template>
  <div class="outro" :class="endVideo ? '-black' : ''">
    <Button v-if="endVideo" text="Voir des statistiques" :on-click="goToStats" />
  </div>
</template>

<script>
import Button from '@/components/block/button'

export default {
  name: 'OutroMainScreen',
  components: {
    Button
  },
  data() {
    return {
      endVideo: false
    }
  },
  sockets: {
    'outro-end': function () {
      // console.log('endVideo')
      this.endVideo = true
    }
  },
  methods: {
    goToStats() {
      this.$router.push({ path: '/results' })
    }
  }
}
</script>

<style lang="scss" scoped>
.outro {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: all 500ms var(--custom-bezier);

  &.-black {
    background-color: var(--color-black);
  }
}
</style>
