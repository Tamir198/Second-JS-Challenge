export default class Cart {

  constructor(cartView,productsInCart) {
    this.cartView = cartView;
    this.productsInCart = productsInCart
  }

  showCartToUser() {
    this.cartView.innerHTML = 'Your cart';

    Object.keys(this.productsInCart).forEach((key) => {
      if (this.productsInCart[key].amount > 0) {

        const currentProduct = this.productsInCart[key];
        const newCartItem = document.createElement('div');

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

        this.cartView.appendChild(newCartItem).className = "cart-item";
      };
    });

    this.setTotalCartPrice();
    this.handleCartButtonsClicked();
    this.handleCartSliderValueChanged();
  }

  setTotalCartPrice = () => {
    const totalPriceDiv = document.createElement('div');
    const totalPriceInnerHtml = `<h4><b>Total price is: ${this.getTotalCartPrice()}</b></h4>`;
    const existingPriceElement = document.querySelector('.total-cart-price');

    if (existingPriceElement) {
      existingPriceElement.innerHTML = totalPriceInnerHtml;
    } else {
      totalPriceDiv.innerHTML = totalPriceInnerHtml;
      this.cartView.appendChild(totalPriceDiv).className = "cart-item total-cart-price";
    }

  };

  getTotalCartPrice = () => {
    let totalCartPrice = 0;

    Object.keys(this.productsInCart).forEach((key) => {
      totalCartPrice += this.productsInCart[key].totalPrice;
    });

    return totalCartPrice;
  }
 

  handleCartButtonsClicked = () => {
    const cartButtons = document.querySelectorAll(".remove-all-from-cart-button");

    cartButtons.forEach(btn => {
      btn.addEventListener("click", () => {

        const productToRemove = btn.getAttribute("currentProduct");
        this.productsInCart[productToRemove] = { totalPrice: 0, amount: 0 }
        btn.closest('.cart-item').innerHTML = "";

        this.isCartEmpty();
        this.setTotalCartPrice();

      });
    });
  }

  isCartEmpty = () => {
    let isEmpty = true;

    Object.keys(this.productsInCart).forEach((key) => {

      if (this.productsInCart[key].amount > 0) {
        isEmpty = false;
        return;
      }
    });

    if (isEmpty) {
      alert("This was your last item, cart will now be empty");
    };
  };

  handleCartSliderValueChanged(prodctsInCart) {
    const cartSliders = Array.from(document.querySelectorAll('.cart-slider'));

    cartSliders.forEach(slider => {
      slider.addEventListener("change", () => {

        const currentProduct = this.productsInCart[slider.getAttribute("currentProduct")];
        const productPrice = currentProduct.totalPrice / currentProduct.amount;

        slider.nextElementSibling.value = slider.value;
        currentProduct.amount = slider.value;
        currentProduct.totalPrice = slider.value * productPrice;

        this.showCartToUser();

      });
    });
  }
};
