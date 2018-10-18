/* jshint indent: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('wp_oauth_qq', {
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
    openid: {
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
    tableName: 'wp_oauth_qq',
    indexes: [{
      fields: [{
        attribute: 'openid'
      }],
      name: 'openid_unique',
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