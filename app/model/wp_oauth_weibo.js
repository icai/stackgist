/* jshint indent: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('wp_oauth_weibo', {
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
    uid: {
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
    gender: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
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
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'wp_oauth_weibo',
    indexes: [{
      fields: [{
        attribute: 'uid'
      }],
      name: 'uid_unique',
      unique: true
    }, {
      fields: [{
        attribute: 'user_id'
      }],
      name: 'user_id_unique',
      unique: true
    }]
  });
  Model.associate = function () {

  }

  return Model;
};