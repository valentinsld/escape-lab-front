<template>
  <div class="containerRestart">
    <PlayerTuto :text="textContent.consigne.player" socket-send="enigme2-readyRestart" text-button="Recommencer" />
  </div>
</template>

<script>
import PlayerTuto from '@/components/block/PlayerTuto'
import { textContent } from '@/data/enigme1'
export default {
  name: 'Enigme2PlayerRestart',
  components: { PlayerTuto },
  data() {
    return {
      textContent: textContent
    }
  }
}
</script>
<style lang="scss">
.containerRestart {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  border-color: red !important;

  .screenContainer::after {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
