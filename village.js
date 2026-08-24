/* =====================================================
   THE LOST KINGDOM: BADRI'S QUEST
   CHAPTER 2 — FORGOTTEN VILLAGE
   VILLAGE CONTROLLER
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const villageScreen =
  document.getElementById("villageScreen");

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

const closeVillageButton =
  document.querySelector(".village-back");

const shadowCastleScreen =
  document.getElementById("shadowCastleScreen");


/* =====================================================
   VILLAGE STATE
===================================================== */

let villageDialogueIndex = 0;

let villageDialogueOpen = false;

let villagerTalked = false;

let villageKeyFound = false;

let houseSearched = false;

let kingSecretFound = false;

let shadowPathUnlocked = false;


/* =====================================================
   DIALOGUE
===================================================== */

const villageDialogue = [

  "👴 Old Villager: Brave traveler... why have you come to our forgotten village?",

  "🧙 Badri: I am searching for King Manu. He disappeared from Eldoria.",

  "👴 Old Villager: King Manu came here many nights ago. He was searching for an ancient secret.",

  "👴 Old Villager: But the Shadow Castle guards discovered him.",

  "🧙 Badri: Where is the Shadow Castle?",

  "👴 Old Villager: The path is sealed. Only the Village Key can open it.",

  "👴 Old Villager: Search the abandoned house. You may find what you need there.",

  "🧙 Badri: I will find the key and rescue King Manu!",

  "👴 Old Villager: Be careful, Badri. The darkness is watching you..."

];


/* =====================================================
   QUEST UPDATE
===================================================== */

function updateVillageQuest() {

  if (!villageQuest) {
    return;
  }


  if (!villagerTalked) {

    villageQuest.textContent =
      "☐ Talk to the Old Villager";

    return;

  }


  if (!villageKeyFound) {

    villageQuest.textContent =
      "☐ Find the Village Key";

    return;

  }


  if (!houseSearched) {

    villageQuest.textContent =
      "☐ Search the Abandoned House";

    return;

  }


  if (!kingSecretFound) {

    villageQuest.textContent =
      "☐ Discover King Manu's Secret";

    return;

  }


  if (!shadowPathUnlocked) {

    villageQuest.textContent =
      "☐ Open the Shadow Castle Path";

    return;

  }


  villageQuest.textContent =
    "✅ Shadow Castle Path Unlocked!";

}


/* =====================================================
   OPEN VILLAGER DIALOGUE
===================================================== */

function openVillageDialogue() {

  if (!dialogueBox || !dialogueText) {
    return;
  }


  villageDialogueOpen = true;

  villageDialogueIndex = 0;


  dialogueBox.classList.remove(
    "hidden"
  );


  showDialogueLine();

}


/* =====================================================
   SHOW DIALOGUE
===================================================== */

function showDialogueLine() {

  if (!dialogueText) {
    return;
  }


  if (
    villageDialogueIndex >=
    villageDialogue.length
  ) {

    finishVillageDialogue();

    return;

  }


  dialogueText.textContent =
    villageDialogue[
      villageDialogueIndex
    ];


  if (dialogueNext) {

    dialogueNext.textContent =
      villageDialogueIndex ===
        villageDialogue.length - 1
        ? "✓ FINISH"
        : "NEXT →";

  }

}


/* =====================================================
   NEXT DIALOGUE
===================================================== */

function nextDialogue() {

  if (!villageDialogueOpen) {
    return;
  }


  villageDialogueIndex++;


  if (
    villageDialogueIndex >=
    villageDialogue.length
  ) {

    finishVillageDialogue();

    return;

  }


  showDialogueLine();

}


/* =====================================================
   FINISH DIALOGUE
===================================================== */

function finishVillageDialogue() {

  villageDialogueOpen = false;

  villagerTalked = true;


  if (dialogueBox) {

    dialogueBox.classList.add(
      "hidden"
    );

  }


  updateVillageQuest();


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "📜 Quest Updated: Search the Abandoned House!"
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

      openVillageDialogue();

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

        openVillageDialogue();

      }

    }
  );

}


/* =====================================================
   DIALOGUE NEXT BUTTON
===================================================== */

if (dialogueNext) {

  dialogueNext.addEventListener(
    "click",
    function () {

      nextDialogue();

    }
  );

}


/* =====================================================
   VILLAGE KEY
===================================================== */

window.collectVillageKey =
  function () {

    if (villageKeyFound) {
      return;
    }


    villageKeyFound = true;

    window.villageKey = true;


    if (
      typeof window.updateInventoryUI ===
      "function"
    ) {

      window.updateInventoryUI();

    }


    updateVillageQuest();


    if (
      typeof window.showMessage ===
      "function"
    ) {

      window.showMessage(
        "🗝️ Village Key obtained!"
      );

    }

  };


/* =====================================================
   HOUSE SEARCH COMPLETE
===================================================== */

