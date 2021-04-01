import router from "next/router";
export default function setQueryParam(param: string, path: string) {
  router.push({
    pathname: path,
    query: { selection: param },
  });
}
