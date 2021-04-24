import { createClient, fetchExchange } from "urql";

export const client = createClient({
  url: "http://192.168.1.41:4000/graphql",
  fetchOptions: {
    //for getting and setting cookies
    credentials: "include" as const,
  },
  exchanges: [fetchExchange],
});
