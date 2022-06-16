<template>
  <div class="annonce-product" :style="`--scale: ${scale}`">
    <div v-if="product" class="annonce-product__wrapper">
      <h2
        v-if="product.name && product.subtype.val"
        class="annonce-product__title"
        v-html="product.name + ' ' + product.subtype.val"
      />
      <div class="annonce-product__row">
        <div class="annonce-product__left-column">
          <div class="annonce-product__img-container">
            <img v-if="product.img" class="annonce-product__img" :src="getSource" />
          </div>
        </div>
        <div class="annonce-product__right-column">
          <div v-if="product.description" class="annonce-product__description">
            <p v-for="(item, index) in product.description" :key="index" v-html="item" />
          </div>
        </div>
      </div>

      <div class="annonce-product__row">
        <div class="annonce-product__left-column">
          <div class="annonce-product__sailer">
            <h4 class="annonce-product__sailer-name">
              Vendu par <span>{{ textContent.sailerName }}</span>
            </h4>
            <div v-if="sailer" class="annonce-product__sailer-data">
              <p v-if="sailer.sales && sailer.reviews" v-html="`${sailer.sales} ventes - ${sailer.reviews} avis`" />
              <p v-if="sailer.date" v-html="`Membre depuis ${sailer.date}`" />
              <p>Répond en moyenne dans l'heure</p>
            </div>
          </div>
        </div>

        <div class="annonce-product__right-column">
          <div v-if="product.criteria.good" class="annonce-product__criteria-container">
            <h3>Détails techniques</h3>
            <div v-for="(criteria, name) in product.criteria.good" :key="name" class="annonce-product__criteria-item">
              <p v-if="criteriaName[name]" class="annonce-product__criteria-name" v-html="criteriaName[name]" />
              <p class="annonce-product__criteria-value" v-html="criteria" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { botSailers, criteriaName, normalSailers, textContent } from '@/data/enigme3'
import { randomNum } from '@/helpers/randomNum'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme3MainScreen',
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    trueRules: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      criteriaName: criteriaName,
      sailer: null,
      scale: 1,
      textContent: textContent
    }
  },
  computed: {
    getSource() {
      return require(`@/assets/images/enigme3/annonce-product/${this.product.img}.png`)
    }
  },
  mounted() {
    this.sailer = this.getSailer()

    this.initScale()

    //this.$store.state[S.sounds]?.['labo_ambiance'].play()
    this.$store.state[S.sounds]?.['music-enigme'].play()
    setTimeout(() => this.$store.state[S.sounds]?.['simlich-rire'], 15000)
  },
  sockets: {
    'show-fader': function () {
      this.$el.style.opacity = 0
    },
    'enigme3-restart': function () {
      this.$el.style.opacity = 1
    }
  },
  beforeDestroy() {
    this.$store.state[S.sounds]?.['music-enigme'].stop()
  },
  methods: {
    getSailer() {
      const isTrueRule = this.trueRules.filter((e) => e.slug === 'profile').length > 0
      return isTrueRule
        ? botSailers[randomNum(0, botSailers.length)]
        : normalSailers[randomNum(0, normalSailers.length)]
    },
    initScale() {
      this.scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080) * 0.87

      window.addEventListener('resize', () => {
        this.scale = Math.max(window.innerWidth / 1920, window.innerHeight / 1080) * 0.87
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.annonce-product {
  position: absolute;
  top: 42.8vh;
  left: 49.1%;
  width: 986px;
  height: 560px;
  transition: opacity 400ms var(--custom-bezier);
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%) scale(var(--scale, 1));

  p {
    margin: 5px 0;
  }
}

.annonce-product__title {
  margin-top: 0;
  font-size: 2.3em;
  font-weight: var(--weight-bold);
  text-align: center;
  text-shadow: 2px 0 0 var(--color-black);
  letter-spacing: 0.5px;
}

.annonce-product__site-title {
  font-size: 2rem;
  color: var(--color-white);
  text-align: center;
}

.annonce-product__img {
  width: 100%;
  border: 3px solid var(--color-black);
  box-shadow: 6px 6px 0 var(--color-black);
}

.annonce-product__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 2.2em 5em;
  overflow: hidden;
  background: var(--color-white);
  border: 5px solid var(--color-black);
  border-radius: 160px;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: '';
    background-color: #b5a79e;
    opacity: 0.25;
  }
}

.annonce-product__description {
  margin-top: 45px;
  font-size: 1.15em;
}

.annonce-product__row {
  display: flex;
  justify-content: space-between;

  & + & {
    margin-top: 20px;
  }
}

.annonce-product__left-column {
  width: 47%;
}

.annonce-product__right-column {
  width: 45%;
}

.annonce-product__sailer-name {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 2em;
  line-height: 1.65;

  span {
    text-decoration: underline;
  }
}

.annonce-product__sailer-data {
  margin-top: 20px;

  p {
    font-size: 1.3em;

    &:nth-child(1) {
      font-weight: var(--weight-bold);
    }
  }
}

.annonce-product__criteria-container {
  // margin-top: 50px;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 2em;
    line-height: 1.65;
  }
}

.annonce-product__criteria-item {
  display: flex;
  font-size: 1.15em;
}

.annonce-product__criteria-name {
  padding-right: 6px;
  margin: 0;
  font-weight: bold;
}

.annonce-product__criteria-value {
  margin: 0;
}
</style>
