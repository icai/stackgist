require('dotenv').config();
// const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const cssLoaderConfig = require('@zeit/next-css/css-loader-config');
const NODE_ENV = process.env.NODE_ENV;


// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = (file) => {}
// }

// const withLess = require('./next.less.config.js')

module.exports = withLess(withSass(withCSS({
  webpack(config, options) {
    config.plugins = config.plugins || [];

    const { dev, isServer } = options;
    const postcssLoaderOptions = {};

    // Do not run type checking twice:
    // https://github.com/Realytics/fork-ts-checker-webpack-plugin#options
    //
    if (options.isServer)
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: path.resolve('./client/tsconfig.json')
        })
      );

    config.resolve = config.resolve || {};
    config.resolve.alias['dva'] = 'dva-no-router';
    config.resolve.alias['@'] = path.resolve('./client');
    config.resolve.alias['umi'] = path.resolve('./client/umi');
    config.resolve.alias['layouts'] = path.resolve('./client/layouts');
    config.resolve.alias['layout'] = path.resolve('./client/layout');
    config.resolve.alias['assets'] = path.resolve('./client/assets');
    config.resolve.alias['components'] = path.resolve('./client/components');
    config.resolve.alias['ui'] = path.resolve('./client/ui/index');
    config.resolve.alias['hoc'] = path.resolve('./client/hoc');
    config.resolve.alias['utils'] = path.resolve('./client/utils');
    config.resolve.alias['libs'] = path.resolve('./client/libs');
    config.resolve.alias['interfaces'] = path.resolve('./client/interfaces');
    config.resolve.alias['actions'] = path.resolve('./client/actions');

    // config env variable
    // examle <div>{ process.env.TEST }</div>
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: NODE_ENV
          ? path.join(__dirname, `.env.${NODE_ENV}`)
          : path.join(__dirname, `.env`),
        systemvars: true
      })
    ];

    // config.module.rules.push({
    //   test: /\.(gif|jpg|png|svg)$/,
    //   use: [{
    //     loader: 'file-loader',
    //     options: {
    //       context: '',
    //       emitFile: true,
    //       name: '[path][name].[hash].[ext]'
    //     }
    //   }]
    // })

    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //   loader: 'url-loader',
    //   options: {
    //     limit: 10000,
    //     publicPath: '../images/',
    //     outputPath: 'static/images/',
    //     name: '[name].[hash].[ext]'
    //   }
    // });

  
    // config.module.rules.push({
    //   test: /\.css$/,
    //   loader: 'px2rem-loader',
    //   options: {
    //     remUni: 75,
    //     remPrecision: 8
    //   }
    // })

    return config;
  },
  cssModules: true,
  lessLoaderOptions: {
    cssModules: true,
    javascriptEnabled: true
  },
  distDir: "../app/view",
  target: 'serverless'
})))