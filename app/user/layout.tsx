import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { UserSidebar } from "@/components/sidebar";
import NotSignedIn from "@/components/NotSignedIn";

async function AuthGate({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) return <NotSignedIn />;

  return <UserSidebar>{children}</UserSidebar>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AuthGate>{children}</AuthGate>
    </Suspense>
  );
}