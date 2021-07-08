import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { AdminLoginContext } from "../../globalContexts/adminLoginContext";

/**
 * When all redirection url are ommitted, the function will only
 * call the api to check for current login session state and set
 * the login state accordingly.
 */
export function checkAuthAndRedirect(
  urlWhenNotLoggedIn?: string,
  urlWhenLoggedIn?: string
) {
  const router = useRouter();
  const { setAdminLoginState } = useContext(AdminLoginContext);
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching) {
      if (data?.me) {
        setAdminLoginState(true);
        if (urlWhenLoggedIn) {
          router.replace(urlWhenLoggedIn);
        } else {
          /* if not provided, just stay on the same page */
        }
      } else {
        setAdminLoginState(false);
        if (urlWhenNotLoggedIn) {
          router.replace(urlWhenNotLoggedIn);
        }
      }
    }
  }, [fetch, data]);
}
