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
exports.TodosController = void 0;
const sequelize_1 = require("sequelize");
const Routes_enum_1 = require("../config/Routes.enum");
const Method_enum_1 = require("../interfaces/Method.enum");
const Tag_model_1 = require("../models/Tag.model");
const Todo_model_1 = require("../models/Todo.model");
const TodoTags_model_1 = require("../models/TodoTags.model");
const Controller_1 = require("./Controller");
class TodosController extends Controller_1.Controller {
    constructor() {
        super(Routes_enum_1.Routes.Todos);
    }
    [Method_enum_1.Method.GET_BY_ID](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.status(400).send();
        });
    }
    [Method_enum_1.Method.GET](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagIds = request.query.tags;
            const status = request.query.status;
            let options = {
                include: {
                    model: Tag_model_1.Tag,
                },
                order: [["createdAt", "DESC"]],
            };
            if (tagIds) {
                options.include.where = {
                    id: {
                        [sequelize_1.Op.in]: tagIds.split(","),
                    },
                };
            }
            if (status) {
                options.where = {
                    completed: status === "true" ? true : false,
                };
            }
            const tags = yield Todo_model_1.Todo.findAll(options);
            response.status(200).send(tags);
        });
    }
    [Method_enum_1.Method.POST](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const bulkAction = request.query.mark;
            if (bulkAction === "done") {
                yield Todo_model_1.Todo.update({ completed: true }, { where: {} });
                response.status(200).send({ message: "Todo updated" });
                return;
            }
            if (bulkAction === "undone") {
                yield Todo_model_1.Todo.update({ completed: false }, { where: {} });
                response.status(200).send({ message: "Todo updated" });
                return;
            }
            const { title, description, tags } = request.body;
            const todo = yield Todo_model_1.Todo.create({
                title,
                description,
                completed: false,
            }, {
                returning: true,
            });
            for (const tag of tags) {
                yield TodoTags_model_1.TodoTag.create({
                    todoId: todo.id,
                    tagId: tag.id,
                });
            }
            const todoWithTags = yield Todo_model_1.Todo.findByPk(todo.id, {
                include: { model: Tag_model_1.Tag },
            });
            response
                .status(200)
                .send({ message: "Todo created", todo: todoWithTags });
        });
    }
    [Method_enum_1.Method.PUT](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, completed } = request.body;
            const todo = yield Todo_model_1.Todo.update({
                title,
                description,
                completed,
            }, {
                where: {
                    id: request.params.uid,
                },
            });
            response.status(200).send({ message: "Todo updated" });
        });
    }
    [Method_enum_1.Method.DELETE](request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const bulkAction = request.query.all;
            if (bulkAction === "true") {
                const todo = yield Todo_model_1.Todo.destroy({
                    where: {},
                });
                response.status(200).send({ message: "Deleted All todo" });
                return;
            }
            const todo = yield Todo_model_1.Todo.destroy({
                where: {
                    id: request.params.uid,
                },
            });
            response.status(200).send({ message: "Deleted todo" });
        });
    }
}
exports.TodosController = TodosController;
