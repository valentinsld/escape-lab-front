<template>
  <div ref="interactElement" class="notice">
    <!--    <div class="notice__validation">
      <div class="notice__validation__overlay" />
      <div class="notice__validation__wrapper">
        <button class="notice__validation__button" @click="nextStep">Valider mes choix</button>
        <p class="notice__validation__modify">ou <u>modifier</u></p>
      </div>
    </div>-->
    <notice-choices :active-buttons="activeButtons" :on-click="removeChoice" />
    <!--    <div class="notice__rules-choices">
      <div v-for="i in 3" :key="i" class="notice__rule-choice__dot" :class="`notice__rule-choice__dot&#45;&#45;${i}`" />
      <div
        v-for="(slug, i) in activeButtons"
        :key="slug"
        class="notice__rule-choice"
        :class="`notice__rule-choice&#45;&#45;${i}`"
        @click="removeChoice(slug)"
      >
        <img class="notice__rule-choice__img" :src="getIcon(slug)" />
      </div>
    </div>-->
    <div class="notice__rules-container">
      <div
        v-for="(slug, i) in notice"
        ref="rule"
        :key="i"
        :class="`notice__rule notice__rule--${i}`"
        :style="ruleStyle(i)"
      >
        <div class="notice__rule__wrapper">
          <img class="notice__rule__img" :src="getSource(slug)" />
          <button v-if="i > 0" class="notice__rule__btn" @click="toggleButton(slug)" v-html="buttonText(slug)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'
import interact from 'interact.js'

import NoticeChoices from '@/components/block/enigme3/noticeChoices'
import { notice } from '@/data/enigme3'

export default {
  name: 'Enigme3Player2',
  components: { NoticeChoices },
  data() {
    return {
      currentPage: 1,
      numberOfPages: 7,
      listeningSwipe: true,
      activeButtons: [],
      notice: notice
    }
  },
  computed: {},
  mounted() {
    console.log(this.notice, 'notice')
    this.currentPage = 1

    const element = this.$refs.interactElement
    interact(element).draggable({
      onmove: (event) => {
        if (event.dx > 2 && this.listeningSwipe) {
          this.listeningSwipe = false
          this.prevRule()
        }
        if (event.dx < -2 && this.listeningSwipe) {
          this.listeningSwipe = false
          this.nextRule()
        }
      },
      onend: () => {
        this.listeningSwipe = true
      }
    })
  },
  beforeDestroy() {
    interact(this.$refs.interactElement).unset()
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
    getSource(slug) {
      return require(`@/assets/images/enigme3/notice/${slug}.png`)
    },
    getIcon(slug) {
      return require(`@/assets/images/enigme3/notice/icons/${slug}.svg`)
    },
    ruleStyle(i) {
      return {
        zIndex: 100 - i
      }
    },
    nextRule() {
      if (this.currentPage < this.numberOfPages) {
        Anime({
          targets: this.$refs?.rule[this.currentPage - 1],
          translateX: ['-50%', -140],
          rotate: -15,
          translateY: ['-50%', '-50%'],
          duration: 500,
          easing: 'cubicBezier(0.12, 0.74, 1.0, 0.99)'
        })
        this.currentPage += 1
      }
    },
    prevRule() {
      if (this.currentPage > 1) {
        Anime({
          targets: this.$refs?.rule[this.currentPage - 2],
          rotate: 0,
          translateX: [-140, '-50%'],
          translateY: ['-50%', '-50%'],
          duration: 500,
          easing: 'cubicBezier(0.12, 0.74, 1.0, 0.99)'
        })
        this.currentPage -= 1
      }
    },
    isButtonActive(slug) {
      return this.activeButtons.includes(slug)
    },
    buttonText(slug) {
      return this.isButtonActive(slug) ? 'Annuler' : 'Signaler'
    },
    toggleButton(slug) {
      if (this.isButtonActive(slug)) {
        this.removeChoice(slug)
      } else {
        if (this.activeButtons.length < 3) this.activeButtons.push(slug)
      }
    },
    removeChoice(slug) {
      const i = this.activeButtons.indexOf(slug)
      this.activeButtons.splice(i, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.notice {
  height: calc(100 * var(--vhRes, 1vh));
  background: #3577f5;
}

.notice__rules-choices {
  position: absolute;
  top: 3%;
  left: 50%;
  width: 135px;
  height: 35px;
  padding: 5px 0;
  margin: auto;
  border: 2px solid white;
  transform: translateX(-50%);
}

.notice__rule-choice {
  position: absolute;
  top: 50%;
  display: flex;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);

  &.notice__rule-choice--0 {
    left: 10px;
  }

  &.notice__rule-choice--1 {
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.notice__rule-choice--2 {
    right: 10px;
  }
}

.notice__rule-choice__dot {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  transform: translateY(-50%);

  &.notice__rule-choice__dot--1 {
    left: 26px;
  }

  &.notice__rule-choice__dot--2 {
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.notice__rule-choice__dot--3 {
    right: 26px;
  }
}

.notice__rule-choice__img {
  width: 100%;
  height: 100%;
  background: #3577f5;
}

.notice__rule {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 305px;
  transform: translate(-50%, -50%);
}

.notice__rule__img {
  width: 100%;
  height: 100%;
}

.notice__rule__wrapper {
  .notice__rule--2 & {
    transform: rotate(3deg);
  }

  .notice__rule--4 & {
    transform: rotate(-2deg);
  }

  .notice__rule--6 & {
    transform: rotate(2deg);
  }
}

.notice__rule__btn {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
}

.notice__validation {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.notice__validation__wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75%;
  padding: 2em 1em;
  transform: translate(-50%, -50%);
}

.notice__validation__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  transition: 300ms var(--custom-bezier);
}

.notice__validation__modify {
  margin-bottom: 20px;
  font-size: 18px;
  color: #f8f8f8;
  text-align: center;
}

.notice__validation__button {
  display: block;
  padding: 0.8em 1.5em;
  margin: auto;
  font-weight: bold;
  color: #f8f8f8;
  background: #f59535;
  border: 4px solid var(--color-black);
  border-radius: 27px;
}
</style>
