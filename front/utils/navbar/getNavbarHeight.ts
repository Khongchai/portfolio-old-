export function getNavbarHeight() {
  if (typeof window !== "undefined" && window.document) {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      return navbarHeight + "px";
    }
  }

  return "0px";
}
