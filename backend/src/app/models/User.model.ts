import { DataTypes, Model, Sequelize, Optional } from "sequelize";

// Define User attributes
interface UserAttributes {
    id: string;
    name: string;
    password: string;
    freeRequests: number;
    subscriptionId?: string;
    roleId?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Define User model
export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: string;
    public name!: string;
    public password!: string;
    public freeRequests!: number;
    public subscriptionId?: string;
    public roleId?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        // User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
        // User.belongsTo(models.Subscription, {
        //     foreignKey: 'subscriptionId',
        //     as: 'subscription',
        // });
    }
}

export const UserFactory = (sequelize: Sequelize) => {
    User.init(
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
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            freeRequests: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            subscriptionId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            roleId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
        }
    );

    return User;
};
