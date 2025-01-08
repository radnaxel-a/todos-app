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
const Requests_controller_1 = require("./Requests.controller");
describe('RequestsController', () => {
    let controller;
    const sequelize = sinon_1.default.stub();
    beforeEach(() => {
        controller = new Requests_controller_1.RequestsController(sequelize);
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
    it('Should be able to get user transactions', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        sinon_1.default.stub(controller, 'getUser').resolves({
            id: '23',
            name: 'Alex',
        });
        sinon_1.default.stub(controller['requestService'], 'getUserRequestTransactionsByUserId').resolves([]);
        const request = {};
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        // Act
        yield controller[Method_enum_1.Method.GET](request, response);
        // Assert
        (0, chai_1.expect)(response.status.calledOnceWith(200));
        (0, chai_1.expect)(response.send.calledOnceWith([]));
    }));
    it('Should be able to return status 500 on error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        sinon_1.default.stub(controller, 'getUser').resolves({
            id: '23',
            name: 'Alex',
        });
        sinon_1.default.stub(controller['requestService'], 'getUserRequestTransactionsByUserId').throws(new Error('This is a test error'));
        const request = {};
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        // Act
        yield controller[Method_enum_1.Method.GET](request, response);
        // Assert
        (0, chai_1.expect)(response.status.calledOnceWith(500));
        (0, chai_1.expect)(response.send.calledOnceWith({ message: 'Something went wrong.' }));
    }));
});
