import { Route, Routes } from "react-router";
import { AboutRoute } from "routes/About";
import { IndexRoute } from "routes/Index";
import { DefaultLayout } from "../RouterLayout/Default";

export function Router() {
  return (
    <Routes>
      <Route
        index
        element={
          <DefaultLayout>
            <IndexRoute />
          </DefaultLayout>
        }
      />
      <Route
        path="about"
        element={
          <DefaultLayout>
            <AboutRoute />
          </DefaultLayout>
        }
      />
    </Routes>
  );
}
