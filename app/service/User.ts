import { Service } from 'egg';
import { nowISO } from '../utils/datetime';
import { randomString } from '../utils/random';
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

    const passhash = ctx.helper.bhash(existUser.user_pass); // existUser.user_pass
    const equal = ctx.helper.bcompare(password, passhash);
    // 密码不匹配
    if (!equal) {
      return null;
    }

    return existUser;
  }

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
   * weibo
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

  public async createUserByWeiboInfo(res) {
    const { profile } = res;
    const { app } = this;
    const { WpUsers, WpOauthWeibo } = app.model;
    let weibouser = await WpOauthWeibo.findOne({
      attributes: ['id', 'user_id'],
      where: {
        id: profile.id
      }
    });
    let sysuser;
    if(weibouser) {
      sysuser = await WpUsers.findOne({
        where: {
          id: weibouser.user_id
        }
      });
    } else {
      const mdata = profile._json;
      const pass = randomString(12); // ctx.helper.bhash(randomString(12));
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

  // select user.* from wp_users user
  // inner join wp_oauth_github github
  // on user.id = github.user_id
  // where github.id = 1 LIMIT 1;
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

  public async createUserByGithubInfo(res) {
    const { profile } = res;
    const { app } = this;
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
      const pass = randomString(12); // ctx.helper.bhash(randomString(12));
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
