import { Service } from 'egg';
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

  public async getUserByGithubId(id) {
    const { app } = this;
    // select user.* from wp_users user
    // inner join wp_oauth_github github
    // on user.ID = github.user_id
    // where github.id = 1 LIMIT 1;
    const { WpUsers, WpOauthGithub } = app.model;

    // ?? inner join 变成  LEFT OUTER JOIN 了？

    // SELECT `wp_users`.`id`, `wp_users`.`user_login`, `wp_users`.`user_pass`, `wp_users`.`user_nicename`, `wp_users`.`user_email`, `wp_users`.`user_url`, `wp_users`.`user_registered`, `wp_users`.`user_activation_key`, `wp_users`.`user_status`, `wp_users`.`display_name`, `wp_users`.`created_at`, `wp_users`.`updated_at` FROM `wp_users` AS `wp_users`
    // LEFT OUTER JOIN `wp_oauth_github` AS `wp_oauth_github`
    // ON `wp_users`.`id` = `wp_oauth_github`.`user_id`
    // WHERE `wp_oauth_github`.`id` = '1061012' LIMIT 1;

    return await WpUsers.findOne({
      where: {
        '$wp_oauth_github.id$': id
      },
      include: [
        {
          attributes: [],
          model: WpOauthGithub,
          require: true
        }
      ],
      raw: true
    });
  }

/*
{ provider: 'github',
  id: '1061012',
  name: 'icai',
  displayName: 'Terry Cai',
  photo: 'https://avatars2.githubusercontent.com/u/1061012?v=4',
  accessToken: 'xxx',
  refreshToken: undefined,
  params:
   { access_token: 'xxx',
     scope: '',
     token_type: 'bearer' },
  profile:
   { id: '1061012',
     displayName: 'Terry Cai',
     username: 'icai',
     profileUrl: 'https://github.com/icai',
     emails: [ [Object] ],
     photos: [ [Object] ],
     provider: 'github',
     _json:
      { login: 'icai',
        id: 1061012,
        node_id: 's=',
        avatar_url: 'https://avatars2.githubusercontent.com/u/1061012?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/icai',
        html_url: 'https://github.com/icai',
        followers_url: 'https://api.github.com/users/icai/followers',
        following_url: 'https://api.github.com/users/icai/following{/other_user}',
        gists_url: 'https://api.github.com/users/icai/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/icai/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/icai/subscriptions',
        organizations_url: 'https://api.github.com/users/icai/orgs',
        repos_url: 'https://api.github.com/users/icai/repos',
        events_url: 'https://api.github.com/users/icai/events{/privacy}',
        received_events_url: 'https://api.github.com/users/icai/received_events',
        type: 'User',
        site_admin: false,
        name: 'Terry Cai',
        company: null,
        blog: 'https://blog.w3cub.com/',
        location: 'Guangzhou, China',
        email: '',
        hireable: null,
        bio: null,
        public_repos: 134,
        public_gists: 28,
        followers: 47,
        following: 25,
        created_at: '2011-09-19T03:51:52Z',
        updated_at: '2018-10-23T15:11:08Z' }
      } }
  */

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
      // 创建主表
      sysuser = await WpUsers.create(
        {
          user_login: email,
          user_pass: '111111',
          user_nicename: profile.name,
          user_email: email,
          user_url: profile.profileUrl,
          user_registered: '2018-10-14 10:29:00',
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
    return sysuser;
  }
}
