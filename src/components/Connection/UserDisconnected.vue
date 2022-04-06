<template>
  <div class="userDisconnected">
    <p>Utilisateur déconnecter</p>
  </div>
</template>

<script>
export default {
  name: 'UserDisconnected'
}
</script>

<style lang="scss" scoped>
.userDisconnected {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  min-height: 180px;
  color: white;
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
    background: red;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    content: '';
    background: rgba(0, 0, 0, 0.4);
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
