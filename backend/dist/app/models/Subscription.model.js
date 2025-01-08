"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionFactory = exports.Subscription = void 0;
const sequelize_1 = require("sequelize");
// Define Subscription model
class Subscription extends sequelize_1.Model {
    static associate(models) {
        Subscription.hasMany(models.User, {
            foreignKey: "subscriptionId",
            as: "users",
        });
    }
}
exports.Subscription = Subscription;
const SubscriptionFactory = (sequelize) => {
    Subscription.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        duration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false, // Duration in days
        },
    }, {
        sequelize,
        modelName: "Subscription",
        tableName: "subscriptions",
    });
    return Subscription;
};
exports.SubscriptionFactory = SubscriptionFactory;
