import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATIONS, STATE } from '@/store/helpers'

Vue.use(Vuex)

export const state = {
  [STATE.windowH]: window.innerHeight,
  [STATE.windowW]: window.innerWidth,
  [STATE.myState]: 0
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
  }
}
export const getters = {}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})
