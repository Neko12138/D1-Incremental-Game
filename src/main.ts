import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 🍔";
counterDiv.className = "counter-display";
document.body.appendChild(counterDiv);

// -make button
const clickButton = document.createElement("button");
clickButton.textContent = "🍔";
clickButton.className = "emoji-button";
document.body.appendChild(clickButton);

// create counter var
let counter: number = 0;

clickButton.addEventListener("click", () => {
  counter += 1;
  counterDiv.textContent = `${counter}  🍔`; // updateUI
});

// Auto Clicker
setInterval(() => {
  counter += 1; 
  counterDiv.textContent = `${counter} 🍔`; // updateUI
}, 1000); // 1000ms = 1s