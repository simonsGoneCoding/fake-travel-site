class EventOnScroll {
  constructor() {
    this.itemsToReveal = document.querySelectorAll(".feature-item");
    this.hideInitially();
    this.evenst();
  }

  evenst() {
    window.addEventListener("scroll", () =>
      this.itemsToReveal.forEach(item => this.calculateIfScrolledTo(item))
    );
  }

  calculateIfScrolledTo(item) {
    // console.log(item.getBoundingClientRect().y);
    const scrollPercent =
      (item.getBoundingClientRect().y / window.innerHeight) * 100;
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
