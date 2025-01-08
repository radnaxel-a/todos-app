import { Request, Response } from "express";

import { IController } from "../interfaces/IController.interface";
import { User } from "../models/User.model";

export abstract class Controller implements IController {
    public path: string;

    constructor(_path: string) {
        this.path = _path;
    }

    abstract getById(request: Request, response: Response): void;
    abstract get(request: Request, response: Response): void;
    abstract post(request: Request, response: Response): void;
    abstract put(request: Request, response: Response): void;
    abstract delete(request: Request, response: Response): void;
}
