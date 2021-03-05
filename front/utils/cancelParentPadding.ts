export default function cancelParentPadding(elem: HTMLElement) {
  const parentPadding = window
    .getComputedStyle(elem.parentElement!)
    .getPropertyValue("padding-top");
  elem.style.transform = `translate(-${parentPadding})`;
}
