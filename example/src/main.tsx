import { FacebookProvider } from "@kazion/react-facebook-login";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <FacebookProvider appId="1831097730701984">
            <App />
        </FacebookProvider>
    </StrictMode>
);
