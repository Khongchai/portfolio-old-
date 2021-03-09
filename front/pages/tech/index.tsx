import NextLink from "next/link";
import { useEffect } from "react";
import setPadding from "../../utils/setFirstHeightToSecondPadding";

export default function Tech() {
  useEffect(() => {
    const timelinePage = document.getElementById("tech-timeline");
    const navbar = document.getElementById("navbar");
    if (timelinePage && navbar) {
      setPadding(navbar, timelinePage, 2);
    }
  }, []);

  return (
    <NextLink href="/tech/filter">
      <div id="tech-timeline">tech page</div>
    </NextLink>
  );
}
