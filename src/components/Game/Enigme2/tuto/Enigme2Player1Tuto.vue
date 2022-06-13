<template>
  <PlayerTuto :text="textContent.consigne.player1" :gif="gif" color-background="enigme2" />
</template>

<script>
import gif from '@/assets/Intro_2.gif'
import PlayerTuto from '@/components/block/PlayerTuto'
import { textContent } from '@/data/enigme2'

export default {
  name: 'Enigme2Player1Tuto',
  components: { PlayerTuto },
  data() {
    return {
      textContent: textContent,
      gif
    }
  }
}
</script>
<style lang="scss" scoped></style>
