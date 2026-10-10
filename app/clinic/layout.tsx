import { ClinicSidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  // TODO: yahan check lagao, clinic approved nahi hai to redirect("/user/dashboard")
  return <ClinicSidebar>{children}</ClinicSidebar>;
}