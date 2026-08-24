/* =====================================================
   THE LOST KINGDOM: BADRI'S QUEST
   MAIN GAME CONTROLLER
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const homeScreen =
  document.getElementById("homeScreen");

const gameScreen =
  document.getElementById("gameScreen");

const puzzleScreen =
  document.getElementById("puzzleScreen");

const inventoryScreen =
  document.getElementById("inventoryScreen");

const villageScreen =
  document.getElementById("villageScreen");

const player =
  document.getElementById("player");

const startButton =
  document.getElementById("startButton");

const healthText =
  document.getElementById("health");

const coinsText =
  document.getElementById("coins");

const crystalText =
  document.getElementById("crystal");

const message =
  document.getElementById("message");

const ancientGate =
  document.getElementById("ancientGate");


/* =====================================================
   GAME VARIABLES
===================================================== */

let playerX = 10;

let playerY = 55;

let health = 100;

let coins = 0;

let crystal = 0;

let keysCollected = 0;

let potions = 0;

let scrolls = 0;

let guardianDefeated = false;

let forestQuestStarted = false;

let gameStarted = false;


/* =====================================================
   MOVEMENT
===================================================== */

const keys = {};

const speed = 0.55;


/* =====================================================
   PUZZLE STATE
===================================================== */

window.gateUnlocked = false;


/* =====================================================
   KEYBOARD DOWN
===================================================== */

window.addEventListener(
  "keydown",
  function (event) {

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


    /*
     * Attack
     */

    if (
      event.code === "Space" &&
      !event.repeat
    ) {

      attack();

    }

  }
);


/* =====================================================
   KEYBOARD UP
===================================================== */

window.addEventListener(
  "keyup",
  function (event) {

    keys[event.code] = false;

  }
);


/* =====================================================
   START GAME
===================================================== */

if (startButton) {

  startButton.addEventListener(
    "click",
    function () {

      if (homeScreen) {
        homeScreen.classList.add(
          "hidden"
        );
      }


      if (gameScreen) {
        gameScreen.classList.remove(
          "hidden"
        );
      }


      gameStarted = true;

      forestQuestStarted = true;


      if (
        typeof window.completeQuest ===
        "function"
      ) {

        window.completeQuest(
          "forest"
        );

      }


      showMessage(
        "🌲 Quest Started: Find King Manu!"
      );

    }
  );

}


/* =====================================================
   PROFESSIONAL D-PAD
===================================================== */

const dpadButtons =
  document.querySelectorAll(
    ".dpad button[data-key]"
  );


dpadButtons.forEach(
  function (button) {

    const key =
      button.getAttribute(
        "data-key"
      );


    if (!key) {
      return;
    }


    function press(event) {

      event.preventDefault();

      keys[key] = true;


      /*
       * Center action button
       */

      if (key === "Space") {

        attack();

      }

    }


    function release(event) {

      event.preventDefault();

      keys[key] = false;

    }


    button.addEventListener(
      "pointerdown",
      press
    );


    button.addEventListener(
      "pointerup",
      release
    );


    button.addEventListener(
      "pointercancel",
      release
    );


    button.addEventListener(
      "pointerleave",
      release
    );

  }
);


/* =====================================================
   ATTACK BUTTON
===================================================== */

const attackButton =
  document.getElementById(
    "attackButton"
  );


if (attackButton) {

  attackButton.addEventListener(
    "pointerdown",
    function (event) {

      event.preventDefault();

      attack();

    }
  );

}


/* =====================================================
   INVENTORY BUTTON
===================================================== */

const mobileInventoryButton =
  document.getElementById(
    "mobileInventoryButton"
  );


if (mobileInventoryButton) {

  mobileInventoryButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      if (
        typeof window.toggleInventory ===
        "function"
      ) {

        window.toggleInventory();

      }

    }
  );

}


/* =====================================================
   TOP INVENTORY BUTTON
===================================================== */

const inventoryButton =
  document.getElementById(
    "inventoryButton"
  );


if (inventoryButton) {

  inventoryButton.addEventListener(
    "click",
    function () {

      if (
        typeof window.toggleInventory ===
        "function"
      ) {

        window.toggleInventory();

      }

    }
  );

}


/* =====================================================
   MAIN GAME LOOP
===================================================== */

