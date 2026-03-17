import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/cms", label: "CMS", icon: "🖊️" },
  { to: "/blog", label: "Blog", icon: "📝" },
  { to: "/configuratore", label: "Configuratore", icon: "⚙️" },
];

export default function Sidebar() {
  const { handleLogout } = useAuth();

  return (
    <aside
      className="w-56 bg-gray-900 border-r border-gray-800
      flex flex-col h-screen fixed left-0 top-0"
    >
      <div className="p-6 border-b border-gray-800">
        <span className="text-white font-bold text-lg">GST </span>
        <span className="text-teal-400 font-bold text-lg">Code Lab</span>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
              transition ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2.5 text-sm text-gray-400
            hover:text-white hover:bg-gray-800 rounded-lg transition"
        >
          🚪 Esci
        </button>
      </div>
    </aside>
  );
}
