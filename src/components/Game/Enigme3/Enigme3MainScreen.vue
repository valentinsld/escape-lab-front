<template>
  <div class="annonce-product">
    <p class="annonce-product__site-title">leboncon</p>
    <div v-if="product" class="annonce-product__wrapper">
      <div class="annonce-product__left-column">
        <div class="annonce-product__img-container">
          <img v-if="product.img" class="annonce-product__img" :src="getSource" />
        </div>
        <h2 v-if="product.name" class="annonce-product__title" v-html="product.name" />
        <h4 v-if="product.subtype.text" v-html="product.subtype.text" />
        <div v-if="product.description" class="annonce-product__description" v-html="getGlyphDescription" />
      </div>
      <div class="annonce-product__right-column">
        <div class="annonce-product__sailer">
          <div class="annonce-product__sailer-name">
            <img src="@/assets/images/enigme3/sailer-profil.png" />
            <h3>Vendue par eric.mb19</h3>
          </div>
          <div v-if="sailer" class="annonce-product__sailer-data">
            <p v-if="sailer.sales" v-html="`${sailer.sales} ventes`" />
            <p v-if="sailer.reviews" v-html="`${sailer.reviews} avis`" />
            <p v-if="sailer.date" v-html="`Membre depuis ${sailer.date}`" />
          </div>
          <p>Répond en moyenne dans l'heure</p>
        </div>
        <div v-if="product.criteria.good" class="annonce-product__criteria-container">
          <h3>Caractéristiques techniques</h3>
          <div v-for="(criteria, name) in product.criteria.good" :key="name" class="annonce-product__criteria-item">
            <p v-if="criteriaName[name]" class="annonce-product__criteria-name" v-html="criteriaName[name]" />
            <p class="annonce-product__criteria-value" v-html="criteria" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { botGlyphConverter, botSailers, criteriaName, normalGlyphConverter, normalSailers } from '@/data/enigme3'
import { randomNum } from '@/helpers/randomNum'
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
      sailer: null
    }
  },
  computed: {
    getSource() {
      return require(`@/assets/images/enigme3/annonce-product/${this.product.img}.png`)
    },
    getGlyphDescription() {
      const isTrueRule = this.trueRules.filter((e) => e.slug === 'special-characters').length > 0
      let str = this.product.description
      if (isTrueRule) {
        for (const letter in botGlyphConverter) {
          str = str.replace(new RegExp(letter, 'g'), botGlyphConverter[letter])
        }
      } else {
        for (const letter in normalGlyphConverter) {
          str = str.replace(new RegExp(letter, 'g'), normalGlyphConverter[letter])
        }
      }
      return str
    }
  },
  mounted() {
    console.log(this.product, 'product annonce')
    this.sailer = this.getSailer()
  },
  sockets: {
    startEnigme: function () {
      this.start()
    }
  },
  methods: {
    start() {
      console.log('START ENIGME')
    },
    getSailer() {
      const isTrueRule = this.trueRules.filter((e) => e.slug === 'profile').length > 0
      return isTrueRule
        ? botSailers[randomNum(0, botSailers.length)]
        : normalSailers[randomNum(0, normalSailers.length)]
    }
  }
}
</script>
<style lang="scss" scoped>
.annonce-product__site-title {
  font-size: 2rem;
  color: white;
  text-align: center;
}

.annonce-product {
  height: 100vh;
  padding: 2em 1em;
  background: #4a6cff;
}

.annonce-product__wrapper {
  display: flex;
  justify-content: space-around;
  padding: 2em;
  background: #fff;
  border: 5px solid var(--color-black);
  border-radius: 30px;
}

.annonce-product__sailer-name {
  display: flex;
}

.annonce-product__criteria-item {
  display: flex;
  margin: 10px 0;
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
