"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const Tags_controller_1 = require("../controllers/Tags.controller");
const Todos_controller_1 = require("../controllers/Todos.controller");
class Controllers {
    constructor() {
        /**
         * Add type referance to controllers here
         */
        this.controllers = [
            Tags_controller_1.TagsController,
            Todos_controller_1.TodosController,
        ];
    }
    create(dbContext) {
        return this.controllers.map((c) => new c(dbContext));
    }
}
exports.Controllers = Controllers;
