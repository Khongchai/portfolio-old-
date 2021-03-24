export default function setScrollPositionTo2019(
  year2019Element: HTMLElement,
  timeline: HTMLElement
) {
  const year2019ElementPosition = year2019Element.getBoundingClientRect().left;
  timeline.style.transition = "transform .5s";
  timeline.style.transform = `translateX(-${year2019ElementPosition}px)`;
}
