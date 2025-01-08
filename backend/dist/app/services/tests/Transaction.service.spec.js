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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const Transactions_service_1 = require("../Transactions.service");
const Transacation_model_1 = require("../../models/Transacation.model");
describe('Transaction Service', () => {
    let service;
    beforeEach(() => {
        service = new Transactions_service_1.TransactionsService();
    });
    afterEach(() => {
        sinon_1.default.restore();
    });
    it('Should be able to instance the service', () => {
        (0, chai_1.expect)(service).to.exist;
    });
    it('Should be able to get transactions with hash array if they exist in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const transactionCreateStub = sinon_1.default.stub(Transacation_model_1.Transaction, 'create');
        const transactionFindStub = sinon_1.default.stub(Transacation_model_1.Transaction, 'findOne').resolves({
            id: '123',
        });
        const providerStub = sinon_1.default.stub(service['provider'], 'getTransaction');
        const createRequestStub = sinon_1.default.stub(service['userRequestService'], 'createRequest').resolves({ id: 123 });
        const requestTransactionStub = sinon_1.default.stub(service['requestTransactionService'], 'createRequestTransaction');
        const hashes = ['hashOne', 'hash2'];
        // Act
        yield service.getTransactions(hashes, '123');
        // Assert
        (0, chai_1.expect)(createRequestStub.calledOnce).to.be.true;
    }));
    it('Should be able to get transactions with hash array if they DONT exist in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const transactionCreateStub = sinon_1.default.stub(Transacation_model_1.Transaction, 'create').resolves({
            id: '123',
        });
        const transactionFindStub = sinon_1.default.stub(Transacation_model_1.Transaction, 'findOne').resolves(null);
        const providerStub = sinon_1.default.stub(service['provider'], 'getTransaction').resolves({
            wait: () => {
                return {
                    contractAddress: null,
                    status: 1,
                    logs: [],
                };
            },
        });
        const createRequestStub = sinon_1.default.stub(service['userRequestService'], 'createRequest').resolves({ id: 123 });
        const requestTransactionStub = sinon_1.default.stub(service['requestTransactionService'], 'createRequestTransaction');
        const hashes = ['hashOne', 'hash2'];
        // Act
        yield service.getTransactions(hashes, '123');
        // Assert
        (0, chai_1.expect)(createRequestStub.calledOnce).to.be.true;
    }));
    it('Should be able to get transactions with hash string if they DONT exist in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const transactionCreateStub = sinon_1.default.stub(Transacation_model_1.Transaction, 'create').resolves({
            id: '123',
        });
        const transactionFindStub = sinon_1.default.stub(Transacation_model_1.Transaction, 'findOne').resolves(null);
        const providerStub = sinon_1.default.stub(service['provider'], 'getTransaction').resolves({
            wait: () => {
                return {
                    contractAddress: null,
                    status: 1,
                    logs: [],
                };
            },
        });
        const createRequestStub = sinon_1.default.stub(service['userRequestService'], 'createRequest').resolves({ id: 123 });
        const requestTransactionStub = sinon_1.default.stub(service['requestTransactionService'], 'createRequestTransaction');
        const hashes = 'hashOne,hash2';
        // Act
        yield service.getTransactions(hashes, '123');
        // Assert
        (0, chai_1.expect)(createRequestStub.calledOnce).to.be.true;
    }));
});
