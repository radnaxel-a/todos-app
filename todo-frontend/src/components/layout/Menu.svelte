<script>
    import axios from "axios";
    import { DispatchShowModalAction } from "../../store/actions/DispatchShowModalAction";
    import { DispatchSetTodosActions } from "../../store/actions/DispatchSetTodosActions";

    let menu;

    function allAsDone() {
        axios.post("http://localhost:3000/todos?mark=done").then((r) => {
            axios.get("http://localhost:3000/todos").then((response) => {
                new DispatchSetTodosActions(response.data);
            });
        });
    }

    function allAsUndone(params) {
        axios.post("http://localhost:3000/todos?mark=undone").then((r) => {
            axios.get("http://localhost:3000/todos").then((response) => {
                new DispatchSetTodosActions(response.data);
            });
        });
    }

    function deleteAll(params) {
        axios.delete("http://localhost:3000/todos?all=true").then((r) => {
            new DispatchSetTodosActions([]);
        });
    }

    function showModal() {
        menu?.close();
        new DispatchShowModalAction(true);
    }
</script>

<!-- Side Menu -->
<ion-menu bind:this={menu} content-id="main-content" autoHide="true">
    <ion-header>
        <ion-toolbar color="primary">
            <ion-title>Menu</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-list>
            <ion-item button lines="full" on:click={allAsDone}
                >Mark all as done</ion-item
            >
            <ion-item button lines="full" on:click={allAsUndone}
                >Mark all as undone</ion-item
            >
            <ion-item button lines="full" on:click={deleteAll}
                >Remove all</ion-item
            >
            <ion-item button lines="full" on:click={showModal}
                >Add a todo</ion-item
            >
        </ion-list>
    </ion-content>
</ion-menu>
