// passportLocal config
const passportLocal = {
  // usernameField: 'username',
  // passwordField: 'password',
};

const passportGithub = {
  key: '123',
  secret: '123'
};

const passportWeibo = {
  key: '123',
  secret: '123'
};

// 邮箱配置
const mailOpts = {
  host: 'smtp.126.com',
  port: 25,
  auth: {
    user: 'club@126.com',
    pass: 'club'
  },
  ignoreTLS: true
};

export default {
  mailOpts,
  passportLocal,
  passportGithub,
  passportWeibo
};
