import './style.css';
import Data from './mock-data';
import Cart from './Cart/cart'
import Shop from './Shop/shop'
import _ from 'lodash';

const productsGrid = document.querySelector('.grid-container');
const cartView = document.querySelector('.cart');

let productsInCart = {
  Apple: { totalPrice: 0, amount: 0 },
  Tomato: { totalPrice: 0, amount: 0 },
  Melon: { totalPrice: 0, amount: 0 },
  Cabbage: { totalPrice: 0, amount: 0 },
  Basil: { totalPrice: 0, amount: 0 },
  Orange: { totalPrice: 0, amount: 0 },
  Avocado: { totalPrice: 0, amount: 0 },
  Grapes: { totalPrice: 0, amount: 0 },
  Banana: { totalPrice: 0, amount: 0 }
}

window.onload = () => {
  const shop = new Shop(productsInCart);

  Data.forEach(item => {
    productsGrid.appendChild(shop.creatGridElements(item)).className = "grid-item";
  });

  shop.handleShopSlidersValueChanged();
  shop.handleGridButtonsClick();
  toggleShopAndCartPage();

}

function toggleShopAndCartPage() {
  const footer = document.getElementById('footer-text');

  footer.addEventListener("click", () => {
    productsGrid.classList.toggle('hide');
    cartView.classList.toggle('hide');

    if (!cartView.classList.contains('hide')) {
      const cart = new Cart(cartView,productsInCart);
      cart.showCartToUser();
    }

  });
}