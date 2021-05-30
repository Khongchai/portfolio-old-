import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";

export function checkAuthAndRedirect(
  urlWhenNotLoggedIn: string,
  urlWhenLoggedIn?: string
) {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching) {
      if (data?.me) {
        if (urlWhenLoggedIn) {
          router.replace(urlWhenLoggedIn);
        } else {
          /* if not provided, just stay on the same page */
        }
      } else {
        router.replace(urlWhenNotLoggedIn);
      }
    }
  }, [fetch, data]);
}
