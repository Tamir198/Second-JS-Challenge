export default class Shop {
  test() {
    console.log('Coming from Shop');
  }

  constructor(productsInCart){
    this.productsInCart = productsInCart
  }

  creatGridElements(item){
    const newGridItem = document.createElement('div');
    newGridItem.innerHTML = 
    `
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

    return newGridItem;
  }


  handleShopSlidersValueChanged() {

    const shopSliders = Array.from(document.querySelectorAll('.shop-slider'));
  
    shopSliders.forEach(slider => {
      slider.addEventListener("change",() =>{
        slider.nextElementSibling.value = slider.value;
      })
    });
  
  };

  handleGridButtonsClick = () => {
    let gridButtons = Array.from(document.querySelectorAll(".grid-button"));
  
    gridButtons.forEach(btn => {
      btn.addEventListener("click", () => {
  
        const type = btn.getAttribute("productType");
        const price = btn.getAttribute("productPrice");
        const productAmountPickedByUser = parseInt(btn.closest('div').querySelector('.shop-slider').value);
        
        this.productsInCart[type].amount += productAmountPickedByUser;
        this.productsInCart[type].totalPrice = (this.productsInCart[type].amount * price);
      });
  
      //TODO change slider to 1 after add to cart button clicked
      btn.closest('div').querySelector('.shop-slider').value = "1";
  
    });
  };
}