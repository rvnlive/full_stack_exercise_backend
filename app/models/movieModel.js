// const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('favourite_movie', {
    favourite_movie_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    favourite_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'favourite_movie',
    schema: process.env.SCHEMA,
    timestamps: true,
    indexes: [
      {
        name: 'pk_users_favourite_movie_id',
        unique: true,
        fields: [
          { name: 'favourite_movie_id' }
        ]
      }
    ]
  })
}
