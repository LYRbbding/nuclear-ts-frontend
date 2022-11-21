const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? 'https://cdn.jsdelivr.net/gh/LYRbbding/nuclear-ts-frontend@1.0.0-221121/dist' : '/',
  pages: {
    index: {
      entry: 'src/main.ts',
      title: '四大班核酸统计',
    }
  },
  transpileDependencies: true
})
