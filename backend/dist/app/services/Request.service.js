"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const sequelize_1 = require("sequelize");
const Request_model_1 = require("../models/Request.model");
class RequestService {
    createRequest(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRequest = yield Request_model_1.Request.create({
                userId,
                name: ' ',
            }, { returning: true });
            return userRequest;
        });
    }
    getUserRequestTransactionsByUserId(userId, dbContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT DISTINCT t.*
            FROM transactions as t
            JOIN request_transactions as rt ON rt."transactionId" = t.id
            JOIN requests as r ON rt."requestId" = r.id
            WHERE r."userId" = :userId;
        `;
            const transactions = yield dbContext.query(query, {
                replacements: { userId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            return transactions;
        });
    }
}
exports.RequestService = RequestService;
