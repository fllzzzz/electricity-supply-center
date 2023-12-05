const {resolve } = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@fonts": "@/assets/fonts",
        "@image": "@/assets/image",
        "@styles": "@/assets/styles",
        "@videos": "@/assets/videos",
      }
    }
  }
})
