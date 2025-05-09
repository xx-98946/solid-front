/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "solid-devtools";
import "./index.css";

const root = document.getElementById("root");
import "./pwa.ts";
render(() => <App />, root!);
