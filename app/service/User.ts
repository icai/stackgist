import { Service } from 'egg';
import { nowISO } from '../utils/datetime';
import { md5 } from '../utils/crypto';
import { rand, randomString } from '../utils/random';
import qs from 'qs';
/**
 * User Service
 */
export default class User extends Service {
  /**
   * find
   */
  public async find() {
    return this.ctx.user;
  }
  /**
   * 生成用户头像
   * @param email 用户email
   * @param args url 参数
   */
  public makeGravatar(email, args = {} as any) {
    args = Object.assign(
      {
        size: 96,
        default: 'mystery',
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
    if (this.ctx.isSsl()) {
      $url = `https://secure.gravatar.com/avatar/${emailHash}`;
    } else {
      $url = `http://${gravatarServer}.gravatar.com/avatar/${emailHash}`;
    }
    const query = qs.stringify(urlArgs);
    return $url + (query ? `?${query}` : '');
  }

  public getGravatar(user) {
    return user.avatar || this.makeGravatar(user.email);
  }
  /**
   *  创建注册用户信息
   * @param param0 用户信息
   */
  public async createRegisterUser({ userName, password }) {
    const { app, ctx } = this;
    const { WpUsers } = app.model;
    const pass = ctx.helper.bhash(password);
    const sysuser = await WpUsers.create(
      {
        user_login: userName,
        user_pass: pass,
        user_nicename: userName,
        user_email: userName,
        user_url: '',
        user_registered: nowISO(),
        display_name: userName
      },
      { isNewRecord: true }
    );
    return sysuser;
  }

  /**
   * 登录校验
   * @param param0 登录校验
   */
  public async validateLocalCredit({ username, password }) {
    const { ctx } = this;
    const getUser = pusername => {
      if (pusername.indexOf('@') > 0) {
        return ctx.service.user.getUserByMail(pusername);
      }
      return ctx.service.user.getUserByLoginName(pusername);
    };
    const existUser = await getUser(username);
    if (!existUser) {
      return null;
    }
    const passhash = existUser.user_pass;
    const equal = ctx.helper.bcompare(password, passhash);
    // 密码不匹配
    if (!equal) {
      return null;
    }

    return existUser;
  }
  /**
   * 根据用户邮件获取用户model
   * @param email 邮件
   */
  public async getUserByMail(email) {
    const { app } = this;
    const { WpUsers } = app.model;
    return await WpUsers.findOne({
      where: {
        user_email: email
      },
      raw: true
    });
  }
  /**
   * 根据登陆名字获取用户model
   * @param username 用户名
   */
  public async getUserByLoginName(username) {
    const { app } = this;
    const { WpUsers } = app.model;
    return await WpUsers.findOne({
      where: {
        user_login: username
      },
      raw: true
    });
  }
  /**
   * 根据weibo ID 获取用户model
   * @param id weiboid
   */
  public async getUserByWeiboId(id) {
    const { app } = this;
    const { WpUsers, WpOauthWeibo } = app.model;
    return await WpUsers.findOne({
      include: [
        {
          attributes: [],
          model: WpOauthWeibo,
          require: true,
          where: {
            id
          }
        }
      ],
      raw: true
    });
  }
  /**
   * 根据微博返回信息创建用户
   * @param res weibo 返回收据
   */
  public async createUserByWeiboInfo(res) {
    const { profile } = res;
    const { app, ctx } = this;
    const { WpUsers, WpOauthWeibo } = app.model;
    let weibouser = await WpOauthWeibo.findOne({
      attributes: ['id', 'user_id'],
      where: {
        id: profile.id
      }
    });
    let sysuser;
    if (weibouser) {
      sysuser = await WpUsers.findOne({
        where: {
          id: weibouser.user_id
        }
      });
    } else {
      const mdata = profile._json;
      const pass = ctx.helper.bhash(randomString(12));
      // 创建主表
      sysuser = await WpUsers.create(
        {
          user_login: 'w_' + mdata.id,
          user_pass: pass,
          user_nicename: profile.displayName,
          user_email: '',
          user_url: 'https://weibo.com/' + mdata.profile_url,
          user_registered: nowISO(),
          display_name: profile.displayName
        },
        { isNewRecord: true }
      );
      weibouser = await WpOauthWeibo.create({
        id: profile.id,
        user_id: sysuser.id,
        uid: mdata.weihao,
        last_update: mdata.status.created_at,
        nickname: profile.displayName,
        gender: mdata.gender,
        description: mdata.description,
        profile_url: mdata.profile_url,
        location: mdata.location,
        province: mdata.province,
        city: mdata.city,
        img: res.photo
      });
    }
    delete sysuser.user_pass;
    return sysuser;
  }
  /**
   * 根据github ID 获取用户model
   * @param id github id
   */
  public async getUserByGithubId(id) {
    const { app } = this;
    const { WpUsers, WpOauthGithub } = app.model;
    return await WpUsers.findOne({
      include: [
        {
          attributes: [],
          model: WpOauthGithub,
          require: true,
          where: {
            id
          }
        }
      ],
      raw: true
    });
  }
  /**
   * 根据Github返回信息创建用户
   * @param res Github 返回收据
   */
  public async createUserByGithubInfo(res) {
    const { profile } = res;
    const { app, ctx } = this;
    const { WpUsers, WpOauthGithub } = app.model;
    const email =
      profile.emails && profile.emails[0] && profile.emails[0].value;
    const githubuser = await WpOauthGithub.findOne({
      attributes: ['id', 'user_id'],
      where: {
        id: profile.id
      }
    });
    let sysuser = await WpUsers.findOne({
      where: {
        user_email: email
      }
    });
    if (!sysuser) {
      const pass = ctx.helper.bhash(randomString(12));
      // 创建主表
      sysuser = await WpUsers.create(
        {
          user_login: email,
          user_pass: pass,
          user_nicename: profile.name,
          user_email: email,
          user_url: profile.profileUrl,
          user_registered: nowISO(),
          display_name: profile.displayName
        },
        { isNewRecord: true }
      );
    }
    if (!githubuser) {
      await WpOauthGithub.create({
        id: profile.id,
        _id: profile.id,
        user_id: sysuser.id,
        nicename: profile.nicename,
        avatar_url: res.photo,
        html_url: profile.url,
        company: profile._json.company,
        blog: profile._json.blog,
        email: profile._json.email,
        bio: profile._json.bio,
        login: profile._json.login,
        last_update: profile._json.updated_at
      });
    }
    delete sysuser.user_pass;
    return sysuser;
  }
}
