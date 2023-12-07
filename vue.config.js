const {resolve } = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        "@fonts": "@/assets/fonts",
        "@images": "@/assets/images",
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
