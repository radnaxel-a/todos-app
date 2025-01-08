<script>
    import axios from "axios";
    import { get } from "svelte/store";
    import { DispatchSetTodosActions } from "../../store/actions/DispatchSetTodosActions";
    import { todos } from "../../store/store";
    export let todo;

    function markAsdeleted() {
        if (todo.id) {
            axios.delete(`http://localhost:3000/todos/${todo.id}`);
        }

        const newTodos = get(todos).filter((x) => x.id !== todo.id);

        new DispatchSetTodosActions(newTodos);
    }

    function markAsDone(params) {
        todo.completed = true;
        axios.put(`http://localhost:3000/todos/${todo.id}`, todo);
    }

    function markAsUndone(params) {
        todo.completed = false;
        axios.put(`http://localhost:3000/todos/${todo.id}`, todo);
    }
</script>

<ion-card>
    <ion-card-header>
        <ion-card-title>{todo.title}</ion-card-title>
        <ion-card-subtitle
            >Status: {todo.completed === true
                ? "Done"
                : "In Progress"}</ion-card-subtitle
        >
    </ion-card-header>

    <ion-card-content>
        {todo.description}
        {#if todo.Tags?.length}
            <div>
                {#each todo.Tags as tag, index}
                    <ion-chip style="--background: {tag.color}">
                        <ion-label>{tag.name}</ion-label>
                    </ion-chip>
                {/each}
            </div>
        {/if}
    </ion-card-content>

    <ion-button fill="clear" color="danger" on:click={markAsdeleted}
        >Delete</ion-button
    >
    <ion-button fill="clear" on:click={markAsUndone}
        >Mark as In Progress</ion-button
    >
    <ion-button fill="clear" color="success" on:click={markAsDone}
        >Mark as Done</ion-button
    >
</ion-card>
