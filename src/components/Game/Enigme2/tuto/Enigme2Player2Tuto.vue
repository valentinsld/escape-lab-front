<template>
  <PlayerTuto :text="textContent.consigne.player2" color-background="enigme2" />
</template>

<script>
import PlayerTuto from '@/components/Game/Enigme1/PlayerTuto'
import { textContent } from '@/data/enigme2'
export default {
  name: 'Enigme2Player2Tuto',
  components: { PlayerTuto },
  data() {
    return {
      textContent: textContent
    }
  }
}
</script>
