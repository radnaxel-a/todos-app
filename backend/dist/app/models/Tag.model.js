"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagFactory = exports.Tag = void 0;
const sequelize_1 = require("sequelize");
class Tag extends sequelize_1.Model {
    static associate(models) {
        Tag.belongsToMany(models.Todo, {
            through: "todo_tags",
            foreignKey: "tagId",
            otherKey: "todoId", // Define the other key
        });
    }
}
exports.Tag = Tag;
const TagFactory = (sequelize) => {
    Tag.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Tag",
        tableName: "tags",
    });
    return Tag;
};
exports.TagFactory = TagFactory;
