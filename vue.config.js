const { defineConfig } = require('@vue/cli-service')

const DEPLOY_VERSION = '1.1.3-221130'

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? `https://cdn.jsdelivr.net/gh/LYRbbding/nuclear-ts-frontend@${DEPLOY_VERSION}/dist` : '/',
  pages: {
    index: {
      entry: 'src/main.ts',
      title: '四大班核酸统计',
    }
  },
  transpileDependencies: true
})
