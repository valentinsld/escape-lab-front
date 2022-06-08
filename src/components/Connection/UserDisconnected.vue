<template>
  <div class="userDisconnected">
    <p>Utilisateur déconnecté</p>
    <p>
      Pour se reconnecter utilisez le code : <strong>{{ idRoom }}</strong>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { STATE as S } from '@/store/helpers'

export default {
  name: 'UserDisconnected',
  computed: mapState({
    idRoom: (state) => state[S.idRoom]
  })
}
</script>

<style lang="scss" scoped>
.userDisconnected {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  height: auto !important;
  min-height: 180px;
  padding: 20px;
  font-size: 1.1em;
  color: white;
  border: 3px solid var(--color-black);
  border-radius: 25px;
  transform: translate3d(-50%, -50%, 0);

  * {
    z-index: 1;
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: var(--color-red);
    border-radius: 25px;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    content: '';
    background: rgba(0, 0, 0, 0.7);
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
