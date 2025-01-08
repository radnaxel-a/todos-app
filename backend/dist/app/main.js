"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const sequelize_1 = require("sequelize");
const Method_enum_1 = require("./interfaces/Method.enum");
const Tag_model_1 = require("./models/Tag.model");
const Todo_model_1 = require("./models/Todo.model");
const TodoTags_model_1 = require("./models/TodoTags.model");
const User_model_1 = require("./models/User.model");
const Controllers_1 = require("./utils/Controllers");
class Main {
    constructor(_express) {
        this.express = _express;
        this.dbContext = new sequelize_1.Sequelize(process.env.DB_NAME || "mydatabase", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || "mysecretpassword", {
            host: process.env.DB_HOST || "127.0.0.1",
            dialect: "postgres",
            logging: false,
        });
    }
    init() {
        this.initOrm();
        this.createControllers();
    }
    initOrm() {
        const models = {
            User: (0, User_model_1.UserFactory)(this.dbContext),
            Tag: (0, Tag_model_1.TagFactory)(this.dbContext),
            Todo: (0, Todo_model_1.TodoFactory)(this.dbContext),
            TodoTag: (0, TodoTags_model_1.TodoTagsFactory)(this.dbContext),
        };
        Object.values(models).forEach((model) => {
            if (model === null || model === void 0 ? void 0 : model.associate) {
                model.associate(models);
            }
        });
    }
    createControllers() {
        const controllers = new Controllers_1.Controllers().create(this.dbContext);
        for (const ctrl of controllers) {
            this.express[Method_enum_1.Method.GET](`/${ctrl.path}/:rpl`, (req, res) => {
                ctrl[Method_enum_1.Method.GET_BY_ID](req, res);
            });
            this.express[Method_enum_1.Method.GET](`/${ctrl.path}`, (req, res) => {
                ctrl[Method_enum_1.Method.GET](req, res);
            });
            this.express[Method_enum_1.Method.POST](`/${ctrl.path}`, (req, res) => {
                ctrl[Method_enum_1.Method.POST](req, res);
            });
            this.express[Method_enum_1.Method.PUT](`/${ctrl.path}/:uid`, (req, res) => {
                ctrl[Method_enum_1.Method.PUT](req, res);
            });
            this.express[Method_enum_1.Method.DELETE](`/${ctrl.path}`, (req, res) => {
                ctrl[Method_enum_1.Method.DELETE](req, res);
            });
            this.express[Method_enum_1.Method.DELETE](`/${ctrl.path}/:uid`, (req, res) => {
                ctrl[Method_enum_1.Method.DELETE](req, res);
            });
        }
    }
}
exports.Main = Main;
