import { Express } from "express";
import { Sequelize } from "sequelize";
import { Method } from "./interfaces/Method.enum";
import { TagFactory } from "./models/Tag.model";
import { TodoFactory } from "./models/Todo.model";
import { TodoTagsFactory } from "./models/TodoTags.model";
import { UserFactory } from "./models/User.model";
import { Controllers } from "./utils/Controllers";

export class Main {
    public express: Express;
    private dbContext: Sequelize;

    constructor(_express: Express) {
        this.express = _express;
        this.dbContext = new Sequelize(
            process.env.DB_NAME || "mydatabase",
            process.env.DB_USER || "postgres",
            process.env.DB_PASSWORD || "mysecretpassword",
            {
                host: process.env.DB_HOST || "127.0.0.1",
                dialect: "postgres",
                logging: false,
            }
        );
    }

    public init(): void {
        this.initOrm();
        this.createControllers();
    }

    private initOrm(): void {
        const models = {
            User: UserFactory(this.dbContext),
            Tag: TagFactory(this.dbContext),
            Todo: TodoFactory(this.dbContext),
            TodoTag: TodoTagsFactory(this.dbContext),
        };

        Object.values(models).forEach((model: any) => {
            if (model?.associate) {
                model.associate(models);
            }
        });
    }

    private createControllers(): void {
        const controllers = new Controllers().create(this.dbContext);

        for (const ctrl of controllers) {
            this.express[Method.GET](`/${ctrl.path}/:rpl`, (req, res) => {
                ctrl[Method.GET_BY_ID](req, res);
            });
            this.express[Method.GET](`/${ctrl.path}`, (req, res) => {
                ctrl[Method.GET](req, res);
            });
            this.express[Method.POST](`/${ctrl.path}`, (req, res) => {
                ctrl[Method.POST](req, res);
            });
            this.express[Method.PUT](`/${ctrl.path}/:uid`, (req, res) => {
                ctrl[Method.PUT](req, res);
            });
            this.express[Method.DELETE](`/${ctrl.path}`, (req, res) => {
                ctrl[Method.DELETE](req, res);
            });
            this.express[Method.DELETE](`/${ctrl.path}/:uid`, (req, res) => {
                ctrl[Method.DELETE](req, res);
            });
        }
    }
}
