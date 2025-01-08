import { Sequelize } from "sequelize";
import { Controller } from "../controllers/Controller";
import { TagsController } from "../controllers/Tags.controller";
import { TodosController } from "../controllers/Todos.controller";
import { Constructable } from "../interfaces/Constructable.interface";

export class Controllers {
    /**
     * Add type referance to controllers here
     */
    protected controllers: Constructable<Controller>[] = [
        TagsController,
        TodosController,
    ];

    public create(dbContext: Sequelize): Controller[] {
        return this.controllers.map((c) => new c(dbContext));
    }
}
