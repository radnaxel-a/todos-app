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
exports.TransactionsService = void 0;
const ethers_1 = require("ethers");
const Transacation_model_1 = require("../models/Transacation.model");
const Request_service_1 = require("./Request.service");
const RequestTransaction_service_1 = require("./RequestTransaction.service");
class TransactionsService {
    constructor() {
        this.providerUrl = process.env.RPC_PROVIDER_URL;
        this.provider = new ethers_1.ethers.JsonRpcProvider(this.providerUrl);
        this.userRequestService = new Request_service_1.RequestService();
        this.requestTransactionService = new RequestTransaction_service_1.RequestTransactionService();
    }
    getTransactions(hashes, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRequest = yield this.userRequestService.createRequest(userId);
            const transactions = [];
            let hashesToCheck = hashes;
            if (!Array.isArray(hashes)) {
                hashesToCheck = hashes.split(',');
            }
            for (const hash of hashesToCheck) {
                const existingTransaction = yield this.getTransactionFromDb(hash);
                if (existingTransaction) {
                    transactions.push(existingTransaction);
                    yield this.requestTransactionService.createRequestTransaction(userRequest.id, existingTransaction.id);
                    continue;
                }
                const transaction = yield this.getTransactionFromBlockChain(hash);
                transactions.push(transaction);
                yield this.requestTransactionService.createRequestTransaction(userRequest.id, transaction.id);
            }
            return transactions;
        });
    }
    getTransactionFromBlockChain(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.provider.getTransaction(hash);
            if (!transaction) {
                return null;
            }
            const receipt = yield (transaction === null || transaction === void 0 ? void 0 : transaction.wait());
            const dbTransaction = yield this.createTransaction(transaction, receipt);
            return dbTransaction;
        });
    }
    getTransactionFromDb(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield Transacation_model_1.Transaction.findOne({
                where: {
                    transactionHash: hash,
                },
            });
            return transaction;
        });
    }
    createTransaction(transaction, receipt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Transacation_model_1.Transaction.create({
                transactionHash: transaction.hash,
                blockHash: transaction.blockHash,
                blockNumber: transaction.blockNumber,
                from: transaction.from,
                to: transaction.to,
                value: transaction.value,
                contractAddress: receipt.contractAddress,
                status: receipt.status,
                logsCount: receipt.logs.length,
            }, {
                returning: true,
            });
        });
    }
}
exports.TransactionsService = TransactionsService;
