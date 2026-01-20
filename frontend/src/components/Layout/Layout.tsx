import { Outlet } from "react-router-dom";

import { Header } from "../Header";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col bg-linear-to-br from-blue-50 to-purple-50">
      <Header />
      <main className="grow overflow-hidden p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
