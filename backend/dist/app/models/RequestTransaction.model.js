"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTransactionFactory = exports.RequestTransaction = void 0;
const sequelize_1 = require("sequelize");
// Define the creation attributes for the RequestTransaction model
// interface RequestTransactionCreationAttributes
//     extends Optional<RequestTransactionAttributes, 'id' | 'createdAt'> {}
// Define the RequestTransaction model
class RequestTransaction extends sequelize_1.Model {
}
exports.RequestTransaction = RequestTransaction;
const RequestTransactionFactory = (sequelize) => {
    // Initialize the RequestTransaction model
    RequestTransaction.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        requestId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'requests',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        transactionId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'transactions',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'request_transaction',
        timestamps: true,
    });
};
exports.RequestTransactionFactory = RequestTransactionFactory;