function gameLoop() {

  if (
    gameStarted &&
    gameScreen &&
    !gameScreen.classList.contains(
      "hidden"
    )
  ) {

    const puzzleOpen =
      puzzleScreen &&
      !puzzleScreen.classList.contains(
        "hidden"
      );


    const inventoryOpen =
      inventoryScreen &&
      !inventoryScreen.classList.contains(
        "hidden"
      );


    const villageOpen =
      villageScreen &&
      !villageScreen.classList.contains(
        "hidden"
      );


    /*
     * Stop forest movement when
     * another screen is open.
     */

    if (
      !puzzleOpen &&
      !inventoryOpen &&
      !villageOpen
    ) {

      movePlayer();

      collectItems();

      checkEnemies();

      checkGate();

    }

  }


  requestAnimationFrame(
    gameLoop
  );

}


requestAnimationFrame(
  gameLoop
);


/* =====================================================
   PLAYER MOVEMENT
===================================================== */

function movePlayer() {

  if (!player) {
    return;
  }


  /*
   * LEFT
   */

  if (keys["ArrowLeft"]) {

    playerX -= speed;

  }


  /*
   * RIGHT
   */

  if (keys["ArrowRight"]) {

    playerX += speed;

  }


  /*
   * UP
   */

  if (keys["ArrowUp"]) {

    playerY -= speed;

  }


  /*
   * DOWN
   */

  if (keys["ArrowDown"]) {

    playerY += speed;

  }


  /*
   * Keep player inside map
   */

  playerX =
    Math.max(
      2,
      Math.min(
        94,
        playerX
      )
    );


  playerY =
    Math.max(
      12,
      Math.min(
        82,
        playerY
      )
    );


  /*
   * Update position
   */

  player.style.left =
    playerX + "%";


  player.style.top =
    playerY + "%";

}


/* =====================================================
   DISTANCE
===================================================== */

function distance(
  element1,
  element2
) {

  if (
    !element1 ||
    !element2
  ) {

    return Infinity;

  }


  const a =
    element1.getBoundingClientRect();

  const b =
    element2.getBoundingClientRect();


  const x1 =
    a.left +
    a.width / 2;

  const y1 =
    a.top +
    a.height / 2;


  const x2 =
    b.left +
    b.width / 2;

  const y2 =
    b.top +
    b.height / 2;


  return Math.sqrt(
    Math.pow(
      x1 - x2,
      2
    ) +
    Math.pow(
      y1 - y2,
      2
    )
  );

}


/* =====================================================
   QUEST HELPER
===================================================== */

function updateQuest(
  questId
) {

  if (
    typeof window.completeQuest ===
    "function"
  ) {

    window.completeQuest(
      questId
    );

  }

}


/* =====================================================
   COLLECT ITEMS
===================================================== */

function collectItems() {


  /* ================= COINS ================= */

  document
    .querySelectorAll(".coin")
    .forEach(
      function (coin) {

        if (
          coin.style.display !==
            "none" &&
          distance(
            player,
            coin
          ) < 60
        ) {

          coin.style.display =
            "none";


          coins++;


          if (coinsText) {

            coinsText.textContent =
              coins;

          }


          updateInventory();


          showMessage(
            `🪙 Coin collected! ${coins}/3`
          );


          if (coins >= 3) {

            updateQuest(
              "coins"
            );

          }

        }

      }
    );


  /* ================= ANCIENT KEY ================= */

  const key =
    document.getElementById(
      "key"
    );


  if (
    key &&
    key.style.display !==
      "none" &&
    distance(
      player,
      key
    ) < 60
  ) {

    key.style.display =
      "none";


    keysCollected = 1;


    updateInventory();


    updateQuest(
      "key"
    );


    showMessage(
      "🗝️ Ancient Key collected!"
    );

  }


  /* ================= POTION ================= */

  const potion =
    document.getElementById(
      "potion"
    );


  if (
    potion &&
    potion.style.display !==
      "none" &&
    distance(
      player,
      potion
    ) < 60
  ) {

    potion.style.display =
      "none";


    potions++;


    updateInventory();


    showMessage(
      "🧪 Health Potion collected!"
    );

  }


  /* ================= SCROLL ================= */

  const scroll =
    document.getElementById(
      "scroll"
    );


  if (
    scroll &&
    scroll.style.display !==
      "none" &&
    distance(
      player,
      scroll
    ) < 60
  ) {

    scroll.style.display =
      "none";


    scrolls++;


    updateInventory();


    showMessage(
      "📜 Ancient Scroll discovered!"
    );

  }


  /* ================= CRYSTAL ================= */

  const crystalItem =
    document.getElementById(
      "crystalItem"
    );


  if (
    crystalItem &&
    crystal === 0 &&
    crystalItem.style.display !==
      "none" &&
    distance(
      player,
      crystalItem
    ) < 65
  ) {

    crystal = 1;


    crystalItem.style.display =
      "none";


    if (crystalText) {

      crystalText.textContent =
        crystal;

    }


    updateInventory();


    updateQuest(
      "crystal"
    );


    showMessage(
      "💎 Crystal Fragment collected!"
    );

  }

}


