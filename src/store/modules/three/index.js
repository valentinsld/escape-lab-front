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
  [STATE.popup]: null,
  [STATE.popups]: []
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

      //dispatch(ACTIONS.initPopup)

      resolve()
    })
  },
  [ACTIONS.animate]({ dispatch, state }) {
    window.requestAnimationFrame(() => {
      dispatch(ACTIONS.animate)
    })

    //if (state.popup) state.popup.rotation.y += 0.01
    state.renderer.render(state.scene, state.camera)
  },
  [ACTIONS.initPopup]({ state }, text) {
    let loader = new GLTFLoader()
    loader.load('/assets/models/popup.gltf', (data) => {
      let popup = data.scene
      popup.rotation.set(0, Math.PI * 0.5, 0)
      popup.position.set(0, 0, 0)
      state.popups.push(popup)
      state.scene.add(popup)
      console.log(popup, state.popups, text, 'popup')

      /*let itemCount = 1
      let dummy = new Three.Object3D()
      let childObject = data.scene.children[0]
      let material = childObject.material
      let geometry = childObject.geometry

      let defaultTransform = new Three.Matrix4().multiply(new Three.Matrix4().makeScale(0.96, 18.351, 29.543))
      geometry.applyMatrix4(defaultTransform)

      state.popup = new Three.InstancedMesh(geometry, material, itemCount)
      state.popup.instanceMatrix.setUsage(Three.DynamicDrawUsage)

      for (let i = 0; i < itemCount; i++) {
        dummy.position.copy(new Three.Vector3(i, 0, 0))
        dummy.rotation.copy(new Three.Vector3(0, -Math.PI * 0.5, 0))
        // regarder pour faire un instanced d'un group
        dummy.updateMatrix()
        state.popup.setMatrixAt(i, dummy.matrix)
      }

      state.popup.instanceMatrix.needsUpdate = true
      state.popup.castShadow = true
      state.popup.receiveShadow = true
      state.scene.add(state.popup)
      console.log(data.scene, 'mesh')*/
    })
    state.renderer.render(state.scene, state.camera)
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions
}
