import "./style.css";

//UI container
const mainContainer = document.createElement("div");
mainContainer.className = "main-container";
document.body.appendChild(mainContainer);

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 ₿";
counterDiv.className = "counter-display";
mainContainer.appendChild(counterDiv);

// CPS
const rateDiv = document.createElement("div");
rateDiv.textContent = "0 ₿/s";
rateDiv.className = "rate-display";
mainContainer.appendChild(rateDiv);

// -make add burger button
const clickButton = document.createElement("button");
clickButton.textContent = "₿";
clickButton.className = "emoji-button";
mainContainer.insertBefore(clickButton, rateDiv);

// -make upgrade buttons
const upgrades = [
  { name: "🤖Virus Bot", cost: 10, cps: 0.1 },
  { name: "💻Old Laptop", cost: 100, cps: 2.0 },
  { name: "🎟New AMDIA GPU", cost: 500, cps: 20.0 },
];

const upgradeButtons: HTMLButtonElement[] = [];

const upgradeCounts: number[] = [0, 0, 0];

upgrades.forEach((u) => {
  const container = document.createElement("div");
  container.className = "upgrade-container";
  document.body.appendChild(container);

  const countDiv = document.createElement("div");
  countDiv.textContent = `${u.name} 0`;
  countDiv.className = "upgrade-count";
  container.appendChild(countDiv);

  const btn = document.createElement("button");
  btn.textContent = ` (${u.name} ${u.cost} ₿)`;
  btn.className = "upgrade-button";
  btn.disabled = true;
  container.appendChild(btn);
  upgradeButtons.push(btn);

  const rateInfo = document.createElement("div");
  rateInfo.textContent = `+${u.cps} ₿/s`;
  rateInfo.className = "upgrade-rate";
  container.appendChild(rateInfo);
});

// create counter var
let counter: number = 0;
let cps: number = 0;

clickButton.addEventListener("click", () => {
  counter += 1;
  counterDiv.textContent = `${Math.floor(counter)} ₿`; // updateUI
  updateUpgradeButtons();
});

upgradeButtons.forEach((btn, i) => {
  const u = upgrades[i];
  btn.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      cps += u.cps;
      upgradeCounts[i]++;
      counterDiv.textContent = `${Math.floor(counter)} ₿`;
      updateUpgradeButtons();

      //↑price w/ round
      u.cost = Math.round(u.cost * 1.1);
      //update price
      btn.textContent = ` (${u.name} ${u.cost} ₿)`;
    }
  });
});

//not open when < cost
function updateUpgradeButtons() {
  upgradeButtons.forEach((btn, i) => {
    const u = upgrades[i];
    btn.disabled = counter < u.cost;

    // update auto click number
    const countDiv = document.getElementsByClassName("upgrade-count")[i];
    if (countDiv) countDiv.textContent = `${u.name} ${upgradeCounts[i]}`;
  });

  // update CPS UI
  rateDiv.textContent = `${cps.toFixed(1)} ₿/s`;
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
