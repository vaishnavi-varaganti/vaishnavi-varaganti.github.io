import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CustomCursor } from "./components/CustomCursor";

createRoot(document.getElementById("root")!).render(
  <>
    <CustomCursor />
    <App />
  </>
);
