/* jshint indent: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('wp_oauth_dingding', {
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
      allowNull: true
    },
    dingId: {
      type: DataTypes.STRING(64),
      allowNull: true
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
    }
  }, {
    tableName: 'wp_oauth_dingding',
    indexes: [{
      fields: [{
        attribute: 'unionid'
      }],
      name: 'unionid_unique',
      unique: true
    }, {
      fields: [{
        attribute: 'user_id'
      }],
      name: 'user_id_unique',
      unique: true
    }]
  });
  Model.associate = function (models) {
    Model.belongsTo(app.model.WpUsers, { foreignKey: 'user_id' })
  }

  return Model;
};