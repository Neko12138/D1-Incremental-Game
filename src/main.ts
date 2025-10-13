import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML =
  `<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>`;

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 ₿";
counterDiv.className = "counter-display";
document.body.appendChild(counterDiv);

// -make add burger button
const clickButton = document.createElement("button");
clickButton.textContent = "₿";
clickButton.className = "emoji-button";
document.body.appendChild(clickButton);

// -make upgrade buttons
const upgrades = [
  { name: "A", cost: 10, cps: 0.1 },
  { name: "B", cost: 100, cps: 2.0 },
  { name: "C", cost: 500, cps: 20.0 },
];

const upgradeButtons: HTMLButtonElement[] = [];

upgrades.forEach((u) => {
  const btn = document.createElement("button");
  btn.textContent = ` (${u.name}: +${u.cps} per/s, ${u.cost} ₿)`;
  btn.className = "upgrade-button";
  btn.disabled = true;
  document.body.appendChild(btn);
  upgradeButtons.push(btn);
});

// create counter var
let counter: number = 0;
let cps: number = 0;

clickButton.addEventListener("click", () => {
  counter += 1;
  counterDiv.textContent = `${Math.floor(counter)} ₿`; // updateUI
});

upgradeButtons.forEach((btn, i) => {
  const u = upgrades[i];
  btn.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      cps += u.cps;
      counterDiv.textContent = `${Math.floor(counter)} ₿`;
      updateUpgradeButtons();
    }
  });
});

//not open when < cost
function updateUpgradeButtons() {
  upgradeButtons.forEach((btn, i) => {
    const u = upgrades[i];
    btn.disabled = counter < u.cost;
  });
}

// requestAnimationFrame
let lastTime = performance.now();

function animate(time: number) {
  const delta = (time - lastTime) / 1000; // 1000ms
  lastTime = time;

  counter += cps * delta;
  counterDiv.textContent = `${Math.floor(counter)} ₿`;

  updateUpgradeButtons();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
