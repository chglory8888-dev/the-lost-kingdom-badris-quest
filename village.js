const villageScreen = document.getElementById("villageScreen");
const villageNpc = document.getElementById("villageNpc");
const dialogueBox = document.getElementById("dialogueBox");
const dialogueText = document.getElementById("dialogueText");
const dialogueNext = document.getElementById("dialogueNext");
const villageQuest = document.getElementById("villageQuest");

let dialogueIndex = 0;

const villagerDialogue = [
  "👴 Old Villager: Badri... you finally reached the Forgotten Village.",
  "👴 Old Villager: King Manu was taken toward the Shadow Castle.",
  "👴 Old Villager: But the ancient path has been sealed for many years.",
  "👴 Old Villager: Find the Village Key inside the abandoned house.",
  "👴 Old Villager: Then search for the hidden symbol of King Manu.",
  "⚔️ Badri: I will find the King and bring him home!"
];


function openVillage() {

  if (!villageScreen) {
    return;
  }

  villageScreen.classList.remove("hidden");

  if (typeof window.showMessage === "function") {
    window.showMessage(
      "🏘️ Chapter 2 — Forgotten Village"
    );
  }

}


function closeVillage() {

  if (!villageScreen) {
    return;
  }

  villageScreen.classList.add("hidden");

}


function startDialogue() {

  dialogueIndex = 0;

  dialogueBox.classList.remove("hidden");

  showDialogue();

}


function showDialogue() {

  dialogueText.textContent =
    villagerDialogue[dialogueIndex];

}


dialogueNext.addEventListener("click", () => {

  dialogueIndex++;

  if (
    dialogueIndex >=
    villagerDialogue.length
  ) {

    dialogueBox.classList.add("hidden");

    completeVillageQuest();

    return;

  }

  showDialogue();

});


function completeVillageQuest() {

  if (villageQuest) {

    villageQuest.textContent =
      "☑ Talk to the Old Villager";

    villageQuest.classList.add(
      "completed"
    );

  }

  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "📜 New quest: Find the Village Key!"
    );

  }

}


if (villageNpc) {

  villageNpc.addEventListener(
    "click",
    startDialogue
  );

}


window.openVillage =
  openVillage;

window.closeVillage =
  closeVillage;

window.startDialogue =
  startDialogue;
