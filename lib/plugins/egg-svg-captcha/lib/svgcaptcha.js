const svgCaptcha = require('svg-captcha');

class SvgCaptcha {
  constructor(app) {
    this.app = app;
  }

  getName(name) {
    return 'scaptcha_' + name;
  }
  getCache(ctx, scopeName = 'cd') {
    const name = this.getName(scopeName);
    return ctx.session[name];
  }
  /**
   *  captcha.useCaptcha(‘login’, {
   *      useMath: true,
   *      ...options
   *  })
   */
  useCaptcha(scopeName = 'cd', options = {}) {
    const me = this;
    if( typeof scopeName ==  'object') {
      options = scopeName;
      scopeName = 'cd';
    }
    const useMath = options.useMath || false;
    if (options.useMath) {
      delete options.useMath;
    }
    // global config
    const conf = this.app.config.svgCaptcha;
    options = Object.assign(
      {
        width: 150,
        height: 40,
        fontSize: 50,
        color: true,
        noise: 5
      },
      conf,
      options
    );
    const name = me.getName(scopeName);
    return async function(ctx, next) {
      let cap;
      if (!useMath) {
        cap = svgCaptcha.create(options);
      } else {
        cap = svgCaptcha.createMathExpr(options);
      }
      ctx.session[name] = cap.text;
      ctx.body = cap.data;
      ctx.type = 'svg';
    };
  }
}

module.exports = SvgCaptcha;
