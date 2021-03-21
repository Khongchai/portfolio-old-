/*
    For some technologies that do not have their own logo that are loaded in the 
    technologyExpandButton component, they will be replaced with an alternate plaintext
    who needs to be removed manually every time the user clicks on a new project
    else it will just remain there.
*/
export default function removeAllAlternateDescriptions() {
  const alternateTexts = document.getElementsByClassName(
    "alternate-text-as-logo"
  );
  const length = alternateTexts.length;
  for (let i = 0; i < length; i++) {
    if (alternateTexts[i]) {
      alternateTexts[i].remove();
    }
  }
}
