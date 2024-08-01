export function hideScrollBar() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = scrollbarWidth + "px";
}

export function displayScrollBar() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
};