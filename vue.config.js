module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/setup/_settings.scss";'
      }
    }
  },
  pwa: {
    name: 'Click Clack',
    themeColor: '#F59535'
  }
}
