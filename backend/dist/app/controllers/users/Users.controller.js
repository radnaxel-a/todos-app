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
exports.UsersController = void 0;
const Routes_enum_1 = require("../../config/Routes.enum");
const Method_enum_1 = require("../../interfaces/Method.enum");
const User_model_1 = require("../../models/User.model");
const Controller_1 = require("../Controller");
class UsersController extends Controller_1.Controller {
    constructor() {
        super(Routes_enum_1.Routes.Users);
    }
    [Method_enum_1.Method.GET_BY_ID](request, response) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    [Method_enum_1.Method.GET](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield User_model_1.User.findAll();
            response.send(res);
        });
    }
    [Method_enum_1.Method.POST](request, response) {
        response.send('users post ' + request.params.uid);
    }
    [Method_enum_1.Method.PUT](request, response) {
        response.send('users put ' + request.params.uid);
    }
    [Method_enum_1.Method.DELETE](request, response) {
        response.send('users delete ' + request.params.uid);
    }
}
exports.UsersController = UsersController;
