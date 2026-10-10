import { AdminSidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  // TODO: yahan check lagao, email env wale admin email se match na ho to redirect("/user/dashboard")
  return <AdminSidebar>{children}</AdminSidebar>;
}