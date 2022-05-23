<template>
  <div class="tuto">
    <p v-html="textContent.consigne.chat" />
    <button>Start</button>
  </div>
</template>

<script>
import { textContent } from '@/data/enigme3'
export default {
  name: 'Enigme3Player1Tuto',
  data() {
    return {
      textContent: textContent
    }
  }
}
</script>
<style lang="scss" scoped></style>
