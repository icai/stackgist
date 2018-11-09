import { md5 } from '../utils/crypto';
import { rand } from '../utils/random';
import * as qs from 'qs';

export default {
  isSsl() {
    const me = this as any;
    // https://github.com/koajs/koa/blob/master/docs/api/request.md
    const protocol = me.request.protocol;
    if ( protocol === 'https') {
       return true;
    }
    return false;
  },
  makeGravatar (email, args = {} as any){
    const me = this as any;
    args = Object.assign(
      {
        size: 96,
        default: 'mystery'
        // forceDefault: false
      },
      args
    );
    let $url = '';
    const emailHash = md5(email);
    let gravatarServer = 0;
    // 随机服务器
    if (emailHash) {
      args.foundAvatar = true;
      gravatarServer = parseInt(emailHash[0], 16) % 3;
    } else {
      gravatarServer = rand(0, 2);
    }
    switch (args.default) {
      case 'mm':
      case 'mystery':
      case 'mysteryman':
        args.default = 'mm';
        break;
      case 'gravatar_default':
        args.default = false;
        break;
      default:
        args.default = 'mm';
    }
    const urlArgs = {
      s: args.size,
      d: args.default,
      // f: args.forceDefault ? 'y' : false,
      r: args.rating
    };
    if (me.isSsl()) {
      $url = `https://secure.gravatar.com/avatar/${emailHash}`;
    } else {
      $url = `http://${gravatarServer}.gravatar.com/avatar/${emailHash}`;
    }
    const query = qs.stringify(urlArgs, { encode: false });
    return $url + (query ? `?${query}` : '');
  },
  success({ message =  'Request ok', code = 200, ...rest } = {} as any) {
    const me = this as any;
    me.status = code;
    me.body = Object.assign({success: true, message }, rest);
  },
  fail({ message = 'Request error', code = 200, ...rest } = {} as any) {
    const me = this as any;
    me.status = code;
    me.body = Object.assign({ success: false, message }, rest);
  }
};
