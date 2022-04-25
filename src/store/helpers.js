export const STATE = {
  windowH: 'windowH',
  windowW: 'windowW',
  myState: 'myState',
  stateScreen: 'stateScreen',
  typeScreen: 'typeScreen',
  socketID: 'socketID',
  idRoom: 'idRoom',
  listUsers: 'listUsers',
  isStart: 'isStart',
  stepGame: 'stepGame',
  playerIsReady: 'playerIsReady',
  // enigme 3
  enigme3Config: 'enigme3Config',
  // THREE
  camera: 'camera',
  scene: 'scene',
  renderer: 'renderer',
  meshGame1: 'meshGame1',
  meshGame2: 'meshGame2',
  meshGame3: 'meshGame3'
}

export const MUTATIONS = {
  windowH: 'M_WINDOW_H',
  windowW: 'M_WINDOW_W',
  myState: 'M_MY_STATE',
  stateScreen: 'M_STATE_SCREEN',
  typeScreen: 'M_TYPE_SCREEN',
  socketID: 'M_SOCKET_ID',
  idRoom: 'M_ID_ROOM',
  listUsers: 'M_LIST_USERS',
  isStart: 'isStart',
  playerIsReady: 'M_PLAYER_IS_READY',
  stepGame: 'M_STEP_GAME',
  resetRoom: 'M_RESET_ROOM',
  // enigme 3
  enigme3Config: 'M_ENIGME_3_CONFIG',
  // THREE
  initCam: 'M_INIT_CAM'
}

export const STATE_SCREEN = {
  mainScreen: 'MainScreen',
  player: 'Player'
}

export const GETTERS = {}

export const ACTIONS = {
  initScene: 'A_INIT_SCENE',
  animate: 'A_ANIMATE'
}
