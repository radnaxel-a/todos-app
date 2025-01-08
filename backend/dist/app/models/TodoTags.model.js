"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoTagsFactory = exports.TodoTag = void 0;
const sequelize_1 = require("sequelize");
class TodoTag extends sequelize_1.Model {
    static associate(models) { }
}
exports.TodoTag = TodoTag;
const TodoTagsFactory = (sequelize) => {
    TodoTag.init({
        todoId: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
                model: "todos",
                key: "id",
            },
        },
        tagId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "tags",
                key: "id",
            },
        },
    }, {
        sequelize,
        modelName: "TodoTag",
        tableName: "todo_tags",
    });
    return TodoTag;
};
exports.TodoTagsFactory = TodoTagsFactory;
