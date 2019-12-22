import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import EventOnScroll from "./modules/EventOnScroll";

const mobileMenu = new MobileMenu();
const eventOnScroll = new EventOnScroll();

if (module.hot) {
  // enables hot modual replacement
  module.hot.accept();
}