/* =====================================================
   ENEMY SYSTEM
===================================================== */

function checkEnemies() {

  document
    .querySelectorAll(".enemy")
    .forEach(
      function (enemy) {

        if (
          enemy.style.opacity !==
            "0" &&
          distance(
            player,
            enemy
          ) < 45
        ) {

          health -= 0.25;


          health =
            Math.max(
              0,
              health
            );


          if (healthText) {

            healthText.textContent =
              Math.ceil(
                health
              );

          }


          player.classList.add(
            "damage"
          );


          setTimeout(
            function () {

              player.classList.remove(
                "damage"
              );

            },
            200
          );


          if (
            health <= 0
          ) {

            gameOver();

          }

        }

      }
    );

}


/* =====================================================
   ATTACK
===================================================== */

function attack() {

  if (!player) {
    return;
  }


  /*
   * Don't attack while puzzle
   * or inventory is open.
   */

  if (
    puzzleScreen &&
    !puzzleScreen.classList.contains(
      "hidden"
    )
  ) {

    return;

  }


  if (
    inventoryScreen &&
    !inventoryScreen.classList.contains(
      "hidden"
    )
  ) {

    return;

  }


  /*
   * Animation
   */

  player.classList.remove(
    "attack"
  );


  void player.offsetWidth;


  player.classList.add(
    "attack"
  );


  setTimeout(
    function () {

      player.classList.remove(
        "attack"
      );

    },
    300
  );


  /*
   * Hit nearby enemies
   */

  document
    .querySelectorAll(".enemy")
    .forEach(
      function (enemy) {

        if (
          enemy.style.opacity !==
            "0" &&
          distance(
            player,
            enemy
          ) < 110
        ) {

          enemy.style.opacity =
            "0";


          guardianDefeated =
            true;


          updateQuest(
            "guardian"
          );


          showMessage(
            "⚔️ Enemy defeated!"
          );

        }

      }
    );

}


/* =====================================================
   GATE CHECK
===================================================== */

function checkGate() {

  if (
    window.gateUnlocked
  ) {

    return;

  }


  if (
    ancientGate &&
    distance(
      player,
      ancientGate
    ) < 90
  ) {

    openPuzzle();

  }

}


/* =====================================================
   OPEN PUZZLE
===================================================== */

function openPuzzle() {

  if (!puzzleScreen) {
    return;
  }


  puzzleScreen.classList.remove(
    "hidden"
  );


  updateQuest(
    "gate"
  );

}


/* =====================================================
   HEALTH POTION
===================================================== */

window.useHealthPotion =
  function () {

    if (
      potions <= 0
    ) {

      showInventoryMessage(
        "❌ No potion available."
      );

      return;

    }


    if (
      health >= 100
    ) {

      showInventoryMessage(
        "❤️ Health is already full."
      );

      return;

    }


    potions--;


    health =
      Math.min(
        100,
        health + 30
      );


    if (healthText) {

      healthText.textContent =
        Math.ceil(
          health
        );

    }


    updateInventory();


    showInventoryMessage(
      "🧪 Health restored!"
    );

  };


/* =====================================================
   INVENTORY UPDATE
===================================================== */

function updateInventory() {

  const inventoryCoins =
    document.getElementById(
      "inventoryCoins"
    );


  const inventoryCrystal =
    document.getElementById(
      "inventoryCrystal"
    );


  const keyCount =
    document.getElementById(
      "keyCount"
    );


  const potionCount =
    document.getElementById(
      "potionCount"
    );


  const scrollCount =
    document.getElementById(
      "scrollCount"
    );


  if (inventoryCoins) {

    inventoryCoins.textContent =
      coins;

  }


  if (inventoryCrystal) {

    inventoryCrystal.textContent =
      crystal;

  }


  if (keyCount) {

    keyCount.textContent =
      keysCollected;

  }


  if (potionCount) {

    potionCount.textContent =
      potions;

  }


  if (scrollCount) {

    scrollCount.textContent =
      scrolls;

  }


  /*
   * Village Key
   */

  const villageKeyCount =
    document.getElementById(
      "villageKeyCount"
    );


  if (villageKeyCount) {

    villageKeyCount.textContent =
      window.villageKey
        ? "1"
        : "0";

  }

}


