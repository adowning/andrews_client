
const path = require('path')
const fs = require('fs')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const SizePlugin = require('size-plugin')
const isProductionEnvFlag = process.env.NODE_ENV === 'production'

module.exports = {
  // open: process.platform === 'darwin',
  pluginOptions: {
    cordovaPath: "src-cordova"
  },
  baseUrl: "",

    devServer: {
  port: 8080,

      proxy: {
        "/api/v2": {
          target: "https://www.humanity.com/"
          //https://www.humanity.com/api/v2/employees?access_token=xxxxxxx
        },
        
      },
      /* eslint-disable-next-line */
      before: app => {}

  },

  chainWebpack: config => {
    // config.resolve.alias
    //   . set ( ' view $ ' , ' view / dist / view.esm.js ' )
    //   .set('@helper', resolveRealPath('src/helper'))
    //   .set('@pages', resolveRealPath('src/pages'))
    //   .set('@assets', resolveRealPath('src/assets'))
    //   .set('@router', resolveRealPath('src/router'))
    //   .set('@mixins', resolveRealPath('src/mixins'))
    //   .set('@components', resolveRealPath('src/components'))

    // remove the old loader & add new one
    config.module.rules.delete('svg')
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        name: '[name]-[hash:7]',
        prefixize: true
      })

    const splitOptions = config.optimization.get('splitChunks')
    config.optimization.splitChunks(
      Object.assign({}, splitOptions, {
        // (default 5) when the maximum demand loading concurrent requests
        maxAsyncRequests: 16,
        // (default 3) the maximum number of concurrent requests on the entry point
        maxInitialRequests :  16,
        // (default: 1) the minimum number of blocks of the shared module before splitting
        minChunks :  1 ,
        // (default: 30000) the minimum size of the block
        minSize: 30000,
        // webpack will use the origin and name of the block to generate the name: `vendors~main.js`, if the item conflicts with "~", it can be modified by this value, Eg: '-'
        automaticNameDelimiter: '~',
        // cacheGroups is an object where keys are the cache group names.
        name: true,
        cacheGroups : {
          default: false,
          common: {
            name: `chunk-common`,
            minChunks :  2 ,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          },
          element: {
            name: 'element',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: 'initial',
            //The default group has a lower priority to allow any custom cache group to have a higher priority (default is 0)
            priority: -30
          }
        }
      })
    )

    // https://github.com/webpack-contrib/webpack-bundle-analyzer
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
configureWebpack: {
  devtool: 'source-map',
  plugins: [
    isProductionEnvFlag
      ? new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, 'dist'),
          // Required - Routes to render.
          routes: ['/', '/explore']
        })
      : () => {},
    isProductionEnvFlag ? new SizePlugin() : () => {},
    // Need Fix 🚧 : HardSourceWebpackPlugin & PWA will conflict.
    !isProductionEnvFlag ? new HardSourceWebpackPlugin() : () => {}
  ]
},

pwa: {
  name: 'AndrewsApp',
  themeColor: '#4DBA87',
  msTileColor: '#000000',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black',
  // iconPaths: {
  //   favicon32: 'img/icons/fuji-mountain-32x32.png',
  //   favicon16: 'img/icons/fuji-mountain-16x16.png',
  //   appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
  //   maskIcon: 'img/icons/safari-pinned-tab.svg',
  //   msTileImage: 'img/icons/msapplication-icon-144x144.png'
  // },
  // configure the workbox plugin (GenerateSW or InjectManifest)
  workboxPluginMode: 'InjectManifest',
  workboxOptions: {
    // swSrc is required in InjectManifest mode.
    swSrc: 'public/service-worker.js'
    // ...other Workbox options...
  }
},

}

