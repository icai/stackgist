import { EggPlugin } from 'egg';
import * as path from 'path';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks'
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  }
};
plugin.passport = {
  enable: true,
  package: 'egg-passport'
};
plugin.passportLocal = {
  enable: true,
  package: 'egg-passport-local'
};
plugin.passportGithub = {
  enable: true,
  package: 'egg-passport-github'
};

plugin.passportWeibo = {
  enable: true,
  package: 'egg-passport-weibo'
};

plugin.redis = {
  enable: true,
  package: 'egg-redis'
};

plugin.nextview = {
  enable: true,
  path: path.join(__dirname, '../lib/plugins/egg-view-nextjs')
};

plugin.routerPlus = {
  enable: true,
  package: 'egg-router-plus'
};

export default plugin;
