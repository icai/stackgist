/* jshint indent: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('wp_oauth_wechat', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true
    },
    op_openid: {
      type: DataTypes.STRING(64),
      allowNull: true,
      unique: true
    },
    mp_openid: {
      type: DataTypes.STRING(64),
      allowNull: true,
      unique: true
    },
    unionid: {
      type: DataTypes.STRING(64),
      allowNull: true,
      unique: true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uid: {
      type: DataTypes.STRING(64),
      allowNull: true,
      unique: true
    }
  }, {
    tableName: 'wp_oauth_wechat',
    indexes: [{
      fields: [{
        attribute: 'op_openid'
      }],
      name: 'op_openid_unique',
      unique: true
    }, {
      fields: [{
        attribute: 'user_id'
      }],
      name: 'user_id_unique',
      unique: true
    }, {
      fields: [{
        attribute: 'mp_openid'
      }],
      name: 'mp_openid_unique',
      unique: true
    }, {
      fields: [{
        attribute: 'unionid'
      }],
      name: 'unionid_unique',
      unique: true
    }, {
      fields: [{
        attribute: 'uid'
      }],
      name: 'uid_unique',
      unique: true
    }]
  });
  Model.associate = function () {

  }

  return Model;
};