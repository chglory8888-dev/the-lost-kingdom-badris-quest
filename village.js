/* =====================================================
   FORGOTTEN VILLAGE — CHAPTER 2
   VILLAGE.JS
===================================================== */

let villageKey = false;
let villagerTalked = false;
let houseUnlocked = false;

let dialogueStep = 0;


/* =====================================================
   ELEMENTS
===================================================== */

const villageNpc =
  document.getElementById("villageNpc");

const dialogueBox =
  document.getElementById("dialogueBox");

const dialogueText =
  document.getElementById("dialogueText");

const dialogueNext =
  document.getElementById("dialogueNext");

const villageQuest =
  document.getElementById("villageQuest");

const abandonedHouse =
  document.getElementById("abandonedHouse");


/* =====================================================
   DIALOGUE
===================================================== */

const villagerDialogue = [

  "👴 Old Villager: Brave traveler... who are you?",

  "🧙 Badri: I am Badri. I am searching for King Manu.",

  "👴 Old Villager: King Manu was taken to the Shadow Castle.",

  "👴 Old Villager: But the path is sealed by an ancient magic.",

  "🧙 Badri: How can I reach the castle?",

  "👴 Old Villager: First, find the Village Key hidden inside the abandoned house.",

  "👴 Old Villager: Search carefully. Four magical objects are hidden there.",

  "🧙 Badri: I will find them and rescue King Manu!",

  "👴 Old Villager: Good luck, brave Badri. The kingdom is counting on you!"

];


/* =====================================================
   OPEN VILLAGE
===================================================== */

window.openVillage =
  function () {

    const gameScreen =
      document.getElementById(
        "gameScreen"
      );

    const villageScreen =
      document.getElementById(
        "villageScreen"
      );


    if (gameScreen) {

      gameScreen.classList.add(
        "hidden"
      );

    }


    if (villageScreen) {

      villageScreen.classList.remove(
        "hidden"
      );

    }


    updateVillageQuest();

  };


/* =====================================================
   CLOSE VILLAGE
===================================================== */

window.closeVillage =
  function () {

    const villageScreen =
      document.getElementById(
        "villageScreen"
      );

    const gameScreen =
      document.getElementById(
        "gameScreen"
      );


    if (villageScreen) {

      villageScreen.classList.add(
        "hidden"
      );

    }


    if (gameScreen) {

      gameScreen.classList.remove(
        "hidden"
      );

    }

  };


/* =====================================================
   START DIALOGUE
===================================================== */

function startVillagerDialogue() {

  dialogueStep = 0;

  villagerTalked = true;

  if (dialogueBox) {

    dialogueBox.classList.remove(
      "hidden"
    );

  }


  showDialogue();

  updateVillageQuest();

}


window.startVillagerDialogue =
  startVillagerDialogue;


/* =====================================================
   SHOW DIALOGUE
===================================================== */

function showDialogue() {

  if (!dialogueText) {
    return;
  }


  if (
    dialogueStep >=
    villagerDialogue.length
  ) {

    finishDialogue();

    return;

  }


  dialogueText.textContent =
    villagerDialogue[
      dialogueStep
    ];

}


/* =====================================================
   NEXT DIALOGUE
===================================================== */

if (dialogueNext) {

  dialogueNext.addEventListener(
    "click",
    function () {

      dialogueStep++;

      showDialogue();

    }
  );

}


/* =====================================================
   FINISH DIALOGUE
===================================================== */

function finishDialogue() {

  if (dialogueBox) {

    dialogueBox.classList.add(
      "hidden"
    );

  }


  villagerTalked = true;

  updateVillageQuest();


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "🔎 Quest updated: Search the Abandoned House!"
    );

  }

}


/* =====================================================
   NPC CLICK
===================================================== */

if (villageNpc) {

  villageNpc.addEventListener(
    "click",
    function () {

      startVillagerDialogue();

    }
  );


  villageNpc.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        startVillagerDialogue();

      }

    }
  );

}


/* =====================================================
   VILLAGE QUEST
===================================================== */

function updateVillageQuest() {

  if (!villageQuest) {
    return;
  }


  if (!villagerTalked) {

    villageQuest.innerHTML =
      "☐ Talk to the Old Villager";

    return;

  }


  if (!villageKey) {

    villageQuest.innerHTML =
      "☑ Talk to the Old Villager<br>" +
      "☐ Find the Village Key<br>" +
      "☐ Search the Abandoned House<br>" +
      "☐ Discover King Manu's Secret";

    return;

  }


  villageQuest.innerHTML =
    "☑ Talk to the Old Villager<br>" +
    "☑ Find the Village Key<br>" +
    "☑ Search the Abandoned House<br>" +
    "☐ Discover King Manu's Secret<br>" +
    "☐ Open the Shadow Castle Path";

}


window.updateVillageQuest =
  updateVillageQuest;


/* =====================================================
   VILLAGE KEY
===================================================== */

window.giveVillageKey =
  function () {

    villageKey = true;

    houseUnlocked = true;


    /*
     * Make the key available
     * to inventory.js
     */

    window.villageKey = true;


    updateVillageQuest();


    if (
      typeof window.updateInventoryUI ===
      "function"
    ) {

      window.updateInventoryUI();

    }


    if (
      typeof window.showMessage ===
      "function"
    ) {

      window.showMessage(
        "🗝️ Village Key found!"
      );

    }


    /*
     * Unlock abandoned house
     */

    if (abandonedHouse) {

      abandonedHouse.classList.add(
        "unlocked"
      );

      abandonedHouse.title =
        "Enter Abandoned House";

    }

  };


/* =====================================================
   OPEN ABANDONED HOUSE
===================================================== */

if (abandonedHouse) {

  abandonedHouse.addEventListener(
    "click",
    function () {

      if (!villagerTalked) {

        if (
          typeof window.showMessage ===
          "function"
        ) {

          window.showMessage(
            "👴 Talk to the Old Villager first."
          );

        }

        return;

      }


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
   VILLAGE KEY STATUS
===================================================== */

window.hasVillageKey =
  function () {

    return villageKey;

  };


/* =====================================================
   RESET VILLAGE
===================================================== */

window.resetVillage =
  function () {

    villageKey = false;

    villagerTalked = false;

    houseUnlocked = false;

    dialogueStep = 0;

    window.villageKey = false;


    if (dialogueBox) {

      dialogueBox.classList.add(
        "hidden"
      );

    }


    updateVillageQuest();

  };


/* =====================================================
   INITIAL STATE
===================================================== */

updateVillageQuest();
