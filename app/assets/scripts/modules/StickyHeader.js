import throttle from "lodash/throttle";

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header");
    this.events();
  }

  events() {
    window.addEventListener(
      "scroll",
      throttle(() => this.runOnScroll(), 200)
    );
  }

  runOnScroll() {
    if (window.scrollY > 120) {
      this.siteHeader.classList.add("site-header--dark");
    } else {
      this.siteHeader.classList.remove("site-header--dark");
    }
  }
}

export default StickyHeader;