window.updateInventoryUI =
  updateInventory;


/* =====================================================
   INVENTORY MESSAGE
===================================================== */

function showInventoryMessage(
  text
) {

  const inventoryMessage =
    document.getElementById(
      "inventoryMessage"
    );


  if (!inventoryMessage) {
    return;
  }


  inventoryMessage.textContent =
    text;


  clearTimeout(
    window.inventoryMessageTimer
  );


  window.inventoryMessageTimer =
    setTimeout(
      function () {

        inventoryMessage.textContent =
          "";

      },
      1800
    );

}


window.showInventoryMessage =
  showInventoryMessage;


/* =====================================================
   GENERAL MESSAGE
===================================================== */

function showMessage(
  text
) {

  if (!message) {
    return;
  }


  message.textContent =
    text;


  message.style.display =
    "block";


  clearTimeout(
    window.gameMessageTimer
  );


  window.gameMessageTimer =
    setTimeout(
      function () {

        message.style.display =
          "none";

      },
      2500
    );

}


window.showMessage =
  showMessage;


/* =====================================================
   GAME OVER
===================================================== */

function gameOver() {

  gameStarted =
    false;


  keys.ArrowUp =
    false;

  keys.ArrowDown =
    false;

  keys.ArrowLeft =
    false;

  keys.ArrowRight =
    false;

  keys.Space =
    false;


  showMessage(
    "💀 Badri has fallen! Refresh the game to restart."
  );

}


/* =====================================================
   RESET PLAYER
===================================================== */

function resetPlayer() {

  playerX = 10;

  playerY = 55;

  health = 100;

  coins = 0;

  crystal = 0;

  keysCollected = 0;

  potions = 0;

  scrolls = 0;

  guardianDefeated =
    false;

  window.gateUnlocked =
    false;


  if (player) {

    player.style.left =
      playerX + "%";

    player.style.top =
      playerY + "%";

  }


  if (healthText) {

    healthText.textContent =
      "100";

  }


  if (coinsText) {

    coinsText.textContent =
      "0";

  }


  if (crystalText) {

    crystalText.textContent =
      "0";

  }


  updateInventory();

}


/* =====================================================
   VILLAGE TRANSITION
===================================================== */

window.openChapter2 =
  function () {

    if (
      gameScreen
    ) {

      gameScreen.classList.add(
        "hidden"
      );

    }


    if (
      villageScreen
    ) {

      villageScreen.classList.remove(
        "hidden"
      );

    }


    showMessage(
      "🏘️ Chapter 2 — Forgotten Village"
    );

  };


/* =====================================================
   HIDDEN HOUSE
===================================================== */

const abandonedHouse =
  document.getElementById(
    "abandonedHouse"
  );


if (abandonedHouse) {

  abandonedHouse.addEventListener(
    "click",
    function () {

      if (
        typeof window.openHiddenHouse ===
        "function"
      ) {

        window.openHiddenHouse();

      }

    }
  );

}


/* =====================================================
   INITIAL POSITION
===================================================== */

if (player) {

  player.style.left =
    playerX + "%";

  player.style.top =
    playerY + "%";

}


/* =====================================================
   INITIAL INVENTORY
===================================================== */

updateInventory();


/* =====================================================
   PREVENT DOUBLE TOUCH SCROLL
===================================================== */

document.addEventListener(
  "touchmove",
  function (event) {

    if (
      event.target.closest(
        ".controls-wrapper"
      )
    ) {

      event.preventDefault();

    }

  },
  {
    passive: false
  }
);


/* =====================================================
   EXPORT
===================================================== */

window.movePlayer =
  movePlayer;

window.attack =
  attack;

window.collectItems =
  collectItems;

window.openPuzzle =
  openPuzzle;

window.showMessage =
  showMessage;

window.resetPlayer =
  resetPlayer;
/* =====================================================
   CHAPTER 2 — FORGOTTEN VILLAGE
===================================================== */

window.villageUnlocked = false;
window.villageKey = false;
window.manuQuestStarted = false;
window.manuFound = false;


/* =====================================================
   UNLOCK ANCIENT GATE
===================================================== */

