import ClinicGate from "@/components/ClinicLayout";
import { ClinicSidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClinicGate>
      <ClinicSidebar> {children} </ClinicSidebar>;
    </ClinicGate>
  )
}