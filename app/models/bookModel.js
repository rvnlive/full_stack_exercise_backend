// const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('favourite_book', {
    favourite_book_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    favourite_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'favourite_book',
    schema: process.env.SCHEMA,
    timestamps: true,
    indexes: [
      {
        name: 'pk_users_favourite_book_id',
        unique: true,
        fields: [
          { name: 'favourite_book_id' }
        ]
      }
    ]
  })
}
