// const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('favourites', {
    favourite_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'favourites',
    schema: process.env.SCHEMA,
    timestamps: true,
    indexes: [
      {
        name: 'pk_users_favourite_id',
        unique: true,
        fields: [
          { name: 'favourite_id' }
        ]
      }
    ]
  })
}