window.completeHouseSearch =
  function () {

    if (houseSearched) {
      return;
    }


    houseSearched = true;


    if (
      typeof window.showMessage ===
      "function"
    ) {

      window.showMessage(
        "🏚️ The abandoned house has been searched!"
      );

    }


    updateVillageQuest();

  };


/* =====================================================
   KING SECRET
===================================================== */

window.discoverKingSecret =
  function () {

    if (kingSecretFound) {
      return;
    }


    kingSecretFound = true;


    updateVillageQuest();


    if (
      typeof window.showMessage ===
      "function"
    ) {

      window.showMessage(
        "👑 King Manu left a secret message!"
      );

    }


    setTimeout(
      function () {

        showKingSecret();

      },
      1000
    );

  };


/* =====================================================
   KING SECRET MESSAGE
===================================================== */

function showKingSecret() {

  if (!dialogueBox || !dialogueText) {
    return;
  }


  villageDialogueOpen = true;


  dialogueBox.classList.remove(
    "hidden"
  );


  dialogueText.textContent =
    "📜 King Manu's Message: 'Badri... if you have found this message, follow the ancient path to the Shadow Castle. The darkness begins there.'";


  if (dialogueNext) {

    dialogueNext.textContent =
      "UNLOCK PATH →";

  }


  const secretHandler =
    function () {

      dialogueNext.removeEventListener(
        "click",
        secretHandler
      );


      dialogueBox.classList.add(
        "hidden"
      );


      villageDialogueOpen = false;


      unlockShadowCastlePath();

    };


  dialogueNext.addEventListener(
    "click",
    secretHandler
  );

}


/* =====================================================
   UNLOCK SHADOW CASTLE
===================================================== */

function unlockShadowCastlePath() {

  if (shadowPathUnlocked) {
    return;
  }


  shadowPathUnlocked = true;


  updateVillageQuest();


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "🏰 Shadow Castle Path unlocked!"
    );

  }


  createCastlePathButton();

}


/* =====================================================
   CREATE CASTLE PATH BUTTON
===================================================== */

function createCastlePathButton() {

  let pathButton =
    document.getElementById(
      "shadowCastleButton"
    );


  if (pathButton) {

    pathButton.classList.remove(
      "hidden"
    );

    return;

  }


  pathButton =
    document.createElement(
      "button"
    );


  pathButton.id =
    "shadowCastleButton";


  pathButton.type =
    "button";


  pathButton.textContent =
    "🏰 ENTER SHADOW CASTLE";


  pathButton.style.position =
    "absolute";


  pathButton.style.left =
    "50%";


  pathButton.style.bottom =
    "90px";


  pathButton.style.transform =
    "translateX(-50%)";


  pathButton.style.zIndex =
    "100";


  pathButton.style.padding =
    "15px 25px";


  pathButton.style.border =
    "2px solid #d4b650";


  pathButton.style.borderRadius =
    "12px";


  pathButton.style.background =
    "linear-gradient(#5d4720,#241b09)";


  pathButton.style.color =
    "white";


  pathButton.style.fontWeight =
    "bold";


  pathButton.style.fontSize =
    "16px";


  pathButton.style.cursor =
    "pointer";


  pathButton.style.boxShadow =
    "0 0 20px rgba(212,182,80,.4)";


  pathButton.addEventListener(
    "click",
    function () {

      openShadowCastle();

    }
  );


  if (villageScreen) {

    villageScreen.appendChild(
      pathButton
    );

  }

}


/* =====================================================
   OPEN SHADOW CASTLE
===================================================== */

function openShadowCastle() {

  if (!shadowPathUnlocked) {

    if (
      typeof window.showMessage ===
      "function"
    ) {

      window.showMessage(
        "🔒 The Shadow Castle path is still locked!"
      );

    }

    return;

  }


  if (villageScreen) {

    villageScreen.classList.add(
      "hidden"
    );

  }


  if (shadowCastleScreen) {

    shadowCastleScreen.classList.remove(
      "hidden"
    );

  }


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "🏰 Chapter 3 — Shadow Castle"
    );

  }

}


/* =====================================================
   RETURN TO VILLAGE
===================================================== */

window.closeVillage =
  function () {

    if (dialogueBox) {

      dialogueBox.classList.add(
        "hidden"
      );

    }


    villageDialogueOpen = false;


    if (villageScreen) {

      villageScreen.classList.add(
        "hidden"
      );

    }


    const gameScreen =
      document.getElementById(
        "gameScreen"
      );


    if (gameScreen) {

      gameScreen.classList.remove(
        "hidden"
      );

    }

  };


/* =====================================================
   INITIALIZE
===================================================== */

window.villageKey =
  window.villageKey || false;


updateVillageQuest();


/* =====================================================
   EXPORT
===================================================== */

window.openVillageDialogue =
  openVillageDialogue;

window.nextDialogue =
  nextDialogue;

window.updateVillageQuest =
  updateVillageQuest;

window.openShadowCastle =
  openShadowCastle;
