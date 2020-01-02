import "../styles/styles.css";
import "lazysizes";
import MobileMenu from "./modules/MobileMenu";
import EventOnScroll from "./modules/EventOnScroll";
import StickyHeader from "./modules/StickyHeader";

new StickyHeader();
new EventOnScroll(document.querySelectorAll(".feature-item"), 70); // reusable class
new EventOnScroll(document.querySelectorAll(".testimonial"), 65);
new MobileMenu();
let modal;

document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    if (typeof modal == "undefined") {
      import(/* webpackChunkName: 'modal' */ "./modules/Modal")
        .then(x => {
          modal = new x.default();
          setTimeout(() => modal.openTheModal, 20);
        })
        .catch(() => console.log("error"));
    } else {
      modal.openTheModal();
    }
  });
});

if (module.hot) {
  // enables hot modual replacement
  module.hot.accept();
}
