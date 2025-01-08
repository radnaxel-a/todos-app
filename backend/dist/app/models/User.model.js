"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = exports.User = void 0;
const sequelize_1 = require("sequelize");
// Define User model
class User extends sequelize_1.Model {
    static associate(models) {
        // User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
        // User.belongsTo(models.Subscription, {
        //     foreignKey: 'subscriptionId',
        //     as: 'subscription',
        // });
    }
}
exports.User = User;
const UserFactory = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        freeRequests: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        subscriptionId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: true,
        },
        roleId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
    });
    return User;
};
exports.UserFactory = UserFactory;
