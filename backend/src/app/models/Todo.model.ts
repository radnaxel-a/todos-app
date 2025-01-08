import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface TodoAttributes {
    id: string;
    title: string;
    completed: boolean;
    description: string;
}

export class Todo extends Model<TodoAttributes> implements TodoAttributes {
    public id!: string;
    public title!: string;
    public completed!: boolean;
    public description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Todo.belongsToMany(models.Tag, {
            through: "todo_tags", // Name of the junction table
            foreignKey: "todoId", // Explicitly define the foreign key in the junction table
            otherKey: "tagId", // Define the other key
        });
    }
}

export const TodoFactory = (sequelize: Sequelize) => {
    Todo.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Todo",
            tableName: "todos",
        }
    );

    return Todo;
};
