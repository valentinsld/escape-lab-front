module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/setup/_settings.scss";'
      }
    }
  }
}
