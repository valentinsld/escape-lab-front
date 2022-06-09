<template>
  <div class="tuto">
    <h2>Consigne</h2>
    <h3 v-html="textContent.consigne.mainScreen" />
  </div>
</template>

<script>
import { textContent } from '@/data/enigme3'

export default {
  name: 'Enigme3MainScreenTuto',
  data() {
    return {
      textContent: textContent
    }
  }
}
</script>
<style lang="scss" scoped>
.tuto {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75%;
  max-width: 600px;
  padding: 2em 3em;
  background: white;
  border: 5px solid var(--color-black);
  border-radius: var(--box-rounded-radius);
  transform: translate(-50%, -50%);

  h2 {
    text-align: center;
  }

  h3 {
    line-height: 1.6rem;
  }
}
</style>
