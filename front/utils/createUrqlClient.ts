import { createClient, fetchExchange } from "urql";

export const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    //for getting and setting cookies
    credentials: "include" as const,
  },
  exchanges: [fetchExchange],
});

/*

Query: {
          projects: (parent, args) => {
            console.log(parent);
            return {
              __typename: "PaginatedProjects",
              id: args.id,
            };
          },
        },
*/
