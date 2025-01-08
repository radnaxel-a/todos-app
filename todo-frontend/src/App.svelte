<script lang="ts">
    import Footer from "./components/layout/Footer.svelte";
    import Header from "./components/layout/Header.svelte";
    import Menu from "./components/layout/Menu.svelte";
    import ListTodos from "./components/list-todos/ListTodos.svelte";
</script>

<svelte:head>
    <link
        href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css"
        rel="stylesheet"
    />
    <script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"
    ></script>
    <script
        nomodule
        src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"
    ></script>
</svelte:head>

<ion-app>
    <!-- Split Pane for Responsive Layouts -->
    <ion-split-pane when="lg">
        <Menu />
        <div id="main-content">
            <Header />
            <ion-content style="--padding-bottom: 100px">
                <ListTodos />
            </ion-content>
        </div>
    </ion-split-pane>
</ion-app>

<style>
    ion-split-pane {
        height: 100%;
    }

    #main-content {
        width: 100%;
    }
</style>
