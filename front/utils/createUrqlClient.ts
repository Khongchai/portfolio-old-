import { createClient, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
export const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    //for getting and setting cookies
    credentials: "include" as const,
  },
  exchanges: [
    cacheExchange({
      resolvers: {
        Query: {
          projects: simplePagination(),
        },
      },
    }),
    fetchExchange,
  ],
});

/*
import { cacheExchange } from '@urql/exchange-graphcache';
import { simplePagination } from '@urql/exchange-graphcache/extras';
const cache = cacheExchange({
  resolvers: {
    Query: {
      todos: simplePagination(),
    },
  },
}); */
