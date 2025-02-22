import { createRoot } from "react-dom/client";
import { MantineThemeProvider } from "providers/MantineTheme";
import { MemoryRouter, BrowserRouter } from "react-router";
import { Router } from "features/Router";
import "styles/index.scss";
import { isElectron } from "utils";
import { ServiceWorkerNotifier } from "providers/ServiceWorkerNotifier";
import store from "libs/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { defaultLocale, translationMessages } from "libs/translations";
import { LanguageProvider } from "providers/Language/LanguageProvider";

const root = createRoot(document.body);

const RouterProvider = isElectron() ? MemoryRouter : BrowserRouter;

root.render(
  <ReduxProvider store={store}>
    <LanguageProvider locale={defaultLocale} defaultLocale={defaultLocale} messages={translationMessages}>
      <MantineThemeProvider>
        <ServiceWorkerNotifier />
        <RouterProvider>
          <Router />
        </RouterProvider>
      </MantineThemeProvider>
    </LanguageProvider>
  </ReduxProvider>
);
