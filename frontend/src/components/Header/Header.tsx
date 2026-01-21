import type { LucideIcon } from "lucide-react";
import { BarChart3, Receipt } from "lucide-react";
import { NavLink } from "react-router-dom";

/** Navigation item configuration */
interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

/** Application header with navigation links */
const Header = () => {
  return (
    <header
      className="flex items-center gap-6 border-b border-gray-200 bg-white px-8 py-4"
      role="banner"
    >
      <span className="text-lg font-semibold text-gray-800">
        Personal Finance Dashboard
      </span>
      <nav aria-label="Main navigation" className="flex gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <item.icon aria-hidden="true" className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
