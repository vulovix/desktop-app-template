import { createRoot } from "react-dom/client";
import { MantineThemeProvider } from "providers/MantineTheme";
import { MemoryRouter, BrowserRouter } from "react-router";
import { Router } from "features/Router";
import "styles/index.scss";
import { isElectron } from "utils";
import { ServiceWorkerNotifier } from "providers/ServiceWorkerNotifier";

const root = createRoot(document.body);

const RouterProvider = isElectron() ? MemoryRouter : BrowserRouter;

root.render(
  <MantineThemeProvider>
    <ServiceWorkerNotifier />
    <RouterProvider>
      <Router />
    </RouterProvider>
  </MantineThemeProvider>
);