window.unlockAncientGate = function () {

  window.gateUnlocked = true;

  showMessage(
    "🔓 Ancient Gate unlocked!"
  );

  if (ancientGate) {

    ancientGate.classList.add(
      "gate-open"
    );

  }

  setTimeout(
    function () {

      window.openChapter2();

    },
    1200
  );

};


/* =====================================================
   CHAPTER 2 START
===================================================== */

window.startVillageChapter = function () {

  window.villageUnlocked = true;

  window.manuQuestStarted = true;

  showMessage(
    "🏘️ Forgotten Village discovered!"
  );

  setTimeout(
    function () {

      showMessage(
        "👑 Find King Manu and discover the secret of Badri's Quest!"
      );

    },
    2500
  );

};


/* =====================================================
   KING MANU
===================================================== */

const kingManu =
  document.getElementById(
    "kingManu"
  );


if (kingManu) {

  kingManu.addEventListener(
    "click",
    function () {

      if (!window.villageUnlocked) {

        showMessage(
          "🔒 Complete the Ancient Gate first!"
        );

        return;

      }


      if (!window.manuQuestStarted) {

        window.manuQuestStarted =
          true;

        showMessage(
          "👑 King Manu: Badri, I need your help!"
        );

        return;

      }


      if (!window.manuFound) {

        showMessage(
          "👑 King Manu: Find the Lost Crystal and return to me."
        );

      }

    }
  );

}


/* =====================================================
   LOST CRYSTAL QUEST
===================================================== */

window.completeManuQuest =
  function () {

    if (!window.manuQuestStarted) {

      return;

    }


    if (crystal < 1) {

      showMessage(
        "💎 King Manu needs the Lost Crystal!"
      );

      return;

    }


    window.manuFound = true;


    coins += 10;


    if (coinsText) {

      coinsText.textContent =
        coins;

    }


    updateInventory();


    showMessage(
      "👑 Quest Complete! King Manu rewarded you with 10 coins!"
    );


    setTimeout(
      function () {

        showMessage(
          "🗺️ A new path has appeared..."
        );

      },
      2500
    );

  };


/* =====================================================
   VILLAGE KEY
===================================================== */

window.collectVillageKey =
  function () {

    if (window.villageKey) {

      return;

    }


    window.villageKey = true;


    updateInventory();


    showMessage(
      "🗝️ Village Key collected!"
    );

  };


/* =====================================================
   VILLAGE DOOR
===================================================== */

const villageDoor =
  document.getElementById(
    "villageDoor"
  );


if (villageDoor) {

  villageDoor.addEventListener(
    "click",
    function () {

      if (!window.villageKey) {

        showMessage(
          "🔒 The door is locked. Find the Village Key."
        );

        return;

      }


      showMessage(
        "🚪 The mysterious house is open!"
      );


      if (
        typeof window.openHiddenHouse ===
        "function"
      ) {

        window.openHiddenHouse();

      }

    }
  );

}


/* =====================================================
   VILLAGE MINI GAME
===================================================== */

window.villageMiniGame =
  function () {

    if (!window.villageUnlocked) {

      showMessage(
        "🔒 Unlock the Forgotten Village first."
      );

      return;

    }


    const answer =
      prompt(
        "🧩 MINI GAME\n\nWhich item belongs to a King?\n\n1. Crown\n2. Spoon\n3. Shoe"
      );


    if (answer === "1") {

      coins += 5;


      if (coinsText) {

        coinsText.textContent =
          coins;

      }


      updateInventory();


      showMessage(
        "🎉 Correct! +5 Coins"
      );

    }
    else if (
      answer !== null
    ) {

      showMessage(
        "❌ Wrong answer! Try again."
      );

    }

  };


/* =====================================================
   NEXT CHAPTER
===================================================== */

window.unlockNextChapter =
  function () {

    if (!window.manuFound) {

      showMessage(
        "👑 Complete King Manu's quest first!"
      );

      return;

    }


    showMessage(
      "🌋 Chapter 3 unlocked — Dark Mountain!"
    );


    window.chapter3Unlocked =
      true;

  };


/* =====================================================
   CHAPTER STATUS
===================================================== */

window.getChapterStatus =
  function () {

    return {

      gateUnlocked:
        window.gateUnlocked,

      villageUnlocked:
        window.villageUnlocked,

      manuQuestStarted:
        window.manuQuestStarted,

      manuFound:
        window.manuFound,

      chapter3Unlocked:
        !!window.chapter3Unlocked

    };

  };
