import { createClient } from "urql";
export const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    //for getting and setting cookies
    credentials: "include" as const,
  },
});
