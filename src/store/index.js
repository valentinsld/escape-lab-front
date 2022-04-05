import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATIONS, STATE, STATE_SCREEN } from '@/store/helpers'

Vue.use(Vuex)

export const state = {
  [STATE.windowH]: window.innerHeight,
  [STATE.windowW]: window.innerWidth,
  [STATE.myState]: 0,
  [STATE.stateScreen]: !/iPhone|iPod|Android/i.test(navigator.userAgent)
    ? STATE_SCREEN.mainScreen
    : STATE_SCREEN.player,
  [STATE.socketID]: null,
  [STATE.idRoom]: null,
  [STATE.listUsers]: {}
}

export const mutations = {
  [MUTATIONS.windowH](state) {
    state[STATE.windowH] = window.innerHeight
  },
  [MUTATIONS.windowW](state) {
    state[STATE.windowW] = window.innerWidth
  },
  [MUTATIONS.myState](state, newVal) {
    state[STATE.myState] = newVal
  },

  [MUTATIONS.stateScreen](state, newVal) {
    state[STATE.stateScreen] = newVal
  },

  [MUTATIONS.socketID](state, newVal) {
    state[STATE.socketID] = newVal
  },
  [MUTATIONS.idRoom](state, newVal) {
    state[STATE.idRoom] = newVal
  },
  [MUTATIONS.listUsers](state, newVal) {
    state[STATE.listUsers] = newVal
  }
}
export const getters = {}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})
