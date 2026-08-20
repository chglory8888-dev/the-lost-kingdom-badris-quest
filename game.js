const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");

const startButton = document.getElementById("startButton");

const player = document.getElementById("player");

const healthText = document.getElementById("health");
const coinsText = document.getElementById("coins");
const crystalText = document.getElementById("crystal");

const message = document.getElementById("message");

let playerX = 10;
let playerY = 55;

let health = 100;
let coins = 0;
let crystal = 0;

const speed = 0.45;

const keys = {};


// ============================
// START GAME
// ============================

startButton.addEventListener("click", () => {

  homeScreen.classList.add("hidden");

  gameScreen.classList.remove("hidden");

  showMessage(
    "🌲 Welcome to the Dark Forest. Find the Crystal Fragment!"
  );

});


// ============================
// KEYBOARD
// ============================

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

});


window.addEventListener("keyup", (event) => {

  keys[event.code] = false;

});


// ============================
// MOBILE CONTROLS
// ============================

document.querySelectorAll(".controls button").forEach((button) => {

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


  button.addEventListener("pointerleave", () => {

    keys[key] = false;

  });

});


// ============================
// GAME LOOP
// ============================

function gameLoop() {

  if (!gameScreen.classList.contains("hidden")) {

    movePlayer();

    collectItems();

    checkEnemies();

  }

  requestAnimationFrame(gameLoop);

}

gameLoop();


// ============================
// PLAYER MOVEMENT
// ============================

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


  // Keep player inside forest

  playerX = Math.max(2, Math.min(94, playerX));

  playerY = Math.max(12, Math.min(84, playerY));


  player.style.left = playerX + "%";

  player.style.top = playerY + "%";

}


// ============================
// DISTANCE CHECK
// ============================

function distance(element1, element2) {

  const rect1 = element1.getBoundingClientRect();

  const rect2 = element2.getBoundingClientRect();


  const x1 = rect1.left + rect1.width / 2;

  const y1 = rect1.top + rect1.height / 2;


  const x2 = rect2.left + rect2.width / 2;

  const y2 = rect2.top + rect2.height / 2;


  return Math.sqrt(

    Math.pow(x1 - x2, 2) +

    Math.pow(y1 - y2, 2)

  );

}


// ============================
// COLLECT ITEMS
// ============================

function collectItems() {

  document.querySelectorAll(".coin").forEach((coin) => {

    if (

      coin.style.display !== "none" &&

      distance(player, coin) < 55

    ) {

      coin.style.display = "none";

      coins++;

      coinsText.textContent = coins;

      showMessage("🪙 Coin collected!");

    }

  });


  const key = document.getElementById("key");


  if (

    key.style.display !== "none" &&

    distance(player, key) < 55

  ) {

    key.style.display = "none";

    showMessage("🗝️ Ancient Key found!");

  }


  const crystalItem =
    document.getElementById("crystalItem");


  if (

    crystal === 0 &&

    crystalItem.style.display !== "none" &&

    distance(player, crystalItem) < 65

  ) {

    crystal = 1;

    crystalText.textContent = crystal;

    crystalItem.style.display = "none";

    showMessage(
      "💎 Crystal Fragment #1 recovered!"
    );

  }

}


// ============================
// ENEMY DAMAGE
// ============================

function checkEnemies() {

  document.querySelectorAll(".enemy").forEach((enemy) => {

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


// ============================
// SWORD ATTACK
// ============================

function attack() {

  player.classList.remove("attack");

  void player.offsetWidth;

  player.classList.add("attack");


  document.querySelectorAll(".enemy").forEach((enemy) => {

    if (

      enemy.style.opacity !== "0" &&

      distance(player, enemy) < 110

    ) {

      enemy.style.opacity = "0";

      showMessage("⚔️ Enemy defeated!");

    }

  });

}


// ============================
// GAME OVER
// ============================

function gameOver() {

  showMessage(
    "💀 Badri has fallen! Refresh the page to try again."
  );

}


// ============================
// MESSAGE
// ============================

function showMessage(text) {

  message.textContent = text;

  message.style.display = "block";


  clearTimeout(window.messageTimer);


  window.messageTimer = setTimeout(() => {

    message.style.display = "none";

  }, 2500);

}
