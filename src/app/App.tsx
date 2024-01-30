import { Box, Button, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "./constant";

import Layout from "components/templates";

import GeneratePlan from "pages/GeneratePlan";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path={paths.generatePlan} element={<GeneratePlan />} />
            <Route
              path="*"
              element={<Navigate to={paths.generatePlan} replace />}
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
