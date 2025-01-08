"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleFactory = exports.Role = void 0;
const sequelize_1 = require("sequelize");
// Define Role model
class Role extends sequelize_1.Model {
    static associate(models) {
        Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
    }
}
exports.Role = Role;
const RoleFactory = (sequelize) => {
    Role.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
    });
    return Role;
};
exports.RoleFactory = RoleFactory;
