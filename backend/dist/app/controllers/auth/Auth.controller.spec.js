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
const User_model_1 = require("../../models/User.model");
const Controller_1 = require("../Controller");
const Auth_controller_1 = require("./Auth.controller");
describe('AuthController', () => {
    let controller;
    beforeEach(() => {
        controller = new Auth_controller_1.AuthController();
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
    it('Should be able to return bad credentials if user is not present', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const findAllStub = sinon_1.default.stub(User_model_1.User, 'findOne').resolves(undefined);
        const request = { body: { name: 'gosho' } };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        // Act
        yield controller[Method_enum_1.Method.POST](request, response);
        // Assert
        (0, chai_1.expect)(findAllStub.called).to.be.true;
        (0, chai_1.expect)(response.status.calledOnceWith(400)).to.be.true;
    }));
    it('Should be able to return bad credentials if user passwords does not match', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const findAllStub = sinon_1.default.stub(User_model_1.User, 'findOne').resolves({
            id: '291',
            name: 'John Doe',
            password: 'strongpass',
        });
        const request = { body: { name: 'John Doe', password: 'notstrongpass' } };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        // Act
        yield controller[Method_enum_1.Method.POST](request, response);
        // Assert
        (0, chai_1.expect)(findAllStub.called).to.be.true;
        (0, chai_1.expect)(response.status.calledOnceWith(400)).to.be.true;
    }));
    it('Should be able to return valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const findAllStub = sinon_1.default.stub(User_model_1.User, 'findOne').resolves({
            id: '291',
            name: 'John Doe',
            password: 'strongpass',
        });
        const request = { body: { name: 'John Doe', password: 'strongpass' } };
        const response = {
            status: sinon_1.default.stub().returnsThis(),
            send: sinon_1.default.stub(),
        };
        // Act
        yield controller[Method_enum_1.Method.POST](request, response);
        // Assert
        (0, chai_1.expect)(findAllStub.called).to.be.true;
        (0, chai_1.expect)(response.status.calledOnceWith(200)).to.be.true;
    }));
});
