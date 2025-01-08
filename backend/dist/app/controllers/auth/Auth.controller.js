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
exports.AuthController = void 0;
const Routes_enum_1 = require("../../config/Routes.enum");
const Method_enum_1 = require("../../interfaces/Method.enum");
const User_model_1 = require("../../models/User.model");
const Auth_service_1 = require("../../services/Auth.service");
const Controller_1 = require("../Controller");
class AuthController extends Controller_1.Controller {
    constructor() {
        super(Routes_enum_1.Routes.Auth);
        this.authService = new Auth_service_1.AuthService();
    }
    [Method_enum_1.Method.GET_BY_ID](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.status(400).send();
        });
    }
    [Method_enum_1.Method.GET](request, response) {
        response.status(400).send();
    }
    [Method_enum_1.Method.POST](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_model_1.User.findOne({
                where: {
                    name: request.body.name,
                },
            });
            if (!user) {
                response.status(400).send({ message: 'Bad credentials' });
                return;
            }
            if (user.password !== request.body.password) {
                response.status(400).send({ message: 'Bad credentials' });
                return;
            }
            const token = this.authService.generateToken(user.id);
            response.status(200).send({ token });
        });
    }
    [Method_enum_1.Method.PUT](request, response) {
        response.status(400).send();
    }
    [Method_enum_1.Method.DELETE](request, response) {
        response.status(400).send();
    }
}
exports.AuthController = AuthController;
