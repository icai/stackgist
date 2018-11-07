import { md5 } from '../utils/crypto';
import { rand } from '../utils/random';
import * as qs from 'qs';

export const makeGravatar = (email, args = {} as any) => {
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
  // if (truethis.ctx.isSsl()) {
  //   $url = `https://secure.gravatar.com/avatar/${emailHash}`;
  // } else {
  // }
  $url = `http://${gravatarServer}.gravatar.com/avatar/${emailHash}`;

  const query = qs.stringify(urlArgs, { encode: false });
  return $url + (query ? `?${query}` : '');
};
