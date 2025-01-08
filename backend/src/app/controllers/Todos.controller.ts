import { Request, Response } from "express";
import { Op } from "sequelize";
import { Routes } from "../config/Routes.enum";
import { Method } from "../interfaces/Method.enum";
import { Tag } from "../models/Tag.model";
import { Todo } from "../models/Todo.model";
import { TodoTag } from "../models/TodoTags.model";
import { Controller } from "./Controller";

export class TodosController extends Controller {
    constructor() {
        super(Routes.Todos);
    }

    public async [Method.GET_BY_ID](
        request: Request,
        response: Response
    ): Promise<void> {
        response.status(400).send();
    }

    public async [Method.GET](
        request: Request,
        response: Response
    ): Promise<void> {
        const tagIds = request.query.tags as string;
        const status = request.query.status as string;

        let options: any = {
            include: {
                model: Tag,
            },
            order: [["createdAt", "DESC"]],
        };

        if (tagIds) {
            options.include.where = {
                id: {
                    [Op.in]: tagIds.split(","),
                },
            };
        }

        if (status) {
            options.where = {
                completed: status === "true" ? true : false,
            };
        }

        const tags = await Todo.findAll(options);

        response.status(200).send(tags);
    }

    public async [Method.POST](request: Request, response: Response) {
        const bulkAction = request.query.mark;

        if (bulkAction === "done") {
            await Todo.update({ completed: true }, { where: {} });
            response.status(200).send({ message: "Todo updated" });

            return;
        }

        if (bulkAction === "undone") {
            await Todo.update({ completed: false }, { where: {} });
            response.status(200).send({ message: "Todo updated" });

            return;
        }

        const { title, description, tags } = request.body;
        const todo = await Todo.create(
            {
                title,
                description,
                completed: false,
            } as any,
            {
                returning: true,
            }
        );

        for (const tag of tags) {
            await TodoTag.create({
                todoId: todo.id,
                tagId: tag.id,
            });
        }

        const todoWithTags = await Todo.findByPk(todo.id, {
            include: { model: Tag },
        });

        response
            .status(200)
            .send({ message: "Todo created", todo: todoWithTags });
    }

    public async [Method.PUT](request: Request, response: Response) {
        const { title, description, completed } = request.body;
        const todo = await Todo.update(
            {
                title,
                description,
                completed,
            } as any,
            {
                where: {
                    id: request.params.uid,
                },
            }
        );

        response.status(200).send({ message: "Todo updated" });
    }

    public async [Method.DELETE](request: Request, response: Response) {
        const bulkAction = request.query.all as any;

        if (bulkAction === "true") {
            const todo = await Todo.destroy({
                where: {},
            });

            response.status(200).send({ message: "Deleted All todo" });

            return;
        }

        const todo = await Todo.destroy({
            where: {
                id: request.params.uid,
            },
        });

        response.status(200).send({ message: "Deleted todo" });
    }
}
