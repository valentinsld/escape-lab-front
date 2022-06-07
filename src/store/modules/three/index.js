import * as Three from 'three'
import { AmbientLight, DirectionalLight } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Text } from 'troika-three-text'
import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, MUTATIONS, STATE } from '@/store/modules/three/helpers'

Vue.use(Vuex)

export const state = {
  [STATE.camera]: null,
  [STATE.scene]: null,
  [STATE.renderer]: null,
  [STATE.popup]: null
}

export const mutations = {
  [MUTATIONS.initCam](state) {
    state[STATE.camera] = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
    state[STATE.camera].position.z = 10
  },
  [MUTATIONS.setCamPosition](state, { x, y, z }) {
    if (state.camera) {
      state.camera.position.set(x, y, z)
    }
  }
}

export const actions = {
  [ACTIONS.initScene]({ state, commit }, { width, height, el }) {
    return new Promise((resolve) => {
      commit(MUTATIONS.initCam)

      state.scene = new Three.Scene()

      let loader = new GLTFLoader()
      loader.load('/assets/models/popup.gltf', (data) => {
        state.popup = data.scene
        state.popup.scale.set(1, 1, 1)
        state.popup.rotation.set(0, Math.PI * 0.5, 0)
        state.popup.position.set(0, 0, 0)
        state.scene.add(state.popup)
        console.log(state.popup, 'popup')
      })

      // Create:
      const myText = new Text()
      state.scene.add(myText)

      // Set properties to configure:
      myText.text = 'Hello world!'
      myText.fontSize = 0.4
      myText.position.z = 1
      myText.color = 0x000000

      // Update the rendering:
      myText.sync()

      let lightA = new DirectionalLight(0xffffff, 1.5)
      lightA.position.set(1, 1, 1)
      state.scene.add(lightA)

      let ambientLight = new AmbientLight(0xffffff, 1.5)
      state.scene.add(ambientLight)

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

    //if (state.popup) state.popup.rotation.y += 0.01
    state.renderer.render(state.scene, state.camera)
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions
}
