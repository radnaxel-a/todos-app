import { todos } from "../store";

export class DispatchAddTodoAction {
    constructor(payload) {
        todos.update((data) => [...data, payload]);
    }
}
