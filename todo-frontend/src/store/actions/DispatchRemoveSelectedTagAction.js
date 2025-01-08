import { selectedTags } from "../store";

export class DispatchRemoveSelectedTagAction {
    constructor(payload) {
        selectedTags.update((data) => {
            return data.filter((x) => x.name !== payload.name);
        });
    }
}
