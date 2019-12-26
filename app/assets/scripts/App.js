import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import EventOnScroll from "./modules/EventOnScroll";

const mobileMenu = new MobileMenu();

new EventOnScroll(document.querySelectorAll(".feature-item"), 70); // reusable class
new EventOnScroll(document.querySelectorAll(".testimonial"), 65);

if (module.hot) {
  // enables hot modual replacement
  module.hot.accept();
}
