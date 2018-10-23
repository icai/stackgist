// import global from './global';
// import list from './list';
// import login from './login';
// import user from './user';
// import setting from './setting';
// import project from './project';
// const model = [
//     global,
//     list,
//     login,
//     user,
//     setting,
//     project
// ];

// export default model;

export default (app) => {
  app.model({ namespace: 'global', ...require('../models/global.js').default });
  app.model({ namespace: 'list', ...require('../models/list.js').default });
  app.model({ namespace: 'login', ...require('../models/login.js').default });
  app.model({
    namespace: 'project',
    ...require('../models/project.js').default
  });
  app.model({
    namespace: 'setting',
    ...require('../models/setting.js').default
  });
  app.model({ namespace: 'user', ...require('../models/user.js').default });
  app.model({
    namespace: 'register',
    ...require('../pages/User/models/register.js').default
  });
  app.model({
    namespace: 'activities',
    ...require('../pages/Dashboard/models/activities.js').default
  });
  app.model({
    namespace: 'chart',
    ...require('../pages/Dashboard/models/chart.js').default
  });
  app.model({
    namespace: 'monitor',
    ...require('../pages/Dashboard/models/monitor.js').default
  });
  app.model({
    namespace: 'form',
    ...require('../pages/Forms/models/form.js').default
  });
  app.model({
    namespace: 'rule',
    ...require('../pages/List/models/rule.js').default
  });
  app.model({
    namespace: 'profile',
    ...require('../pages/Profile/models/profile.js').default
  });
  app.model({
    namespace: 'error',
    ...require('../pages/Exception/models/error.js').default
  });
  app.model({
    namespace: 'geographic',
    ...require('../pages/Account/Settings/models/geographic.js').default
  });
};
