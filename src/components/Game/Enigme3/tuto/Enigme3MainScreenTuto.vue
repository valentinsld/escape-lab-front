<template>
  <div class="tuto">
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
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 2em;
  text-align: center;
}
</style>
