<script>
    import { DispatchSetTodosActions } from "../../store/actions/DispatchSetTodosActions";
    import { DispatchSetTagsAction } from "../../store/actions/DispatchSetTagsAction";
    import CreateTodo from "../create-todo/CreateTodo.svelte";
    import TodoCard from "../todo-card/TodoCard.svelte";
    import { tags, todos } from "../../store/store";
    import axios from "axios";

    let tagsFilterInput = null;
    let statusFilterInput = null;

    (function init() {
        axios.get("http://localhost:3000/todos").then((response) => {
            new DispatchSetTodosActions(response.data);
        });

        axios.get("http://localhost:3000/tags").then((response) => {
            new DispatchSetTagsAction(response.data);
        });
    })();

    function onFilterChange() {
        console.log("adas");
        const params = {
            tags: tagsFilterInput.value?.join(",") || null,
            status: statusFilterInput.value,
        };

        axios
            .get("http://localhost:3000/todos", {
                params,
            })
            .then((response) => {
                new DispatchSetTodosActions(response.data);
            });
    }

    function clearFilters() {
        tagsFilterInput.value = null;
        statusFilterInput.value = null;

        axios.get("http://localhost:3000/todos").then((response) => {
            new DispatchSetTodosActions(response.data);
        });
    }
</script>

<ion-item>
    <ion-label>
        <p>Filter by</p>
    </ion-label>
    <ion-button on:click={clearFilters}>Clear</ion-button>
</ion-item>
<ion-item>
    <ion-label><p>Tags</p></ion-label>
    <ion-select
        bind:this={tagsFilterInput}
        multiple
        on:ionChange={onFilterChange}
    >
        {#each $tags as tag}
            <ion-select-option value={tag.id}>{tag.name}</ion-select-option>
        {/each}
    </ion-select>
</ion-item>
<ion-item>
    <ion-label><p>Status</p></ion-label>
    <ion-select bind:this={statusFilterInput} on:ionChange={onFilterChange}>
        <ion-select-option value="false">In Progress</ion-select-option>
        <ion-select-option value="true">Done</ion-select-option>
    </ion-select>
</ion-item>
{#each $todos as todo, index}
    <TodoCard {todo} />
{/each}

{#if $todos.length === 0}
    <div class="no-content">
        <img width="250" src="cat.png" />
        <h4>No todos. Create some from the menu.</h4>
    </div>
{/if}

<CreateTodo />

<style>
    .no-content {
        padding: 20px;
        text-align: center;
    }
</style>
