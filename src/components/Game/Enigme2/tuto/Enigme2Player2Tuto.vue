<template>
  <PlayerTuto :text="textContent.consigne.player2" color-background="enigme2" :gif="gif" />
</template>

<script>
import gif from '@/assets/Intro_2.gif'
import PlayerTuto from '@/components/block/PlayerTuto'
import { textContent } from '@/data/enigme2'

export default {
  name: 'Enigme2Player2Tuto',
  components: { PlayerTuto },
  data() {
    return {
      textContent: textContent,
      gif
    }
  }
}
</script>
