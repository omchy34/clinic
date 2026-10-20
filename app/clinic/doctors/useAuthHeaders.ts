"use client";

// app/clinic/doctors/useAuthHeaders.ts
// Every API request sends the Clerk session token as a Bearer header.

import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";


export function useAuthHeaders() {
  const { getToken } = useAuth();

  return useCallback(async () => {
    const token = await getToken();
    return { Authorization: `Bearer ${token}` };
  }, [getToken]);
}