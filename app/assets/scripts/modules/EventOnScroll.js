import throttle from "lodash/throttle";

class EventOnScroll {
  constructor() {
    this.itemsToReveal = document.querySelectorAll(".feature-item");
    this.hideInitially();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
  }

  calcCaller() {
    this.itemsToReveal.forEach(item => this.calculateIfScrolledTo(item));
  }

  calculateIfScrolledTo(item) {
    // console.log(item.getBoundingClientRect().y);
    const scrollPercent =
      (item.getBoundingClientRect().top / window.innerHeight) * 100;
    // console.log(scrollPercent + " %");
    if (scrollPercent < 99) {
      item.classList.add("reveal-item--is-visible");
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(item => item.classList.add("reveal-item"));
  }
}

export default EventOnScroll;
