const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection.js");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    },
    bid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "blog",
        key: "id"
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment"
  }
);

module.exports = Comment;