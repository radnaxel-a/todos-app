"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestFactory = exports.Request = void 0;
const sequelize_1 = require("sequelize");
const RequestTransaction_model_1 = require("./RequestTransaction.model");
const Transacation_model_1 = require("./Transacation.model");
// Define the creation attributes for the Request model
// interface RequestCreationAttributes
//     extends Optional<RequestAttributes, 'id' | 'requestedAt' | 'createdAt' | 'updatedAt'> {}
// Define the Request model
class Request extends sequelize_1.Model {
    // Association methods
    static associate() {
        Request.belongsToMany(Transacation_model_1.Transaction, {
            through: RequestTransaction_model_1.RequestTransaction,
            foreignKey: 'requestId',
        });
    }
}
exports.Request = Request;
const RequestFactory = (sequelize) => {
    // Initialize the Request model
    Request.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        requestedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'request',
        timestamps: true,
    });
};
exports.RequestFactory = RequestFactory;
