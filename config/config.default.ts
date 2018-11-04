import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import PrivateConif from '../private/config';
import * as path from 'path';

// import * as nextjs from '../next.config';

interface ExtConfig extends PowerPartial<EggAppConfig> {
  keys: any;
  middleware: any;
  sequelize: any;
}

export default (appInfo: EggAppInfo) => {
  const config = {} as ExtConfig;

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
    nextview: {
      dir: './client'
    },
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'stackgist',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: 'root123456'
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
