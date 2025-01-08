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
exports.TagsController = void 0;
const Routes_enum_1 = require("../config/Routes.enum");
const Method_enum_1 = require("../interfaces/Method.enum");
const Tag_model_1 = require("../models/Tag.model");
const Controller_1 = require("./Controller");
class TagsController extends Controller_1.Controller {
    constructor() {
        super(Routes_enum_1.Routes.Tags);
    }
    [Method_enum_1.Method.GET_BY_ID](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.status(400).send();
        });
    }
    [Method_enum_1.Method.GET](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield Tag_model_1.Tag.findAll();
            response.status(200).send(tags);
        });
    }
    [Method_enum_1.Method.POST](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, color } = request.body;
            const tag = yield Tag_model_1.Tag.create({
                name,
                color,
            }, {
                returning: true,
            });
            response.status(200).send({ message: "Tag created", tag });
        });
    }
    [Method_enum_1.Method.PUT](request, response) {
        response.status(400).send();
    }
    [Method_enum_1.Method.DELETE](request, response) {
        response.status(400).send();
    }
}
exports.TagsController = TagsController;
