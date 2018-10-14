/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('wp_postmeta', {
    meta_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
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
    tableName: 'wp_postmeta'
  });

  Model.associate = function() {

  }

  return Model;
};
