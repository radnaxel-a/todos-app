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
exports.RequestsController = void 0;
const Routes_enum_1 = require("../../config/Routes.enum");
const Method_enum_1 = require("../../interfaces/Method.enum");
const Request_service_1 = require("../../services/Request.service");
const Controller_1 = require("../Controller");
class RequestsController extends Controller_1.Controller {
    constructor(_dbContext) {
        super(Routes_enum_1.Routes.Requests);
        this.dbContext = _dbContext;
        this.requestService = new Request_service_1.RequestService();
    }
    [Method_enum_1.Method.GET_BY_ID](request, response) {
        response.status(400).send();
    }
    [Method_enum_1.Method.GET](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser();
            try {
                const transactions = yield this.requestService.getUserRequestTransactionsByUserId(user.id, this.dbContext);
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
exports.RequestsController = RequestsController;
