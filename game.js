const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const puzzleScreen = document.getElementById("puzzleScreen");
const inventoryScreen = document.getElementById("inventoryScreen");

const startButton = document.getElementById("startButton");
const player = document.getElementById("player");

const healthText = document.getElementById("health");
const coinsText = document.getElementById("coins");
const crystalText = document.getElementById("crystal");

const message = document.getElementById("message");
const ancientGate = document.getElementById("ancientGate");

let playerX = 10;
let playerY = 55;

let health = 100;
let coins = 0;
let crystal = 0;
let keysCollected = 0;
let potions = 0;
let scrolls = 0;

let guardianDefeated = false;

window.gateUnlocked = false;

const speed = 0.45;
const keys = {};

let forestQuestStarted = false;


/* =========================
   START
========================= */

startButton.addEventListener("click", () => {

  homeScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  forestQuestStarted = true;

  if (typeof window.completeQuest === "function") {
    window.completeQuest("forest");
  }

  showMessage(
    "🌲 Quest started: Find the Lost King Manu!"
  );

});


/* =========================
   KEYBOARD
========================= */

window.addEventListener("keydown", (event) => {

  keys[event.code] = true;

  if (
    event.code === "ArrowUp" ||
    event.code === "ArrowDown" ||
    event.code === "ArrowLeft" ||
    event.code === "ArrowRight" ||
    event.code === "Space"
  ) {
    event.preventDefault();
  }

  if (event.code === "Space") {
    attack();
  }

  if (event.code === "KeyI" && !event.repeat) {

    if (typeof window.toggleInventory === "function") {
      window.toggleInventory();
    }

  }

});


window.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});
const attackButton =
  document.getElementById("attackButton");

if (attackButton) {

  attackButton.addEventListener(
    "pointerdown",
    (event) => {

      event.preventDefault();

      attack();

    }
  );

}


const mobileInventoryButton =
  document.getElementById(
    "mobileInventoryButton"
  );

if (mobileInventoryButton) {

  mobileInventoryButton.addEventListener(
    "click",
    () => {

      if (
        typeof window.toggleInventory ===
        "function"
      ) {

        window.toggleInventory();

      }

    }
  );

}

/* =========================
   MOBILE CONTROLS
========================= */

document
  .querySelectorAll(".controls button")
  .forEach((button) => {

    const key = button.dataset.key;

    button.addEventListener("pointerdown", (event) => {

      event.preventDefault();

      keys[key] = true;

      if (key === "Space") {
        attack();
      }

    });

    button.addEventListener("pointerup", () => {
      keys[key] = false;
    });

    button.addEventListener("pointercancel", () => {
      keys[key] = false;
    });

    button.addEventListener("pointerleave", () => {
      keys[key] = false;
    });

  });


/* =========================
   GAME LOOP
========================= */

function gameLoop() {

  const puzzleOpen =
    puzzleScreen &&
    !puzzleScreen.classList.contains("hidden");

  const inventoryOpen =
    inventoryScreen &&
    !inventoryScreen.classList.contains("hidden");


  if (
    !gameScreen.classList.contains("hidden") &&
    !puzzleOpen &&
    !inventoryOpen
  ) {

    movePlayer();
    collectItems();
    checkEnemies();
    checkGate();

  }

  requestAnimationFrame(gameLoop);

}

gameLoop();


/* =========================
   MOVEMENT
========================= */

function movePlayer() {

  if (keys.ArrowLeft) {
    playerX -= speed;
  }

  if (keys.ArrowRight) {
    playerX += speed;
  }

  if (keys.ArrowUp) {
    playerY -= speed;
  }

  if (keys.ArrowDown) {
    playerY += speed;
  }


  playerX = Math.max(
    2,
    Math.min(94, playerX)
  );

  playerY = Math.max(
    12,
    Math.min(84, playerY)
  );


  player.style.left = playerX + "%";
  player.style.top = playerY + "%";

}


/* =========================
   DISTANCE
========================= */

function distance(element1, element2) {

  if (!element1 || !element2) {
    return Infinity;
  }

  const a = element1.getBoundingClientRect();
  const b = element2.getBoundingClientRect();

  const x1 = a.left + a.width / 2;
  const y1 = a.top + a.height / 2;

  const x2 = b.left + b.width / 2;
  const y2 = b.top + b.height / 2;

  return Math.sqrt(
    Math.pow(x1 - x2, 2) +
    Math.pow(y1 - y2, 2)
  );

}


/* =========================
   QUEST HELPER
========================= */

function quest(id) {

  if (typeof window.completeQuest === "function") {
    window.completeQuest(id);
  }

}


/* =========================
   COLLECT ITEMS
========================= */

