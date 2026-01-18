import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { NotFound, Reports, Transactions } from "./pages";

const App = () => {
  return (
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
  );
};

export default App;
