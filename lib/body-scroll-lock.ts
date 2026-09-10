let locks = 0;
let scrollY = 0;

/** iOS Safari ignores overflow:hidden on body unless the element is taken out of flow. */
export function lockBodyScroll() {
  if (typeof document === "undefined") {
    return;
  }

  if (locks === 0) {
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }

  locks += 1;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") {
    return;
  }

  locks = Math.max(0, locks - 1);
  if (locks > 0) {
    return;
  }

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  window.scrollTo(0, scrollY);
}
