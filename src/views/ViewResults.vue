<template>
  <main>
    <img class="header" :src="Header" alt="" />
    <div class="scrolling-wrapper">
      <img :src="Card1" class="card" />
      <img :src="Card2" class="card" />
      <img :src="Card3" class="card" />
      <img :src="Card4" class="card" />
      <img :src="Card5" class="card" />
    </div>
  </main>
</template>

<script>
import Card1 from '@/assets/images/card1.png'
import Card2 from '@/assets/images/card2.png'
import Card3 from '@/assets/images/card3.png'
import Card4 from '@/assets/images/card4.png'
import Card5 from '@/assets/images/card5.png'
import Header from '@/assets/images/Et_en_vrai.png'

export default {
  name: 'ViewResults',
  data() {
    return {
      Header,
      Card1,
      Card2,
      Card3,
      Card4,
      Card5
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: var(--color-blue);
}

.header {
  width: auto;
  max-height: 150px;
}

.scrolling-wrapper {
  display: flex;
  flex: 1;
  align-items: center;
  max-width: 100%;
  padding: 10vh 24px;
  overflow: auto;
  scroll-snap-type: x proximity;
}

.card {
  max-width: 80vw;
  height: auto;
  max-height: 100%;
  margin: 0 24px;
  scroll-snap-align: left;
}
</style>
