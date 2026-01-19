import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col bg-linear-to-br from-blue-50 to-purple-50">
      <main className="grow overflow-hidden p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
