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
         <div>
         <input class="shop-slider" currentProduct="${item.name}" value="1" type="range" min="1" max="10">
         <output class="shop-slider-value">1</output> 
         </div>
         <button 
         class="grid-button" 
         productType="${item.name}" 
         productPrice="${item.price}">Add to cart</button>
      </div>
   </div>
    `;

    productsGrid.appendChild(newGridItem).className = "grid-item";
  });

  handleShopSlidersValueChanged();
  handleGridButtonsClick();
  toggleShopAndCartPage();
}

function handleShopSlidersValueChanged() {
  const cartSliders = Array.from(document.querySelectorAll('.shop-slider'));

  cartSliders.forEach(slider => {
    slider.addEventListener("change",() =>{
      slider.nextElementSibling.value = slider.value;
    })
  });

};

const handleGridButtonsClick = () => {
  let buttons = Array.from(document.querySelectorAll(".grid-button"));
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("productType");
      const price = btn.getAttribute("productPrice");
      console.log(btn.closest('div').querySelector('.shop-slider').value);
      const amountPIcked = parseInt(btn.closest('div').querySelector('.shop-slider').value);
      productsInCart[type].amount += amountPIcked;
      productsInCart[type].totalPrice = (productsInCart[type].amount * price);
    });
    //TODO change slider to 1 after the button was pressed
    btn.closest('div').querySelector('.shop-slider').textContent = "1";

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
  Object.keys(productsInCart).forEach((key) =>{
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

  setTotalCartPrice();
  

  handleCartButtonsClicked();
  handleCartSliderValueChanged();
};

const setTotalCartPrice = ()=>{
  let totalCartPrice = 0;
  Object.keys(productsInCart).forEach((key) =>{
    totalCartPrice += productsInCart[key].totalPrice;
  })

  let totalPriceDiv = document.createElement('div');
  const innerHtml = `<h4><b>Total price is: ${totalCartPrice}</b></h4>`;
  const existingPriceElement = document.querySelector('.total-cart-price');
  if(existingPriceElement){
    existingPriceElement.innerHTML = innerHtml;
  }else{
    totalPriceDiv.innerHTML = innerHtml;
    cartView.appendChild(totalPriceDiv).className = "cart-item total-cart-price";
  }
  
  
};

const handleCartButtonsClicked = () => {
  const buttons = document.querySelectorAll(".remove-all-from-cart-button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productToRemove = btn.getAttribute("currentProduct");
      productsInCart[productToRemove] = { totalPrice: 0, amount: 0 }
      btn.closest('.cart-item').innerHTML = "";
      isCartEmpty();
      setTotalCartPrice();
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
