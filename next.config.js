
const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
// const withPWA = require('next-pwa')

const config = {
  // all your options here
  lessLoaderOptions: {
    javascriptEnabled: true
  }
};

/*
const withLess = require('@zeit/next-less');
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  }
});
*/

module.exports = withPlugins([
  withCSS, 
  withSass, 
  withLess, 
  // withPWA
], config);