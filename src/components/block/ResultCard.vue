<template>
  <div class="result__card">
    <header>
      <div class="circle">
        <img :src="image" alt="" />
      </div>
    </header>
    <div class="content">
      <h3>{{ title }}</h3>
      <p>
        {{ mainText }}
      </p>
    </div>
    <footer v-if="hasTips">
      <h4>Pour l'éviter</h4>
      <div class="tips">
        <img :src="LightBulb" alt="" />
        <p>
          {{ tipsText }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import LightBulb from '@/assets/images/results/lightbulb.png'

export default {
  name: 'ResultsCard',
  components: {},
  props: {
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    mainText: {
      type: String,
      default: null
    },
    hasTips: {
      type: Boolean,
      default: null
    },
    tipsText: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      LightBulb
    }
  }
}
</script>

<style lang="scss" scoped>
.result__card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 595px;
  padding: 0 32px;
  padding-bottom: 20px;
  margin: 0 20px;
  background-color: var(--color-whiteDimmed);
  border: 5px solid var(--color-black);
  border-radius: var(--box-rounded-radius);
  box-shadow: 6px 6px 0 var(--color-black);
}

.result__card.no-tips {
  justify-content: flex-start;

  & h3 {
    padding: 30px;
  }
}

.result__card header {
  width: 170px;
  height: 170px;
  margin-top: -100px;
  background-color: var(--color-primary);
  border: var(--color-black) solid 4px;
  border-radius: 50%;

  & img {
    width: auto;
    height: 100px;
  }
}

.result__card .content h3 {
  padding: 20px 0 !important;
  margin: 0;
  font-size: 30px;
  font-weight: var(--weight-bold);
  text-align: center;
}

.result__card .content {
  text-align: center;
}

.result__card .content p {
  margin: 15px 0;
  font-size: 18px;
  font-weight: var(--weight-regular);
}

footer h4 {
  margin-top: 0;
  text-align: left;
}

footer p {
  font-weight: var(--weight-regular);
}

.tips {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.tips img {
  width: fit-content;
}

.tips p {
  margin-top: 0;
  margin-left: 20px;
  font-size: 18px;
  text-align: left;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
}

@media screen and (max-width: 767px) {
  .results {
    padding: 0;
  }

  .result__card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    max-width: 95vw;
    height: 625px;
    // padding: 0 20px;
    margin: 20px;
    background-color: var(--color-whiteDimmed);
    border-radius: var(--box-rounded-radius);
    box-shadow: 6px 6px 0 var(--color-black);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    margin-top: -100px;
    border: var(--color-black) solid 4px;
    border-radius: 50%;
  }

  .result__card .content h3 {
    padding: 20px 0;
    font-size: 30px;
    font-weight: var(--weight-bold);
    text-align: center;
  }
}

@media screen and (min-width: 768px) {
  .result__card {
    height: 670px;
    margin-bottom: 200px;
  }
}

@media screen and (min-width: 992px) {
  .result__card {
    height: 670px;
    margin: 0 10px;
  }
}

@media screen and (min-width: 1400px) {
  .result__card {
    width: 480px;
    height: 600px;
    margin-bottom: 200px;
    // transform: scale(1.5);
  }
}
</style>
