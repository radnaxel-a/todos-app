// @ts-ignore
import App from "./App.svelte";
// @ts-ignore
// import { defineCustomElements } from "@ionic/core/loader";

const app = new App({
    target: document.body,
    props: {
        name: "world",
    },
});

// defineCustomElements(window);

export default app;
