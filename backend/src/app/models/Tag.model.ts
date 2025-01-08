import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface TagAttributes {
    id: string;
    name: string;
    color: string;
}

export class Tag extends Model<TagAttributes> implements TagAttributes {
    public id!: string;
    public name!: string;
    public color!: string;

    public readonly createdat!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Tag.belongsToMany(models.Todo, {
            through: "todo_tags", // Name of the junction table
            foreignKey: "tagId", // Explicitly define the foreign key in the junction table
            otherKey: "todoId", // Define the other key
        });
    }
}

export const TagFactory = (sequelize: Sequelize) => {
    Tag.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Tag",
            tableName: "tags",
        }
    );

    return Tag;
};
