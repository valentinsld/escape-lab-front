<template>
  <PlayerTuto :text="textContent.consigne.player1" color-background="enigme2" />
</template>

<script>
import PlayerTuto from '@/components/block/PlayerTuto'
import { textContent } from '@/data/enigme2'
export default {
  name: 'Enigme2Player1Tuto',
  components: { PlayerTuto },
  data() {
    return {
      textContent: textContent
    }
  }
}
</script>
<style lang="scss" scoped></style>
