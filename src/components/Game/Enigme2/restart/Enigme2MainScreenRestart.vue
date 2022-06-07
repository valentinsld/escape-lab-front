<template>
  <div class="restart">
    <div class="restart__content">
      <h2>ECHEC</h2>
      <h3 v-html="textContent.consigne.mainScreen" />
    </div>
  </div>
</template>

<script>
import { textContent } from '@/data/enigme1'

export default {
  name: 'Enigme2MainScreenRestart',
  data() {
    return {
      textContent: textContent
    }
  }
}
</script>
<style lang="scss" scoped>
.restart {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  &__content {
    width: 75%;
    max-width: 600px;
    padding: 2em 3em;
    background: white;
    border: 5px solid var(--color-black);
    border-radius: 30px;
  }

  h2 {
    text-align: center;
  }

  h3 {
    line-height: 1.6rem;
  }
}
</style>
