import "./style.css";

// --- Game State ---
let counter: number = 0;
let cps: number = 0;
const upgradeButtons: HTMLButtonElement[] = [];
const upgradeCounts: { [key: string]: number } = {};
let lastTime = performance.now();

// --- Type Definitions ---
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

// --- Upgrade Data ---
const upgrades = [
  {
    name: "🤖Virus Bot",
    cost: 10,
    cps: 0.1,
    description:
      "A virus that invades other people's computers and steals computing power for you.",
  },
  {
    name: "💻Old Laptop",
    cost: 100,
    cps: 2.0,
    description: "A laptop that a college graduate no longer wants.",
  },
  {
    name: "🎟New AMDIA GPU",
    cost: 500,
    cps: 20.0,
    description:
      "A brand new AMDIA GPU designed to run triple-A games. AMDIA! YES!",
  },
  {
    name: "🎛BitcoinONLY GPU",
    cost: 1000,
    cps: 50.0,
    description:
      "A GPU that can only be used to acquire Bitcoin. \"If you don't understand something, ask someone who knows it. Don't pretend to know something you don't.\" - Chairman Mao.",
  },
  {
    name: "🖧Large GPU Matrix",
    cost: 5500,
    cps: 200.0,
    description:
      "A matrix composed of a large number of GPUs has a computing power comparable to that of a quantum computer. But would you use it to mine Bitcoin?",
  },
];

// --- UI Setup ---
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

// Cache arrays for later DOM updates
const upgradeContainers: HTMLDivElement[] = [];
const upgradeCountDisplays: HTMLDivElement[] = [];

// -make upgrade buttons
upgrades.forEach((u) => {
  upgradeCounts[u.name] = 0;

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

  const descDiv = document.createElement("div");
  descDiv.textContent = u.description;
  descDiv.className = "upgrade-description";
  container.appendChild(descDiv);

  const rateInfo = document.createElement("div");
  rateInfo.textContent = `+${u.cps} ₿/s`;
  rateInfo.className = "upgrade-rate";
  container.appendChild(rateInfo);

  // cache references for quick updates
  upgradeContainers.push(container);
  upgradeCountDisplays.push(countDiv);
});

// --- Game Logic ---
clickButton.addEventListener("click", (ev) => {
  counter += 1;
  counterDiv.textContent = `${Math.floor(counter)} ₿`; // updateUI
  updateUpgradeButtons();

  // add number
  // idea from inyoo403
  // https://github.com/inyoo403/D1.a
  const rect = clickButton.getBoundingClientRect();
  const x = ev.clientX ?? rect.left + rect.width / 2;
  const y = ev.clientY ?? rect.top + rect.height / 2;
  showFloatingText(1, x, y, mainContainer);
});

function showFloatingText(
  amount: number,
  x: number,
  y: number,
  container: HTMLElement,
) {
  const el = document.createElement("div");
  el.className = "floating-text";
  el.textContent = `+${amount}`;
  container.appendChild(el);

  const rect = container.getBoundingClientRect();
  el.style.left = `${x - rect.left}px`;
  el.style.top = `${y - rect.top}px`;

  el.addEventListener("animationend", () => el.remove());
}

upgradeButtons.forEach((btn, i) => {
  const u = upgrades[i];
  btn.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      cps += u.cps;
      upgradeCounts[u.name]++;
      counterDiv.textContent = `${Math.floor(counter)} ₿`;
      updateUpgradeButtons();

      //↑price w/ round
      u.cost = Math.round(u.cost * 1.1);
      //update price
      btn.textContent = ` (${u.name} ${u.cost} ₿)`;
    }
  });
});

// --- UI Update ---
//not open when < cost
function updateUpgradeButtons() {
  upgradeButtons.forEach((btn, i) => {
    const u = upgrades[i];
    btn.disabled = counter < u.cost;

    // update cached count display
    upgradeCountDisplays[i].textContent = `${u.name} ${upgradeCounts[u.name]}`;
  });

  // update CPS UI
  rateDiv.textContent = `${cps.toFixed(1)} ₿/s`;
}

// --- Animation Loop ---
// requestAnimationFrame
function animate(time: number) {
  const delta = (time - lastTime) / 1000; // 1000ms
  lastTime = time;

  counter += cps * delta;
  counterDiv.textContent = `${Math.floor(counter)} ₿`;

  updateUpgradeButtons();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
