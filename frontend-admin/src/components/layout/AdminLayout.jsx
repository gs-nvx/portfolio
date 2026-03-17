import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="ml-56 p-8">{children}</main>
    </div>
  );
}
