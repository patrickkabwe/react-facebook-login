import { FacebookProvider } from "@kazion/react-facebook-login";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <FacebookProvider appId="8781319378131312">
            <App />
        </FacebookProvider>
    </StrictMode>
);
