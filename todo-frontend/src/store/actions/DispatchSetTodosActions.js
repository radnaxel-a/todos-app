import { todos } from "../store";

export class DispatchSetTodosActions {
    constructor(payload) {
        todos.set(payload);
    }
}
