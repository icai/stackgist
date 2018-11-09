
const assert = require('assert');
const SvgCaptcha = require('./lib/svgcaptcha');


export default app => {
    app.captcha = new SvgCaptcha(app);
    assert(app.config.coreMiddleware.includes('session'), '[egg-captcha] session middleware must exists');
};