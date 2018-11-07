/* indent size: 2 */
import { md5 } from '../utils/crypto';
import { rand } from '../utils/random';
import * as qs from 'qs';

module.exports = (app) => {
  const DataTypes = app.Sequelize;
  const makeGravatar = (email, args = {}) =>{
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
    // if (truethis.ctx.isSsl()) {
    //   $url = `https://secure.gravatar.com/avatar/${emailHash}`;
    // } else {
    // }
    $url = `http://${gravatarServer}.gravatar.com/avatar/${emailHash}`;
    
    const query = qs.stringify(urlArgs, { encode : false });
    return $url + (query ? `?${query}` : '');
  }

  const Model = app.model.define('wp_users', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_login: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: ''
    },
    user_pass: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    user_nicename: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    user_url: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    user_registered: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:01'
    },
    user_activation_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    user_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    user_avatar: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return makeGravatar(this.get('user_email'))
      }
    },
    display_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'wp_users',
    indexes: [{
      fields: [{
        attribute: 'user_login'
      }],
      name: 'user_login_key'
    }, {
      fields: [{
        attribute: 'user_nicename'
      }],
      name: 'user_nicename'
    }, {
      fields: [{
        attribute: 'user_email'
      }],
      name: 'user_email'
    }]
  });

  Model.associate = function (models) {
    // HasOne and BelongsTo insert the association key in different models from each other. 
    // HasOne inserts the association key in target model 
    // whereas BelongsTo inserts the association key in the source model.
    Model.hasMany(app.model.WpPosts, { foreignKey: 'post_author' })
    Model.hasOne(app.model.WpOauthGithub, { foreignKey: 'user_id' })
    Model.hasOne(app.model.WpOauthWeibo, { foreignKey: 'user_id' })
    Model.hasOne(app.model.WpOauthDingding, { foreignKey: 'user_id' })
    Model.hasOne(app.model.WpOauthQq, { foreignKey: 'user_id' })
    Model.hasOne(app.model.WpOauthWechat, { foreignKey: 'user_id' })
  }

  return Model;
};