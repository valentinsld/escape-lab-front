export const STATE = {
  camera: 'camera',
  scene: 'scene',
  renderer: 'renderer',
  popup: 'popup',
  popups: 'popups',
  duration: 'duration'
}

export const MUTATIONS = {
  initCam: 'M_INIT_CAM',
  setCamPosition: 'M_SET_CAM_POSITION',
  triggerPopup: 'M_TRIGGER_POPUP',
  resetPopup: 'M_RESET_POPUP',
  resizeScene: 'M_RESIZE_SCENE'
}

export const GETTERS = {
  getPopupArrayIndex: 'G_POPUP_INDEX'
}

export const ACTIONS = {
  initScene: 'A_INIT_SCENE',
  initPopup: 'A_INIT_POPUP',
  animatePopupEnter: 'A_ANIMATE_POPUP_ENTER',
  animatePopupLeave: 'A_ANIMATE_POPUP_LEAVE',
  animate: 'A_ANIMATE'
}
