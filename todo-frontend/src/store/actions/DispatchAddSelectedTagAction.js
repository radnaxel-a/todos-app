import { selectedTags } from "../store";

export class DispatchAddSelectedTagAction {
    constructor(payload) {
        selectedTags.update((data) => {
            if (data.map((x) => x.name).includes(payload.name)) {
                return data.filter((x) => x.name !== payload.name);
            }

            return [...data, payload];
        });
    }
}
