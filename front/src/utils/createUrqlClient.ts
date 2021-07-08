import { createClient, fetchExchange } from "urql";

export const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: {
    //for getting and setting cookies
    credentials: "include" as const,
  },
  exchanges: [fetchExchange],
});
