"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import NotAuthorized from "@/components/not-authorized";

type Access = "checking" | "admin" | "denied" | "error";

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 text-center">{children}</div>
  );
}

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const [access, setAccess] = useState<Access>("checking");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function checkAccess() {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/admin/is-admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (cancelled) return;
        setAccess(data?.isAdmin === true ? "admin" : "denied");
      } catch (error) {
        if (cancelled) return;
        
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        setAccess(status === 401 || status === 403 ? "denied" : "error");
      }
    }

    checkAccess();
    return () => {
      cancelled = true;
    };
  }, [getToken, attempt]);

  function retry() {
    setAccess("checking");
    setAttempt((n) => n + 1);
  }

  if (access === "checking") {
    return (
      <Centered>
        <p role="status" className="text-gray-500">
          Checking access...
        </p>
      </Centered>
    );
  }

  if (access === "error") {
    return (
      <Centered>
        <div>
          <p className="text-xl font-semibold text-gray-600">Could not check your access.</p>
          <p className="mt-1 text-sm text-gray-500">Check your connection and try again.</p>
          <button
            type="button"
            onClick={retry}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </Centered>
    );
  }

  if (access === "denied") return <NotAuthorized />;

  // Only admins get here, so the sidebar and the page are rendered only for them
  return <>{children}</>;
}