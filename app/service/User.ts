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

  // select user.* from wp_users user
  // inner join wp_oauth_github github
  // on user.ID = github.user_id
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
      // attributes: ['id'],
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
