import Github from './github';
import Weibo from './weibo';
import Weixin from './weixin';
import QQ from './qq';
import Local from './local';

const instance = {
  github: new Github(),
  weibo: new Weibo(),
  weixin: new Weixin(),
  qq: new QQ(),
  local: new Local()
};

export default (options: any) => {
  const provider = options.provider;
  if (provider && instance[provider]) {
    instance[provider].start(options);
  }
};
