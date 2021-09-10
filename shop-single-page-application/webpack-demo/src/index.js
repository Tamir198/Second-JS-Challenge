import './style.css';
import Data from './mock-data.js';
import _ from 'lodash';

const container = document.querySelector('.grid-container')
window.onload = function () {

  Data.forEach(item => {
    const cell = document.createElement('div');
    cell.innerHTML = `
    <div class="card">
      <img alt="Avatar" style="width:100%">
       <div class="grid-item">
         <h4><b>Name: ${item.name}</b></h4> 
          <h4><b>Price: ${item.price}$</b></h4> 
         <p>Description: ${item.description}</p> 
         <button class="grid-button" >Add to cart</button>
      </div>
   </div>
    `;

    addListnersToBUttons();
    container.appendChild(cell).className = "grid-item";
  });
}

const addListnersToBUttons = () => {
  let buttons = document.querySelectorAll(".grid-button");
  for (const btn of buttons) {
    btn.addEventListener("click", ()=>console.log("TODO add item to cart"));
  }
}; 