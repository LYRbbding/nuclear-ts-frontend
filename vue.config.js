const { defineConfig } = require('@vue/cli-service')

console.log(`打包版本号为：${process.env.DEPLOY_VERSION}\n`);

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? `https://cdn.jsdelivr.net/gh/LYRbbding/nuclear-ts-frontend@${process.env.DEPLOY_VERSION}/dist` : '/',
  pages: {
    index: {
      entry: 'src/main.ts',
      title: '四大班核酸统计',
    }
  },
  transpileDependencies: true
})
