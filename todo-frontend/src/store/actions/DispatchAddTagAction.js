import { tags } from "../store";

export class DispatchAddTagAction {
    constructor(payload) {
        tags.update((data) => [...data, payload]);
    }
}
