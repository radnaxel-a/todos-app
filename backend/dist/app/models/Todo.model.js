"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoFactory = exports.Todo = void 0;
const sequelize_1 = require("sequelize");
class Todo extends sequelize_1.Model {
    static associate(models) {
        Todo.belongsToMany(models.Tag, {
            through: "todo_tags",
            foreignKey: "todoId",
            otherKey: "tagId", // Define the other key
        });
    }
}
exports.Todo = Todo;
const TodoFactory = (sequelize) => {
    Todo.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        completed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Todo",
        tableName: "todos",
    });
    return Todo;
};
exports.TodoFactory = TodoFactory;
