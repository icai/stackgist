/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('wp_term_relationships', {
    object_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    term_taxonomy_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    term_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'wp_term_relationships',
    indexes: [{
      fields: [{
        attribute: 'term_taxonomy_id'
      }],
      name: 'term_taxonomy_id'
    }]
  });

  Model.associate = function () {

  }

  return Model;
};