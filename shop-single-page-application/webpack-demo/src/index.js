import './style.css';
import Data from './mock-data.js';
import _ from 'lodash';

const container = document.querySelector('.grid-container')
window.onload = function () {

  Data.forEach(item => {
    const newGridItem = document.createElement('div');
    newGridItem.innerHTML = `
    <div class="card">
      <img src=${item.image} style="width:100%">
       <div class="grid-item">
         <h4><b>Name: ${item.name}</b></h4> 
          <h4><b>Price: ${item.price}$</b></h4> 
         <p>Description: ${item.description}</p> 
         <button class="grid-button" >Add to cart</button>
      </div>
   </div>
    `;

    addListnersToBUttons();
    container.appendChild(newGridItem).className = "grid-item";
  });
}

const addListnersToBUttons = () => {
  let buttons = document.querySelectorAll(".grid-button");
  for (const btn of buttons) {
    btn.addEventListener("click", (e)=>console.log(`TODO add item to cart ${e}`));
  }
}; 