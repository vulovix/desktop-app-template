import { Route, Routes } from "react-router";
import { AboutRoute } from "routes/About";
import { IndexRoute } from "routes/Index";
import { Layout } from "./Layout";

export function Router() {
  return (
    <Routes>
      <Route
        index
        element={
          <Layout>
            <IndexRoute />
          </Layout>
        }
      />
      <Route
        path="about"
        element={
          <Layout>
            <AboutRoute />
          </Layout>
        }
      />
    </Routes>
  );
}
