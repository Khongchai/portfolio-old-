const initialDown = 0;

export default function manageBlockMove(blockId: string, operation: string) {
  const block = document.getElementById(blockId);
  if (operation === "monitor") {
    block?.addEventListener("mousedown", handleMouseDown);
    block?.addEventListener("mouseup", handleMouseUp);
    block?.addEventListener("mousemove", handleMouseDrag);
  } else {
    //remove eventlisteners
    block?.removeEventListener("mousedown", handleMouseDown);
    block?.removeEventListener("mouseup", handleMouseUp);
    block?.removeEventListener("mousedrag", handleMouseDrag);
  }
}
// asfasd
function handleMouseDown() {}

function handleMouseDrag() {}

function handleMouseUp() {}
