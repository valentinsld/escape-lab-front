<template>
  <div class="tuto">
    <p v-html="textContent.consigne.notice" />
    <button>Start</button>
  </div>
</template>

<script>
import { textContent } from '@/data/enigme3'
export default {
  name: 'Enigme3Player2Tuto',
  data() {
    return {
      textContent: textContent
    }
  }
}
</script>
<style lang="scss" scoped></style>
