const withCss = require('@zeit/next-css')
const config = require('./config')
const withBundleAnalyze = require('@zeit/next-bundle-analyzer')

if(typeof require !== undefined) {
  require.extensions['.css'] = file => {}
}

const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize`
const SCOPE = 'user'


module.exports = withBundleAnalyze(
  withCss({
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`
  },
  analyzeBrowser: ['browser','both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzeConfig: {
    server: {
      analyzeModule: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzeModule: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
}))