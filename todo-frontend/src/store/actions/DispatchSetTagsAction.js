import { tags } from "../store";

export class DispatchSetTagsAction {
    constructor(payload) {
        tags.set(payload);
    }
}
