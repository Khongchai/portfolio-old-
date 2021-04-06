export function getExtraDayOffset(
  projectBeginDay: number,
  oneMonthLengthInPixel: string
) {
  //assume all month has 31 days for simplicity sake.
  const daysInMonth = 31;
  const offsetRight =
    (parseInt(oneMonthLengthInPixel) * projectBeginDay) / daysInMonth;
  return `${Math.floor(offsetRight)}px`;
}

export function setProjectAndIndicatorFocusColor(projTitle: string) {
  const proj = document.getElementById(projTitle);
  const projIndicator = document.getElementById(`${projTitle}-time-indicator`);
  if (proj && projIndicator) {
    proj.classList.add("is-hovered-proj");
    projIndicator.classList.add("is-hovered-proj");
  }
}

export function removeProjectAndIndicatorFocusColor(projId: string) {
  const proj = document.getElementById(projId);
  const projIndicator = document.getElementById(`${projId}-time-indicator`);
  if (proj && projIndicator) {
    proj.classList.remove("is-hovered-proj");
    projIndicator.classList.remove("is-hovered-proj");
  }
}

export function setElementAsFocused(elemId: string, elemIndicatorId: string) {
  //remove previously seledcted element(s)
  const prevSelected = document.getElementsByClassName("is-selected-proj");
  const length = prevSelected.length;
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      /*
        After removing an element from a class, the second element gets pushed to the first position "0" 
      */
      prevSelected[0].classList.remove("is-selected-proj");
    }
  }
  const elem = document.getElementById(elemId);
  const elemIndicator = document.getElementById(elemIndicatorId);
  if (elem && elemIndicator) {
    elem.classList.add("is-selected-proj");
    elemIndicator.classList.add("is-selected-proj");
  }
}

export function revealTitleIfWidthLessThanTitle(projId: string) {
  const proj = document.getElementById(projId);
  const projTitle = document.getElementById(`${projId}-title`);

  if (proj && projTitle) {
    const projComputedStyle = window.getComputedStyle(proj);
    const projWidth = parseInt(projComputedStyle.getPropertyValue("width"));
    const projXPadding =
      parseInt(projComputedStyle.getPropertyValue("padding-left")) +
      parseInt(projComputedStyle.getPropertyValue("padding-right"));
    const titleWidth = parseInt(
      window.getComputedStyle(projTitle).getPropertyValue("width")
    );

    const extraRightPadding = 10;

    if (projWidth - projXPadding < titleWidth) {
      proj.style.width = `${projWidth}px`;
      if (!proj.getAttribute("originalWidht")) {
        proj.setAttribute("originalWidth", String(projWidth));
      }
      setTimeout(() => {
        proj.style.width = `${titleWidth + projXPadding + extraRightPadding}px`;
      }, 10);
    }
  }
}

export function resetWidthIfWidthNotOriginal(projId: string) {
  const proj = document.getElementById(projId);
  if (proj) {
    const currentProjWidth = parseInt(
      window.getComputedStyle(proj).getPropertyValue("width")
    );

    const originalWidth = proj.getAttribute("originalWidth")
      ? parseInt(proj.getAttribute("originalWidth")!)
      : null;
    if (originalWidth && currentProjWidth > originalWidth) {
      proj.style.width = `${originalWidth}px`;
      proj.removeAttribute("originalWidth");
    }
  }
}
