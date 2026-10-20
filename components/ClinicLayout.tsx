"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import NotAuthorized from "@/components/not-authorized";

type Access = "checking" | "allowed" | "pending" | "denied" | "error";

function Message({
  title,
  text,
  onRetry,
}: {
  title: string;
  text: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F6F5] px-5">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center ring-1 ring-[#DCE6E3]">
        <h1 className="text-xl font-semibold text-[#14302B]">{title}</h1>
        <p className="mt-2 text-[15px] text-[#5B726C]">{text}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-md bg-[#14302B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1C4038] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E] focus-visible:ring-offset-2"
        >
          Check again
        </button>
      </div>
    </div>
  );
}

export default function ClinicGate({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded } = useAuth();
  const [access, setAccess] = useState<Access>("checking");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    async function checkClinic() {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/clinic/is-clinic", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cancelled) setAccess(data?.isClinic ? "allowed" : "denied");
      } catch (err) {
        if (cancelled) return;

        if (axios.isAxiosError(err) && err.response) {
          const { status, data } = err.response;
          if (status === 403 && data?.code === "NOT_APPROVED") return setAccess("pending");
          if (status === 401 || status === 403) return setAccess("denied");
        }
        // Network problem or server error: let the user try again
        setAccess("error");
      }
    }

    checkClinic();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, getToken, attempt]);

  function retry() {
    setAccess("checking");
    setAttempt((n) => n + 1);
  }

  if (access === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p role="status" className="text-gray-500">
          Checking access...
        </p>
      </div>
    );
  }

  if (access === "pending") {
    return (
      <Message
        title="Waiting for approval"
        text="An admin is reviewing your clinic. This page opens as soon as it is approved."
        onRetry={retry}
      />
    );
  }

  if (access === "error") {
    return (
      <Message
        title="Could not check access"
        text="Check your connection and try again."
        onRetry={retry}
      />
    );
  }

  if (access === "denied") return <NotAuthorized />;

  return <>{children}</>;
}