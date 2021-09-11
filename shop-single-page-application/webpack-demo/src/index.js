import './style.css';
import Data from './mock-data.js';
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

  Data.forEach(item => {
    const newGridItem = document.createElement('div');
    newGridItem.innerHTML = `
    <div class="card">
      <img src=${item.image} style="width:100%">
       <div class="grid-item">
         <h4><b>Name: ${item.name}</b></h4> 
          <h4><b>Price: ${item.price}$</b></h4> 
         <p>Description: ${item.description}</p> 
         <button 
         class="grid-button" 
         productType="${item.name}" 
         productPrice="${item.price}">Add to cart</button>
      </div>
   </div>
    `;

    productsGrid.appendChild(newGridItem).className = "grid-item";
  });

  handleGridButtonsClick();
  toggleShopAndCartPage();
}

const handleGridButtonsClick = () => {
  let buttons = Array.from(document.querySelectorAll(".grid-button"));
  console.log(buttons);
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const type = btn.getAttribute("productType");
      const price = btn.getAttribute("productPrice");
      productsInCart[type].amount += 1;
      productsInCart[type].totalPrice = (productsInCart[type].amount * price);
    });
  });
};

function toggleShopAndCartPage() {
  let footer = document.getElementById('footer-text');
  footer.addEventListener("click", () => {

    productsGrid.classList.toggle('hide');
    cartView.classList.toggle('hide');

    if (!cartView.classList.contains('hide')) {
      showCartToUser();
    }

  });
}

function showCartToUser() {
  cartView.innerHTML = 'Your cart';
  Object.keys(productsInCart).forEach(function (key) {
    if (productsInCart[key].amount > 0) {
      const currentProduct = productsInCart[key];
      let newCartItem = document.createElement('div');
      newCartItem.innerHTML = `
        <div class="card">
            <div class="grid-item">
              <h4><b>Name: ${key}</b></h4> 
              <h4><b>Amount: ${currentProduct.amount}</b></h4> 
              <div>
              <input class="cart-slider" currentProduct="${key}" type="range" value="${currentProduct.amount}"  min="1" max="50">
              <output>${currentProduct.amount}</output> 
              </div>
              <p>Total price: ${currentProduct.totalPrice}$</p>
              <button 
              class="grid-button remove-all-from-cart-button" currentProduct="${key}"  >Remove from cart
              </button>
          </div>
        </div>
        `;
      cartView.appendChild(newCartItem).className = "cart-item";
    }
  })
  handleCartButtonsClicked();
  handleCartSliderValueChanged();
};

const handleCartButtonsClicked = () => {
  const buttons = document.querySelectorAll(".remove-all-from-cart-button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productToRemove = btn.getAttribute("currentProduct");
      productsInCart[productToRemove] = { totalPrice: 0, amount: 0 }
      btn.closest('.cart-item').innerHTML = "";
      isCartEmpty();
    });
  });
}

const isCartEmpty = ()=>{
  let isEmpty = true;

  Object.keys(productsInCart).forEach((key) => {
    console.log(productsInCart[key].amount);
    if (productsInCart[key].amount > 0) {
      isEmpty = false;
      return;
    }
  });

  if(isEmpty){
  alert("This was your last item, cart will now be empty");
  }

}


function handleCartSliderValueChanged() {
  const cartSliders = Array.from(document.querySelectorAll('.cart-slider'));
  cartSliders.forEach(slider => {
    
    slider.addEventListener("change",() =>{
      const currentProduct = productsInCart[slider.getAttribute("currentProduct")];
      const productPrice = currentProduct.totalPrice / currentProduct.amount;
      slider.nextElementSibling.value = slider.value;

      currentProduct.amount = slider.value;
      currentProduct.totalPrice = slider.value * productPrice;
      showCartToUser();
    })
  });

};
