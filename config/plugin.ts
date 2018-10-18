import { EggPlugin } from 'egg';

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

export default plugin;
