import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import PrivateConif from '../private/config';

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
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    nextrender: {},
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'stackgist',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: 'root123456',
      // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
      baseDir: 'models' // load all files in `app/${baseDir}` as models, default to `model`
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
