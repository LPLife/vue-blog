'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  proxyTable: {
    'api':{
      target:'http://music.163.com/api',
      changeOrigin:true,
      pathRewrite:{
        '^/api':''
      }
    }
  }
})
