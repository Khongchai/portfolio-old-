export function getNavbarHeight() {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const navbarHeight = navbar.offsetHeight;
    return navbarHeight + "px";
  }
  return "0px";
}
