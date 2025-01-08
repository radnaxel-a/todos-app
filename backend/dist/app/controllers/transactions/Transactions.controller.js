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
exports.TransactionsController = void 0;
const ethers_1 = require("ethers");
const Routes_enum_1 = require("../../config/Routes.enum");
const Method_enum_1 = require("../../interfaces/Method.enum");
const Transactions_service_1 = require("../../services/Transactions.service");
const Controller_1 = require("../Controller");
class TransactionsController extends Controller_1.Controller {
    constructor() {
        super(Routes_enum_1.Routes.Transactions);
        this.transactionService = new Transactions_service_1.TransactionsService();
    }
    [Method_enum_1.Method.GET_BY_ID](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.params.rpl) {
                response.status(400).send({ message: 'Rlp is required' });
                return;
            }
            try {
                const currentUser = yield this.getUser();
                const decodedHashes = ethers_1.ethers.decodeRlp(request.params.rpl);
                const transactions = yield this.transactionService.getTransactions(decodedHashes, currentUser.id);
                response.status(200).send({ transactions });
            }
            catch (error) {
                response.status(500).send({ message: 'Something went wrong' });
            }
        });
    }
    [Method_enum_1.Method.GET](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashes = request.query.transactionHashes;
            if (!request.query.transactionHashes) {
                response.status(400).send({ message: 'transactionHashes is requared' });
                return;
            }
            try {
                const currentUser = yield this.getUser();
                const transactions = yield this.transactionService.getTransactions(hashes, currentUser.id);
                response.status(200).send({ transactions });
            }
            catch (error) {
                response.status(500).send({ message: 'Something went wrong.' });
            }
        });
    }
    [Method_enum_1.Method.POST](request, response) {
        response.status(400).send();
    }
    [Method_enum_1.Method.PUT](request, response) {
        response.status(400).send();
    }
    [Method_enum_1.Method.DELETE](request, response) {
        response.status(400).send();
    }
}
exports.TransactionsController = TransactionsController;
