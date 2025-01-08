"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFactory = exports.Transaction = void 0;
const sequelize_1 = require("sequelize");
const Request_model_1 = require("./Request.model");
const RequestTransaction_model_1 = require("./RequestTransaction.model");
// Define the Transaction model
class Transaction extends sequelize_1.Model {
    // Association methods
    static associate() {
        Transaction.belongsToMany(Request_model_1.Request, {
            through: RequestTransaction_model_1.RequestTransaction,
            foreignKey: 'transactionId',
        });
    }
}
exports.Transaction = Transaction;
const TransactionFactory = (sequelize) => {
    Transaction.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        transactionHash: {
            type: sequelize_1.DataTypes.STRING(66),
            allowNull: false,
            unique: true,
        },
        blockNumber: {
            type: sequelize_1.DataTypes.BIGINT,
        },
        blockHash: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        from: {
            type: sequelize_1.DataTypes.STRING(42),
            allowNull: false,
        },
        to: {
            type: sequelize_1.DataTypes.STRING(42),
        },
        value: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        contractAddress: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        status: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        logsCount: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: 'transaction',
        timestamps: true,
    });
};
exports.TransactionFactory = TransactionFactory;
// Initialize the Transaction model
