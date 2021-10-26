"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class List_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(models.List, { foreignKey: "list_id" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  List_items.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      details: DataTypes.STRING,
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "List_items",
    }
  );
  return List_items;
};
