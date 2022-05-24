<template>
  <main>
    <img src="images/Et en vrai.png" alt="" />
    <div class="scrolling-wrapper">
      <div class="card">
        <img src="images/card1.png" alt="" />
      </div>
      <div class="card">
        <img src="images/card2.png" alt="" />
      </div>
      <div class="card">
        <img src="images/card3.png" alt="" />
      </div>
      <div class="card">
        <img src="images/card4.png" alt="" />
      </div>
      <div class="card">
        <img src="images/card5.png" alt="" />
      </div>
    </div>
  </main>
</template>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  background-color: #4a6cff;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  margin-top: 100px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.card {
  flex: 0 0 auto;
  margin: 10px;
}

@media screen and (max-width: 640px) {
  main {
    display: block;
  }

  main img {
    width: 400px;
  }

  .card img {
    width: 300px;
  }
}
</style>
