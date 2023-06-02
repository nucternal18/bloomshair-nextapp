import AdminNavbar from "app/components/navigation/AdminNavbar";
import Sidebar from "../../app/components/navigation/Sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      aria-label="admin-layout"
      data-testid="admin-layout"
      className="flex flex-col justify-between h-screen dark:bg-gray-900"
    >
      <Sidebar />
      <section className="relative  bg-white dark:bg-gray-900">
        <AdminNavbar />
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
}
