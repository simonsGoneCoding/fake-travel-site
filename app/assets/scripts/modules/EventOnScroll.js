import throttle from "lodash/throttle"; // scrolling event
import debounce from "lodash/debounce"; // window resizng

class EventOnScroll {
  constructor(elements, thresholdPercent) {
    this.thresholdPercent = thresholdPercent;
    this.itemsToReveal = elements; // element parameter refers to EventOnScroll class in App.js
    this.browserHeight = window.innerHeight;
    this.hideInitially();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener(
      "resize", // re-calculating window height if window size changed
      debounce(() => {
        this.browserHeight = window.innerHeight;
      }, 250)
    );
  }

  calcCaller() {
    this.itemsToReveal.forEach(item => {
      if (item.isRevealed === false) {
        this.calculateIfScrolledTo(item);
      }
    });
  }

  calculateIfScrolledTo(item) {
    if (window.scrollY + this.browserHeight > item.offsetTop) {
      const scrollPercent =
        (item.getBoundingClientRect().top / this.browserHeight) * 100; //getBoundingClientRect() method returns size of an  element and its position relative to the viewport.

      if (scrollPercent < this.thresholdPercent) {
        //  this.thresholdPercent is the second argument in EventOnScroll class (App.js)
        item.classList.add("reveal-item--is-visible");
        item.isRevealed = true;
        if (item.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle);
        }
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(item => {
      item.classList.add("reveal-item");
      item.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

export default EventOnScroll;
