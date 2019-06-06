import { EggAppInfo } from 'egg';
import PrivateConif from '../private/config';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as any;

  config.name = 'Stackgist';

  config.host = 'http://127.0.0.1';

  config.description = 'Stackgist';

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539094118788_6042';

  // add your egg config in here
  config.middleware = ['locals','errorPage']; // 'mockData',

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  const root = [
    // path.join(appInfo.baseDir, 'app/view'),
    path.join(appInfo.baseDir, 'client/pages')
  ];

  const view = {
    root: root.join(','),
    defaultExtension: '.tsx',
    mapping: {
      '.tsx': 'nextview',
      '.jsx': 'nextview',
      '.js': 'nextview',
      '.ts': 'nextview'
    }
  };

  const assets = {
    devServer: {
      command: 'next ./client',
      port: 3000
    },
  };


  const i18n = {
    // 默认语言，默认 "en_US"
    defaultLocale: 'zh-CN',
    // URL 参数，默认 "locale"
    queryField: 'locale',
    // Cookie 记录的 key, 默认："locale"
    cookieField: 'locale',
    // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  };

  // the return config will combines to EggAppConfig
  return {
    view,
    i18n,
    assets,
    nextview: {
      dir: './client'
    },
    sequelize: {
      delegate: 'model',
      baseDir: 'model',
      // logging(...args) {
      //   // if benchmark enabled, log used
      //   const used = typeof args[1] === 'number' ? `[${args[1]}ms]` : '';
      //   app.logger.info('[egg-sequelize]%s %s', used, args[0]);
      // },
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'stackgist',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: 'root123456',
      benchmark: true,
      define: {
        freezeTableName: false,
        underscored: true,
      }
      // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
      // baseDir: 'model' // load all files in `app/${baseDir}` as models, default to `model`
      // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
      // more sequelize options
    },
    redis: {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: 'root123456',
        db: 0
      }
    },
    ...PrivateConif,
    ...config,
    ...bizConfig
  };
};
