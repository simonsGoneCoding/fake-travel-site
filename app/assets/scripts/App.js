import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";

const mobileMenu = new MobileMenu();

if (module.hot) {
  // enables hot modual replacement
  module.hot.accept();
}
