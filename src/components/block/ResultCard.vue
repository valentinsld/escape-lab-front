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
  max-width: 485px;
  height: 695px;
  margin: 0 20px;
  background-color: var(--color-whiteDimmed);
  border-radius: var(--box-rounded-radius);
  box-shadow: 6px 6px 0 var(--color-black);
}

.result__card.no-tips {
  justify-content: flex-start;
}

.result__card header {
  margin-top: -100px;
  background-color: var(--color-primary);
  border: var(--color-black) solid 4px;
  border-radius: 50%;
}

.result__card .content h3 {
  padding: 20px 0;
  font-size: 30px;
  font-weight: var(--weight-bold);
  text-align: center;
}

.result__card .content {
  padding: 20px;
  text-align: center;
}

.result__card .content p {
  font-size: 18px;
  font-weight: var(--weight-regular);
}

footer {
  padding-bottom: 20px;
  margin: 0 20px;
}

footer h4 {
  text-align: left;
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
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  height: 230px;
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
    justify-content: flex-start;
    max-width: 95vw;
    height: 695px;
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
    padding: 0;
    font-size: 30px;
    font-weight: var(--weight-bold);
    text-align: center;
  }
}
</style>
