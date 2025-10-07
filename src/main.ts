import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML =
  `<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>`;

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 🍔";
counterDiv.className = "counter-display";
document.body.appendChild(counterDiv);

// -make add burger button
const clickButton = document.createElement("button");
clickButton.textContent = "🍔";
clickButton.className = "emoji-button";
document.body.appendChild(clickButton);

// -make upgrade burger button
const upgradeButton = document.createElement("button");
upgradeButton.textContent = " (+1 per/s, 10 🍔)";
upgradeButton.className = "upgrade-button";
upgradeButton.disabled = true;
document.body.appendChild(upgradeButton);

// create counter var
let counter: number = 0;
let cps: number = 0;

clickButton.addEventListener("click", () => {
  counter += 1;
  counterDiv.textContent = `${Math.floor(counter)} 🍔`; // updateUI
});

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    cps += 1;
    counterDiv.textContent = `${Math.floor(counter)} 🍔`;
    updateUpgradeButton();
  }
});

//not open when <10
function updateUpgradeButton() {
  upgradeButton.disabled = counter < 10;
}

// requestAnimationFrame
let lastTime = performance.now();

function animate(time: number) {
  const delta = (time - lastTime) / 1000; // 1000ms
  lastTime = time;

  counter += cps * delta;
  counterDiv.textContent = `${Math.floor(counter)} 🍔`;

  updateUpgradeButton();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
