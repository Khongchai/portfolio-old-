import handleEdgeOffset from "./handleEdgeOffset";

let dragSwitch = false;
let block: HTMLElement | null;
let initialX = 0;
let currTranslateXVal = 0;
let newTranslateXVal = 0;

export default function manageBlockMove(blockId: string, operation: string) {
  block = document.getElementById(blockId);

  if (operation === "monitor") {
    block?.addEventListener("mousedown", handleMouseDown);
    block?.addEventListener("mouseup", handleMouseUp);
    block?.addEventListener("mousemove", handleMouseDrag);
  } else {
    //remove eventlisteners
    block?.removeEventListener("mousedown", handleMouseDown);
    block?.removeEventListener("mouseup", handleMouseUp);
    block?.removeEventListener("mousemove", handleMouseDrag);
  }
}

function handleMouseDown(e: MouseEvent) {
  checkCurrentTranslateX();
  dragSwitch = true;
  initialX = e.clientX;
  if (block) {
    block.style.transition = "";
  }
}

function handleMouseDrag(e: MouseEvent) {
  if (dragSwitch) {
    newTranslateXVal = e.clientX - initialX + currTranslateXVal;
    moveBlock(newTranslateXVal);
  }
}

function handleMouseUp(e: MouseEvent) {
  currTranslateXVal = newTranslateXVal;
  dragSwitch = false;
  if (block) {
    block.style.transition = "transform .5s";
    handleEdgeOffset(undefined, true);
  }
}

function checkCurrentTranslateX() {
  if (block) {
    currTranslateXVal = new WebKitCSSMatrix(
      window.getComputedStyle(block).transform
    ).m41;
  }
}

function moveBlock(xOffset: number) {
  xOffset = handleEdgeOffset(xOffset) as number;
  if (block) {
    block.style.transform = `translateX(${xOffset}px)`;
  }
}
