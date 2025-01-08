import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Routes } from "../config/Routes.enum";
import { Method } from "../interfaces/Method.enum";
import { Tag } from "../models/Tag.model";
import { Controller } from "./Controller";

export class TagsController extends Controller {
    constructor() {
        super(Routes.Tags);
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
        const tags = await Tag.findAll();

        response.status(200).send(tags);
    }

    public async [Method.POST](request: Request, response: Response) {
        const { name, color } = request.body;
        const tag = await Tag.create(
            {
                name,
                color,
            } as any,
            {
                returning: true,
            }
        );

        response.status(200).send({ message: "Tag created", tag });
    }

    public [Method.PUT](request: Request, response: Response): void {
        response.status(400).send();
    }

    public [Method.DELETE](request: Request, response: Response): void {
        response.status(400).send();
    }
}
