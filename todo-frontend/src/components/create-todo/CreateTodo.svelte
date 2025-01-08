<script>
    import { DispatchAddTodoAction } from "../../store/actions/DispatchAddTodoAction";
    import { DispatchShowModalAction } from "../../store/actions/DispatchShowModalAction";
    import { DispatchSetSelectedTagsAction } from "../../store/actions/DispatchSetSelectedTagsAction";
    import { isCreateTodoModalVisible, selectedTags } from "../../store/store";
    import TagsDropdown from "../shared/TagsDropdown.svelte";
    import { get } from "svelte/store";
    import axios from "axios";

    const form = {
        title: "",
        description: "",
        tags: [],
    };
    let modal = null;
    let titleInput = null;
    let descriptionInput = null;
    let errorVisible = false;

    (function init() {
        isCreateTodoModalVisible.subscribe((data) => {
            if (data) {
                modal?.present();
                return;
            }

            modal?.dismiss();
        });
    })();

    function onChange(value) {
        form.title = value.detail.value;

        if (form.title.length === 0) {
            errorVisible = true;
        } else {
            errorVisible = false;
        }
    }

    function onCreate() {
        if (form.title.length === 0) {
            errorVisible = true;
            return;
        }

        if (errorVisible) {
            return;
        }

        form.tags = get(selectedTags);
        axios.post("http://localhost:3000/todos", form).then((response) => {
            console.log(response.data);
            new DispatchAddTodoAction(response.data.todo);
            close();
        });
    }

    function close() {
        new DispatchShowModalAction(false);
        reset();
    }

    function reset() {
        form.description = "";
        form.title = "";
        form.tags = [];

        titleInput.value = "";
        descriptionInput.value = "";
        isCreateTodoModalVisible.set(false);
        new DispatchSetSelectedTagsAction([]);
    }
</script>

<ion-modal bind:this={modal}>
    <ion-header>
        <ion-toolbar>
            <ion-title>Create To-Do</ion-title>
            <ion-buttons slot="end">
                <ion-button on:click={close}>Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-list>
            <ion-item>
                <ion-input
                    bind:this={titleInput}
                    label="Title"
                    placeholder="Do some shopping"
                    on:ionInput={(v) => onChange(v)}
                />
            </ion-item>
            {#if errorVisible}
                <ion-item>
                    <span class="error">Enter a valid value for title!</span>
                </ion-item>
            {/if}
            <ion-item>
                <ion-input
                    bind:this={descriptionInput}
                    label="Description"
                    on:ionChange={(v) => (form.description = v.detail.value)}
                    placeholder="Jot something down"
                />
            </ion-item>
        </ion-list>
        <TagsDropdown />
        <ion-button on:click={onCreate}>Create</ion-button>
    </ion-content>
</ion-modal>

<style>
    .error {
        color: red;
    }
</style>
