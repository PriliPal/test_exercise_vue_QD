const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "https://prilipal.github.io/test_exercise_vue_QD/" : "/",
  transpileDependencies: true
})
