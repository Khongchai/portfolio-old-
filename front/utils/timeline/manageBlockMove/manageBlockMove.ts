import handleEdgeOffset from "./handleEdgeOffset";
import { Inertia } from "./Inertia";

let dragSwitch = false;
let block: HTMLElement | null;
let initialX = 0;
let currTranslateXVal = 0;
let newTranslateXVal = 0;
const inertia = new Inertia();

export default function manageBlockMove(blockId: string, operation: string) {
  block = document.getElementById(blockId);

  if (operation === "monitor") {
    block?.addEventListener("mousedown", down);
    block?.addEventListener("mouseup", up);
    block?.addEventListener("mousemove", drag);

    block?.addEventListener("touchstart", down);
    block?.addEventListener("touchend", up);
    block?.addEventListener("touchmove", drag);
  } else {
    //remove eventlisteners
    block?.removeEventListener("mousedown", down);
    block?.removeEventListener("mouseup", up);
    block?.removeEventListener("mousemove", drag);

    block?.removeEventListener("touchstart", down);
    block?.removeEventListener("touchend", up);
    block?.removeEventListener("touchmove", drag);
  }
}

function down(e: MouseEvent | TouchEvent) {
  checkCurrentTranslateX();
  dragSwitch = true;
  initialX =
    e.type === "mousedown"
      ? (e as MouseEvent).clientX
      : (e as TouchEvent).touches[0].clientX;
  if (block) {
    block.style.transition = "";
  }
}

function drag(e: MouseEvent | TouchEvent) {
  e.preventDefault();
  if (dragSwitch) {
    const clientX =
      e.type === "mousemove"
        ? (e as MouseEvent).clientX
        : (e as TouchEvent).touches[0].clientX;
    newTranslateXVal = clientX - initialX + currTranslateXVal;
    moveBlock(newTranslateXVal);

    inertia.setPoints(clientX);
  }
}

function up() {
  currTranslateXVal = newTranslateXVal;
  dragSwitch = false;
  if (block) {
    block.style.transition = "transform .5s";
    handleEdgeOffset(undefined, true);
  }

  inertia.setDelta();
  slowDownUntil0();
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
    block.style.transform = `translateX(${xOffset.toFixed(2)}px)`;
  }
}

let time = Date.now();
function slowDownUntil0() {
  const currentDeltaAsString = inertia.getDelta().toFixed(2);
  if (
    currentDeltaAsString == "0.00" ||
    currentDeltaAsString == "0.01" ||
    currentDeltaAsString == "-0.01"
  ) {
    return;
  }

  const newTranslateVal = currTranslateXVal - inertia.getDelta();
  currTranslateXVal = newTranslateXVal;

  moveBlock(-newTranslateVal);
  console.log("still moving");

  inertia.slowDown();

  requestAnimationFrame(slowDownUntil0);
}
