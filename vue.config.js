const {resolve } = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        "@fonts": "@/assets/fonts",
        "@image": "@/assets/image",
        "@styles": "@/assets/styles",
        "@videos": "@/assets/videos",
      }
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@styles/global";`
      }
    }
  },
})
