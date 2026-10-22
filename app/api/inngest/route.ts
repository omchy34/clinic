// src/app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { syncUserCreate, syncUserDataUpdate, syncUserDeletion , expireUnpaidTokens,} from "../../../inngest/function"; // Your own functions

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreate, syncUserDataUpdate, syncUserDeletion, expireUnpaidTokens],
});