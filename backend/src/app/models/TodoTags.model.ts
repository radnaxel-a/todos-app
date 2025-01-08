import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface TodoTagAttributes {
    todoId: string;
    tagId: string;
}

export class TodoTag
    extends Model<TodoTagAttributes>
    implements TodoTagAttributes
{
    public todoId!: string;
    public tagId!: string;

    public readonly createdat!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {}
}

export const TodoTagsFactory = (sequelize: Sequelize) => {
    TodoTag.init(
        {
            todoId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: "todos",
                    key: "id",
                },
            },
            tagId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "tags",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "TodoTag",
            tableName: "todo_tags",
        }
    );

    return TodoTag;
};
