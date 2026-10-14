"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import NotAuthorized from "@/components/not-authorized";

type Access = "checking" | "allowed" | "denied";

export default function ClinicGate({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded } = useAuth();
  const [access, setAccess] = useState<Access>("checking");

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    async function checkClinic() {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/clinic/is-clinic", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (cancelled) return;

       
        setAccess(data?.isClinic ? "allowed" : "denied");
      } catch (error) {
        console.error(error);
        if (!cancelled) setAccess("denied");
      }
    }

    checkClinic();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, getToken]);

  if (access === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p role="status" className="text-gray-500">
          Checking access...
        </p>
      </div>
    );
  }

  if (access === "denied") return <NotAuthorized />;

  return <>{children}</>;
}