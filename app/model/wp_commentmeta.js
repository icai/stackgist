/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('wp_commentmeta', {
    meta_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    comment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    meta_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    meta_value: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'wp_commentmeta',
    indexes: [{
      fields: [{
        attribute: 'comment_id'
      }],
      name: 'comment_id'
    }, {
      fields: [{
        attribute: 'meta_key',
        length: 191
      }],
      name: 'meta_key'
    }]
  });

  Model.associate = function () {

  }

  return Model;
};