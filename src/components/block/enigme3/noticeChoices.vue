<template>
  <transition name="fade">
    <div v-if="activeButtons" class="notice-choices">
      <div v-for="i in 3" :key="i" class="notice-choices__dot-wrapper">
        <div v-if="!activeButtons[i - 1]" class="notice-choices__dot" :class="`notice-choices__dot--${i}`" />
      </div>
      <div
        v-for="(slug, i) in activeButtons"
        :key="slug"
        class="notice-choices__choice"
        :class="`notice-choices__choice--${i}`"
        @click="onClick(slug)"
      >
        <img class="notice-choices__icon" :src="getSource(slug)" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NoticeChoices',
  props: {
    onClick: {
      type: Function,
      default() {
        return () => {}
      }
    },
    activeButtons: {
      type: Array,
      default: null
    }
  },
  methods: {
    getSource(slug) {
      return require(`@/assets/images/enigme3/notice/icons/${slug}.svg`)
    }
  }
}
</script>
<style lang="scss" scoped>
.notice-choices {
  width: 135px;
  height: 35px;
  padding: 5px 0;
  margin: auto;
  border: 2px solid white;
}

.notice-choices__choice {
  position: absolute;
  top: 50%;
  display: flex;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);

  &.notice-choices__choice--0 {
    left: 10px;
  }

  &.notice-choices__choice--1 {
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.notice-choices__choice--2 {
    right: 10px;
  }
}

.notice-choices__dot {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  transform: translateY(-50%);

  &.notice-choices__dot--1 {
    left: 26px;
  }

  &.notice-choices__dot--2 {
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.notice-choices__dot--3 {
    right: 26px;
  }
}

.notice-choices__icon {
  width: 100%;
  height: 100%;
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
