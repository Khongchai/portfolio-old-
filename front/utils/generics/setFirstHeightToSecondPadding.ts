export default function setFirstHeightToSecondPadding(
  from: HTMLElement,
  to: HTMLElement,
  extraEM?: number
) {
  extraEM = extraEM ? extraEM : 0;
  const height = parseInt(
    window.getComputedStyle(from!).getPropertyValue("height")
  );
  to.style.paddingTop = `calc(${height}px + ${extraEM}em)`;
}
