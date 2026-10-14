import AdminGate from "@/components/AdminLayout";
import { AdminSidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <AdminSidebar>{children}</AdminSidebar>
    </AdminGate>
  );
}