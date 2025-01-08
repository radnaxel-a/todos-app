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
const Method_enum_1 = require("../../interfaces/Method.enum");
const Controller_1 = require("../Controller");
const Transactions_controller_1 = require("./Transactions.controller");
describe('TransactionsController', () => {
    let controller;
    beforeEach(() => {
        controller = new Transactions_controller_1.TransactionsController();
    });
    afterEach(() => {
        sinon_1.default.restore();
    });
    it('Should be able to instance the controller', () => {
        (0, chai_1.expect)(controller).to.exist;
    });
    it('Should be an instance of Controller', () => {
        (0, chai_1.expect)(controller).to.be.instanceOf(Controller_1.Controller);
    });
    it('Should be able to return 400 is rpl is missing ', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const request = { params: {} };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        // Act
        yield controller[Method_enum_1.Method.GET_BY_ID](request, response);
        // Assert
        (0, chai_1.expect)(response.status.calledOnceWith(400)).to.be.true;
        (0, chai_1.expect)(response.send.calledOnceWith({ message: 'Rlp is required' })).to.be.true;
    }));
    it('Should be able to return transactions by by rlp', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const request = {
            params: {
                rpl: '0xf842a06c794f3e474f5ba13c691abb6499b1f0e863e96568c76946d5d2b3a427626fbea05df3dee869b00757560ab86f75d9199db5baf37e0c16206ef47c811fafb4c545',
            },
        };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        sinon_1.default.stub(controller, 'getUser').resolves({ id: '123' });
        sinon_1.default.stub(controller['transactionService'], 'getTransactions').resolves([]);
        // Act
        yield controller[Method_enum_1.Method.GET_BY_ID](request, response);
        // Assert
        (0, chai_1.expect)(response.status.calledOnceWith(200)).to.be.true;
        (0, chai_1.expect)(response.send.called).to.be.true;
    }));
    it('Should be able to return 500 if error occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const request = {
            params: {
                rpl: '0xf842a06c794f3e474f5ba13c691abb6499b1f0e863e96568c76946d5d2b3a427626fbea05df3dee869b00757560ab86f75d9199db5baf37e0c16206ef47c811fafb4c545',
            },
        };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        sinon_1.default.stub(controller, 'getUser').resolves({ id: '123' });
        sinon_1.default.stub(controller['transactionService'], 'getTransactions').throws(new Error('Not good'));
        // Act
        yield controller[Method_enum_1.Method.GET_BY_ID](request, response);
        // Assert
        (0, chai_1.expect)(response.status.calledOnceWith(500)).to.be.true;
        (0, chai_1.expect)(response.send.called).to.be.true;
    }));
    it('Should be able to return transaction by hashes', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const request = {
            query: {
                transactionHashes: '0x3e3ada89145d6adc87658e4ed740691d7a5512ae78beb008e61572e8e585ce4e,0xee2cd68be95b9e60452ac87022fafec483ec7c2161ba22b85972613cb80efa2a',
            },
        };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        sinon_1.default.stub(controller, 'getUser').resolves({ id: '123' });
        sinon_1.default.stub(controller['transactionService'], 'getTransactions').resolves([]);
        // Act
        yield controller[Method_enum_1.Method.GET](request, response);
        // Assert
        (0, chai_1.expect)(response.status.calledOnceWith(200)).to.be.true;
        (0, chai_1.expect)(response.send.called).to.be.true;
    }));
    it('Should be able to return 400  if transaction hashes are not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const request = {
            query: {},
        };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        // Act
        yield controller[Method_enum_1.Method.GET](request, response);
        // Assert
        (0, chai_1.expect)(response.status.calledOnceWith(400)).to.be.true;
        (0, chai_1.expect)(response.send.called).to.be.true;
    }));
    it('Should be able to return 500 if error is thown', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const request = {
            query: {
                transactionHashes: '0x3e3ada89145d6adc87658e4ed740691d7a5512ae78beb008e61572e8e585ce4e,0xee2cd68be95b9e60452ac87022fafec483ec7c2161ba22b85972613cb80efa2a',
            },
        };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        sinon_1.default.stub(controller, 'getUser').resolves({ id: '123' });
        sinon_1.default.stub(controller['transactionService'], 'getTransactions').rejects(new Error('Not good'));
        // Act
        yield controller[Method_enum_1.Method.GET](request, response);
        // Assert
        (0, chai_1.expect)(response.status.calledOnceWith(500)).to.be.true;
        (0, chai_1.expect)(response.send.called).to.be.true;
    }));
});
