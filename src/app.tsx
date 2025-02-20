import { createRoot } from "react-dom/client";
import { MantineThemeProvider } from "providers/MantineTheme";
import { MemoryRouter } from "react-router";
import { Router } from "features/Router";

const root = createRoot(document.body);
root.render(
  <MantineThemeProvider>
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  </MantineThemeProvider>
);
