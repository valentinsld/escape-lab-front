<template>
  <div ref="interactElement" class="notice">
    <transition name="fade">
      <div v-if="showValidation && isSuccess === null" class="notice__validation">
        <div class="notice__validation__overlay" />
        <div class="notice__validation__wrapper">
          <notice-choices class="notice__validation__choices" :active-buttons="activeButtons" />
          <button class="notice__validation__button" @click="validateChoices">Valider mes choix</button>
          <p class="notice__validation__modify" @click="modifyChoices">ou <u>modifier</u></p>
        </div>
      </div>
    </transition>
    <notice-choices
      v-if="!showValidation"
      class="notice__choices"
      :active-buttons="activeButtons"
      :on-click="removeChoice"
    />
    <transition name="fade">
      <solution-popup v-if="isSuccess !== null" :true-rules="trueRules" :is-success="isSuccess" />
    </transition>
    <div class="notice__rules-container">
      <div
        v-for="(slug, i) in notice"
        ref="rule"
        :key="i"
        :class="[`notice__rule notice__rule--${i}`, isButtonActive(slug) && 'notice__rule--active']"
        :style="ruleStyle(i)"
      >
        <div class="notice__rule__wrapper">
          <img class="notice__rule__img" :src="getSource(slug)" />
          <img class="notice__rule__check" src="@/assets/images/enigme3/notice/check.png" />
          <button
            v-if="i > 0"
            class="notice__rule__btn"
            :class="isButtonActive(slug) ? 'notice__rule__btn--active' : ''"
            @click="toggleButton(slug)"
            v-html="buttonText(slug)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Anime from 'animejs'
import interact from 'interact.js'

import NoticeChoices from '@/components/block/enigme3/noticeChoices'
import SolutionPopup from '@/components/block/enigme3/solutionPopup'
import { notice } from '@/data/enigme3'

export default {
  name: 'Enigme3Player2',
  components: { SolutionPopup, NoticeChoices },
  props: {
    trueRules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 1,
      listeningSwipe: true,
      activeButtons: [],
      notice: notice,
      showValidation: false,
      isSuccess: null
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
    ruleStyle(i) {
      return {
        zIndex: 100 - i
      }
    },
    nextRule() {
      if (this.currentPage < this.notice.length) {
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
        setTimeout(() => {
          this.showValidation = this.activeButtons.length === 3
        }, 150)
      }
    },
    removeChoice(slug) {
      const i = this.activeButtons.indexOf(slug)
      this.activeButtons.splice(i, 1)
    },
    modifyChoices() {
      this.showValidation = false
    },
    isGoodChoices() {
      for (const rule in this.trueRules) {
        if (!this.activeButtons.includes(this.trueRules[rule].slug)) return false
      }
      return true
    },
    validateChoices() {
      console.log(this.activeButtons, this.trueRules)
      this.isSuccess = this.isGoodChoices()
      console.log(this.isSuccess, 'success')
    }
  }
}
</script>
<style lang="scss" scoped>
.notice {
  height: calc(100 * var(--vhRes, 1vh));
  background: #3577f5;
}

.notice__choices {
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
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

.notice__rule__check {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: 150ms var(--custom-bezier);
  transform: translateY(-50%);

  .notice__rule--active & {
    opacity: 1;
  }
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
  bottom: 30px;
  left: 50%;
  padding: 0.2em 1em;
  font-size: 20px;
  font-weight: bold;
  background: transparent;
  border: 4px solid var(--color-black);
  border-radius: 8px;
  transition: 150ms var(--custom-bezier);
  transform: translateX(-50%);

  .notice__rule--active & {
    color: #f8f8f8;
    background: var(--color-black);
  }
}

.notice__validation {
  position: absolute;
  z-index: 1000;
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
  background: rgba(0, 0, 0, 0.65);
  transition: 300ms var(--custom-bezier);
}

.notice__validation__choices {
  position: relative;
  margin: 0 auto 35px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
