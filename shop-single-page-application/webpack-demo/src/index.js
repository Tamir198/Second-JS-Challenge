import './style.css';
import Data from './mock-data.js';
import _ from 'lodash';

const productsGrid = document.querySelector('.grid-container');
const cartView = document.querySelector('.cart');
//TODO edit this
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
  addListnersToBUttons();
  toggleShopCart();
}

const addListnersToBUttons = () => {
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

function toggleShopCart() {
  let footer = document.getElementById('footer-text');
  footer.addEventListener("click", () => {
    productsGrid.classList.toggle('hide');
    cartView.classList.toggle('hide');
  });
}
