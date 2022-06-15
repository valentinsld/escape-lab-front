<template>
  <div class="annonce-product" :style="`--scale: ${scale}`">
    <div v-if="product" class="annonce-product__wrapper">
      <div class="annonce-product__row">
        <div class="annonce-product__left-column">
          <div class="annonce-product__img-container">
            <img v-if="product.img" class="annonce-product__img" :src="getSource" />
          </div>
        </div>
        <div class="annonce-product__right-column">
          <div class="annonce-product__sailer">
            <div class="annonce-product__sailer-name">
              <img src="@/assets/images/enigme3/sailer-profil.png" />
              <h4 v-html="` Vendu par <br> <span>${textContent.sailerName}</span> `" />
            </div>
            <div v-if="sailer" class="annonce-product__sailer-data">
              <p v-if="sailer.sales && sailer.reviews" v-html="`${sailer.sales} ventes - ${sailer.reviews} avis`" />
              <p v-if="sailer.date" v-html="`Membre depuis ${sailer.date}`" />
              <p>Répond en moyenne dans l'heure</p>
            </div>
          </div>
        </div>
      </div>

      <div class="annonce-product__row">
        <div class="annonce-product__left-column">
          <h2 v-if="product.name" class="annonce-product__title" v-html="product.name" />
          <h4 v-if="product.subtype.text" v-html="product.subtype.text" />
          <div v-if="product.description" class="annonce-product__description">
            <p v-for="(item, index) in product.description" :key="index" v-html="item" />
          </div>
        </div>

        <div class="annonce-product__right-column">
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
  </div>
</template>

<script>
import { botSailers, criteriaName, normalSailers, textContent } from '@/data/enigme3'
import { randomNum } from '@/helpers/randomNum'
import Sound from '@/helpers/Sound'
import { MUTATIONS as M } from '@/store/helpers'
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
      textContent: textContent,
      music: null,
      scale: 1
    }
  },
  computed: {
    getSource() {
      return require(`@/assets/images/enigme3/annonce-product/${this.product.img}.png`)
    }
  },
  mounted() {
    this.sailer = this.getSailer()
    this.$store.commit(M.startLaboAmbiance)
    this.music = new Sound('musics/enigme', { volume: 0.4, isLoop: true })
    setTimeout(() => new Sound('simlich-rire', { volume: 5.5 }), 15000)

    this.initScale()
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
    this.music?.stop()
  },
  methods: {
    getSailer() {
      const isTrueRule = this.trueRules.filter((e) => e.slug === 'profile').length > 0
      return isTrueRule
        ? botSailers[randomNum(0, botSailers.length)]
        : normalSailers[randomNum(0, normalSailers.length)]
    },
    initScale() {
      this.scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080) * 0.92

      window.addEventListener('resize', () => {
        this.scale = Math.max(window.innerWidth / 1920, window.innerHeight / 1080) * 0.92
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.annonce-product {
  position: absolute;
  top: 42.5vh;
  left: 49.33%;
  width: 986px;
  height: 560px;
  transition: opacity 400ms var(--custom-bezier);
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%) scale(var(--scale, 1));

  p {
    margin: 5px 0;
  }
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 2.2em 3em;
  overflow: hidden;
  background: var(--color-white);
  border: 5px solid var(--color-black);
  border-radius: 170px;
}

.annonce-product__description {
  margin-top: 45px;
}

.annonce-product__row {
  display: flex;
  justify-content: space-between;

  & + & {
    margin-top: 20px;
  }
}

.annonce-product__left-column {
  width: 53%;
}

.annonce-product__right-column {
  width: 40%;
}

.annonce-product__sailer-name {
  display: flex;
  align-items: center;

  h4 {
    margin-left: 20px;
    font-size: 1.4em;
    line-height: 1.65;
  }
}

.annonce-product__criteria-container {
  // margin-top: 50px;

  h3 {
    margin-bottom: 35px;
    font-size: 1.3em;
  }
}

.annonce-product__criteria-item {
  display: flex;
}

.annonce-product__criteria-name {
  padding-right: 6px;
  margin: 0;
  font-weight: bold;
}

.annonce-product__criteria-value {
  margin: 0;
}

.annonce-product__sailer-data {
  margin-top: 20px;
}
</style>
