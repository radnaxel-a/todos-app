import { selectedTags } from "../store";

export class DispatchSetSelectedTagsAction {
    constructor(payload) {
        selectedTags.set([]);
    }
}
