const withPWA = require('next-pwa')


// used to file change hot reloading when running inside a container
module.exports = withPWA({
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  pwa: { dest: 'public'}
});
