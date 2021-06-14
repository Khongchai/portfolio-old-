export function getNavbarHeight() {
  if (typeof window !== "undefined" && window.document) {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      const returnedHeight = navbarHeight + "px";
      return returnedHeight;
    }
  }

  return "0px";
}
