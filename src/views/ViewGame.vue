<template>
  <ViewContainer name="game">
    <p>View Game</p>
    <Enigme3 />
  </ViewContainer>
</template>

<script>
import Enigme3 from '@/components/enigmes/enigme-3/Enigme3'
import ViewContainer from '@/views/ViewContainer'
export default {
  name: 'ViewGame',
  components: { ViewContainer, Enigme3 }
}
</script>

<style lang="scss" scoped></style>