function collectItems() {


  /* COINS */

  document
    .querySelectorAll(".coin")
    .forEach((coin) => {

      if (
        coin.style.display !== "none" &&
        distance(player, coin) < 55
      ) {

        coin.style.display = "none";

        coins++;

        coinsText.textContent = coins;

        if (typeof window.updateInventoryUI === "function") {
          window.updateInventoryUI();
        }

        showMessage(
          `🪙 Ancient Coin collected! ${coins}/3`
        );


        if (coins >= 3) {
          quest("coins");
        }

      }

    });


  /* KEY */

  const key =
    document.getElementById("key");


  if (
    key &&
    key.style.display !== "none" &&
    distance(player, key) < 55
  ) {

    key.style.display = "none";

    keysCollected = 1;

    if (typeof window.updateInventoryUI === "function") {
      window.updateInventoryUI();
    }

    quest("key");

    showMessage(
      "🗝️ Ancient Key discovered!"
    );

  }


  /* POTION */

  const potion =
    document.getElementById("potion");


  if (
    potion &&
    potion.style.display !== "none" &&
    distance(player, potion) < 55
  ) {

    potion.style.display = "none";

    potions++;

    if (typeof window.updateInventoryUI === "function") {
      window.updateInventoryUI();
    }

    showMessage(
      "🧪 Health Potion collected!"
    );

  }


  /* SCROLL */

  const scroll =
    document.getElementById("scroll");


  if (
    scroll &&
    scroll.style.display !== "none" &&
    distance(player, scroll) < 55
  ) {

    scroll.style.display = "none";

    scrolls++;

    if (typeof window.updateInventoryUI === "function") {
      window.updateInventoryUI();
    }

    showMessage(
      "📜 Ancient Scroll discovered!"
    );

  }


  /* CRYSTAL */

  const crystalItem =
    document.getElementById("crystalItem");


  if (
    crystalItem &&
    crystal === 0 &&
    crystalItem.style.display !== "none" &&
    distance(player, crystalItem) < 65
  ) {

    crystal = 1;

    crystalText.textContent = crystal;

    crystalItem.style.display = "none";

    if (typeof window.updateInventoryUI === "function") {
      window.updateInventoryUI();
    }

    quest("crystal");

    showMessage(
      "💎 Crystal Fragment recovered!"
    );

  }

}


/* =========================
   GATE
========================= */

function checkGate() {

  if (window.gateUnlocked) {
    return;
  }


  if (
    ancientGate &&
    distance(player, ancientGate) < 85
  ) {

    openPuzzle();

  }

}


function openPuzzle() {

  if (!puzzleScreen) {
    return;
  }

  puzzleScreen.classList.remove("hidden");

}


/* =========================
   ENEMIES
========================= */

function checkEnemies() {

  document
    .querySelectorAll(".enemy")
    .forEach((enemy) => {

      if (
        enemy.style.opacity !== "0" &&
        distance(player, enemy) < 45
      ) {

        health -= 0.25;

        health = Math.max(0, health);

        healthText.textContent =
          Math.ceil(health);

        player.classList.add("damage");

        setTimeout(() => {
          player.classList.remove("damage");
        }, 200);


        if (health <= 0) {
          gameOver();
        }

      }

    });

}


/* =========================
   ATTACK
========================= */

function attack() {

  if (
    puzzleScreen &&
    !puzzleScreen.classList.contains("hidden")
  ) {
    return;
  }

  if (
    inventoryScreen &&
    !inventoryScreen.classList.contains("hidden")
  ) {
    return;
  }


  player.classList.remove("attack");

  void player.offsetWidth;

  player.classList.add("attack");


  document
    .querySelectorAll(".enemy")
    .forEach((enemy) => {

      if (
        enemy.style.opacity !== "0" &&
        distance(player, enemy) < 110
      ) {

        enemy.style.opacity = "0";

        guardianDefeated = true;

        quest("guardian");

        showMessage(
          "⚔️ Forest Guardian defeated!"
        );

      }

    });

}


/* =========================
   POTION
========================= */

window.useHealthPotion = function () {

  if (potions <= 0) {

    if (typeof window.showInventoryMessage === "function") {
      window.showInventoryMessage(
        "❌ No potion available."
      );
    }

    return;
  }


  if (health >= 100) {

    if (typeof window.showInventoryMessage === "function") {
      window.showInventoryMessage(
        "❤️ Health is already full."
      );
    }

    return;
  }


  potions--;

  health = Math.min(
    100,
    health + 30
  );

  healthText.textContent =
    Math.ceil(health);


  if (typeof window.updateInventoryUI === "function") {
    window.updateInventoryUI();
  }


  if (typeof window.showInventoryMessage === "function") {
    window.showInventoryMessage(
      "🧪 Health restored!"
    );
  }

};


/* =========================
   GAME OVER
========================= */

function gameOver() {

  keys.ArrowUp = false;
  keys.ArrowDown = false;
  keys.ArrowLeft = false;
  keys.ArrowRight = false;

  showMessage(
    "💀 Badri has fallen! Refresh to restart."
  );

}


/* =========================
   MESSAGE
========================= */

function showMessage(text) {

  if (!message) {
    return;
  }

  message.textContent = text;

  message.style.display = "block";

  clearTimeout(window.messageTimer);

  window.messageTimer =
    setTimeout(() => {

      message.style.display = "none";

    }, 2500);

}


window.showMessage = showMessage;
window.updateInventoryUI =
  window.updateInventoryUI || function () {};
