/* indent size: 2 */
import { makeGravatar } from '../utils/helper';

module.exports = (app) => {
  const DataTypes = app.Sequelize;
  

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