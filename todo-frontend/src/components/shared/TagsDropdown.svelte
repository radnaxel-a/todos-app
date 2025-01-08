<script>
    import { DispatchAddSelectedTagAction } from "../../store/actions/DispatchAddSelectedTagAction";
    import { tags, selectedTags } from "../../store/store";
    import { DispatchRemoveSelectedTagAction } from "../../store/actions/DispatchRemoveSelectedTagAction";
    import { DispatchAddTagAction } from "../../store/actions/DispatchAddTagAction";
    import { get } from "svelte/store";
    import axios from "axios";

    let searchableTags = [];
    let searchBar = null;
    let isVisible = "hidden";
    let searchString = "";
    let alert = null;
    let selectedColor = "#ff0000";

    function onSelect(tag) {
        new DispatchAddSelectedTagAction(tag);
    }

    function onRemove(tag) {
        new DispatchRemoveSelectedTagAction(tag);
    }

    function toggleDropdown() {
        if (isVisible === "hidden") {
            if (searchableTags.length === 0) {
                searchableTags = get(tags);
            }

            isVisible = "visible";
            return;
        }

        isVisible = "hidden";
    }

    function search() {
        if (searchString === "") {
            searchableTags = get(tags);
            return;
        }

        searchableTags = [
            ...searchableTags.filter((x) => x.name.includes(searchString)),
        ];
    }

    function showAlert() {
        alert.present();
    }

    function createTag() {
        const tag = {
            name: searchString,
            color: selectedColor,
        };

        axios.post("http://localhost:3000/tags", tag).then((response) => {
            new DispatchAddTagAction(response.data.tag);
            searchableTags = get(tags);
            search();
            alert.dismiss();
        });
    }
</script>

<ion-item button on:click={toggleDropdown}>
    <ion-label>Tags: </ion-label>
    {#each $selectedTags as tag, index}
        <ion-chip style="--background: {tag.color}" on:click={onRemove(tag)}>
            <ion-label>{tag.name}</ion-label>
            <ion-icon name="close-circle" />
        </ion-chip>
    {/each}
</ion-item>

<div class="dropdown {isVisible}">
    <div>
        <input
            placeholder="Search for a tag here. "
            type="text"
            class="tag-search"
            bind:value={searchString}
            on:input={search}
        />
    </div>
    <!-- <ion-searchbar bind:this={searchBar} on:ionInput={(e) => search(e)}></ion-searchbar> -->
    {#each searchableTags as tag, index}
        <ion-chip style="--background: {tag.color}" on:click={onSelect(tag)}>
            <ion-label>{tag.name}</ion-label>
        </ion-chip>
    {/each}

    {#if searchableTags.length === 0}
        <ion-button on:click={showAlert}>Create tag {searchString}</ion-button>
    {/if}
</div>
<ion-modal bind:this={alert} initial-breakpoint="0.25" backdrop>
    <ion-content>
        <ion-item>
            <ion-label>{searchString}</ion-label>
            <input type="color" bind:value={selectedColor} />
        </ion-item>
        <ion-button on:click={createTag}>Create Todo</ion-button>
    </ion-content>
</ion-modal>

<style>
    .dropdown {
        width: 400px;
        border: 1px solid;
        margin: 15px;
        box-shadow: 1px 2px 3px 0;
        padding: 5px;
        position: relative;
        top: -20px;
    }

    .hidden {
        display: none;
    }

    .visible {
        display: block;
    }

    .tag-search {
        margin: 5px 5px 5px 0;
        border: none;
    }
</style>
