import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { NotFound, Reports, Transactions } from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Notifications />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<Transactions />} path="/" />
              <Route element={<Transactions />} path="/transactions" />
              <Route element={<Reports />} path="/reports" />
              <Route element={<NotFound />} path="*" />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
