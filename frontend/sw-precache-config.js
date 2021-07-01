module.exports = {
  stripPrefix: 'build/',
  minify: true,
  staticFileGlobs: [
    'build/index.html',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  navigateFallback: '/index.html',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js',
  skipWaiting: true
};
