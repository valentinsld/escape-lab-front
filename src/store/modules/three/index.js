import * as Three from 'three'
import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, MUTATIONS, STATE } from '@/store/modules/three/helpers'

Vue.use(Vuex)

export const state = {
  [STATE.camera]: null,
  [STATE.scene]: null,
  [STATE.renderer]: null,
  [STATE.meshGame1]: null,
  [STATE.meshGame2]: null,
  [STATE.meshGame3]: null
}

export const mutations = {
  [MUTATIONS.initCam](state) {
    state[STATE.camera] = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
    state[STATE.camera].position.z = 1
  }
}

export const actions = {
  [ACTIONS.initScene]({ state, commit }, { width, height, el }) {
    return new Promise((resolve) => {
      commit(MUTATIONS.initCam)

      state.scene = new Three.Scene()

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      let material = new Three.MeshNormalMaterial()

      state.meshGame1 = new Three.Mesh(geometry, material)
      state.meshGame1.position.set(-0.5, 0, 0)
      state.scene.add(state.meshGame1)

      state.meshGame2 = new Three.Mesh(geometry, material)
      state.meshGame2.position.set(0, 0, 0)
      state.scene.add(state.meshGame2)

      state.meshGame3 = new Three.Mesh(geometry, material)
      state.meshGame3.position.set(0.5, 0, 0)
      state.scene.add(state.meshGame3)

      state.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true })
      state.renderer.setSize(width, height)

      el.appendChild(state.renderer.domElement)

      state.renderer.render(state.scene, state.camera)

      resolve()
    })
  },
  [ACTIONS.animate]({ dispatch, state }) {
    window.requestAnimationFrame(() => {
      dispatch(ACTIONS.animate)
    })

    state.meshGame1.rotation.y += 0.001
    state.renderer.render(state.scene, state.camera)
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions
}
