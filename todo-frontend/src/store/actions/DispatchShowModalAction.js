import { isCreateTodoModalVisible } from "../store";

export class DispatchShowModalAction {
    constructor(payload) {
        isCreateTodoModalVisible.set(payload);
    }
}
