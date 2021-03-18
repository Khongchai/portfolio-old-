import { useEffect } from "react";

export default function setEventsYearsBorderPosition() {
  if (typeof window !== "undefined") {
    const border = document.getElementById("events-years-border");
    const yearsContainer = document.getElementById("years-container");
    useEffect(() => {
      if (border && yearsContainer) {
        setTimeout(() => {
          const yearsContainerTop = yearsContainer?.getBoundingClientRect().top;
          border.style.top = `${yearsContainerTop}px`;
          border.style.width = "100vw";
        }, 400);
      }
    }, [yearsContainer]);
  }
}
