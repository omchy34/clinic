import { auth } from "@clerk/nextjs/server";
import { UserSidebar } from "@/components/sidebar";
import NotSignedIn from "@/components/NotSignedIn";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) return <NotSignedIn />;

  return <UserSidebar>{children}</UserSidebar>;
}