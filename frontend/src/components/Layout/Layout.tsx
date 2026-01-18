import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-blue-50 to-purple-50">
      <main className="grow p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
