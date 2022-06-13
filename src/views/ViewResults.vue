<template>
  <div id="dataviz">
    <h1>Et en vrai ?</h1>
    <swiper
      id="ResultsCardsSlider"
      class="swiperTest"
      slides-per-view="auto"
      :scrollbar="{ draggable: true }"
      mousewheel
      free-mode
      navigation
    >
      <!-- <div class="inner-slider"> -->
      <swiper-slide style="width: 480px">
        <ResultCard
          :image="Person"
          title="Un problème qui touche aussi les jeunes"
          main-text="Si on a tendance à penser que les personnes qui se font le plus arnaquer sont les séniors, il s’agit en réalité des 15-29 ans. Une arnaque sur deux se déroule en effet sur internet, lieu d’échange de prédilection de cette tranche d’âge, qui s’expose sans le savoir.
          En revanche, les montants escroqués aux +70 ans, les seconds plus arnaqués en France, sont supérieurs à ceux escroqués aux jeunes, alors soyez sympa, protégez vos aînés, passez le mot !"
          :has-tips="false"
          tips-text="none"
        />
      </swiper-slide>
      <swiper-slide style="width: 480px">
        <ResultCard
          :image="Machine"
          title="le Ping Call"
          main-text="Une des arnaques les plus classiques, et pouvant aboutir à des conséquences financières lourdes, le Ping Call consiste à faire rappeler un numéro surtaxé en se faisant passer, en général, pour un agent d’une compagnie d’énergie ou de téléphonie."
          :has-tips="true"
          tips-text="Orange rappelle à ses utilisateurs que les numéros commençant par 081, 082 et 089 sont tous 
des numéros surtaxés."
        />
      </swiper-slide>
      <swiper-slide style="width: 480px">
        <ResultCard
          :image="Alert"
          title="Le faux courrier"
          main-text="Vue et revue dans nos boîtes mails et dan nos DM instagram, l’arnaque aux spams et au courrier frauduleux est toutefois encore toujours présente. 
Il est aussi important de se rappeler que les faux courriers existent aussi par voie postale, et toujours vérifier l’expéditeur."
          :has-tips="true"
          tips-text="On pense à vérifier les expéditeurs de nos courriers et mails, et on fait attention aux liens pour se connecter."
        />
      </swiper-slide>
      <swiper-slide style="width: 480px">
        <ResultCard
          :image="Bag"
          title="Les fausses ventes de produits ou services"
          main-text="Parmi les arnaques les plus répandues, on peut citer les fausses ventes de produits ou de services : qui n’a jamais commandé un produit en ligne, pour recevoir un produit totalement non conforme, voir ne jamais le recevoir !"
          :has-tips="true"
          tips-text="Prenez garde à toujours vérifier les avis et les notes du vendeur, pour vous assurer de sa véracité 
et de sa qualité."
        />
      </swiper-slide>
      <swiper-slide style="width: 480px">
        <ResultCard
          :image="IdCard"
          title="L’usurpation d’identité"
          main-text="Sous prétexte d’une vente d’un objet, ou d’une visite de logement, votre interlocuteur vous demande de fournir des documents officiels : pièces d’identité, bulletins de salaire, … Attention, certaines personnes malveillantes s’en servent pour ouvrir des crédits à la consommation à votre nom !"
          :has-tips="true"
          tips-text="Lors d’une visite d’appartement,
pensez à ajouter un filigrane
&laquo;document réservé à la recherche de logement&raquo; sur votre dossier."
        />
      </swiper-slide>
      <!-- </div> -->
    </swiper>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'

import { Mousewheel, Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperCore, SwiperSlide } from 'swiper-vue2'

import Alert from '@/assets/images/results/alert.png'
import Bag from '@/assets/images/results/bag.png'
import IdCard from '@/assets/images/results/idCard.png'
import Machine from '@/assets/images/results/machine.png'
import Person from '@/assets/images/results/person.png'
import ResultCard from '@/components/block/ResultCard.vue'
SwiperCore.use([Scrollbar, Mousewheel, Navigation])

export default {
  name: 'ViewResults',
  components: {
    Swiper,
    SwiperSlide,
    ResultCard
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        scrollbar: true,
        mousewheel: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      Alert,
      Bag,
      IdCard,
      Machine,
      Person
    }
  }
}
</script>

<style scoped>
/* 
.result-card {
  max-width: 580px;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 202px;
}
.swiper-container {
  height: 450px;
  width: 100%;
}

.inner-slider {
  display: flex !important;
  gap: 20px 20px;
} */

#dataviz {
  width: 100%;
  height: 100%;
  background-color: var(--color-blue);
}

#dataviz h1 {
  font-size: 75px;
  color: var(--color-white);
  text-shadow: 4px 1px 0 var(--color-black);
  -webkit-text-stroke: 1px var(--color-black);

  /* font-weight: bold; */
}

#ResultsCardsSlider {
  height: 100%;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* width: 400px; */

  /* margin: 0 100px; */
}

.swiper-slide:first-of-type {
  margin-left: 300px;
}

.swiper-slide:last-of-type {
  margin-right: 600px;
}

.swiper-container {
  width: 100%;
  height: 450px;
}

@media screen and (max-width: 767px) {
  .swiper-slide:first-of-type {
    margin-left: 0;
  }

  .swiper-slide:last-of-type {
    margin-right: 0;
  }
}
</style>
