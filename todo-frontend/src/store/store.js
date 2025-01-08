import { writable } from "svelte/store";

export const todos = writable([]);
export const tags = writable([]);
export const selectedTags = writable([]);
export const isCreateTodoModalVisible = writable(false);
