export default function setHeight(
  from: HTMLElement,
  to: HTMLElement,
  extraEM: number
) {
  const height = parseInt(
    window.getComputedStyle(from!).getPropertyValue("height")
  );
  to.style.paddingTop = `calc(${height}px + ${extraEM}em)`;
}
