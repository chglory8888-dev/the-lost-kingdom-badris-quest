const questPanel = document.getElementById("questPanel");

const questTitle = document.getElementById("questTitle");

const questObjectives =
  document.getElementById("questObjectives");


const quests = [
  {
    id: "forest",
    text: "Enter the Dark Forest",
    complete: false
  },
  {
    id: "coins",
    text: "Collect Ancient Coins",
    complete: false
  },
  {
    id: "key",
    text: "Find the Ancient Key",
    complete: false
  },
  {
    id: "gate",
    text: "Solve the Stone Gate Puzzle",
    complete: false
  },
  {
    id: "crystal",
    text: "Find the Crystal Fragment",
    complete: false
  },
  {
    id: "guardian",
    text: "Defeat the Forest Guardian",
    complete: false
  }
];


function updateQuestPanel() {

  if (!questObjectives) {
    return;
  }


  questObjectives.innerHTML = "";


  quests.forEach((quest) => {

    const item =
      document.createElement("div");

    item.className =
      quest.complete
        ? "quest-item completed"
        : "quest-item";


    item.innerHTML =
      quest.complete
        ? `☑ ${quest.text}`
        : `☐ ${quest.text}`;


    questObjectives.appendChild(item);

  });

}


function completeQuest(id) {

  const quest =
    quests.find(
      (item) => item.id === id
    );


  if (!quest) {
    return;
  }


  if (quest.complete) {
    return;
  }


  quest.complete = true;

  updateQuestPanel();


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "✅ Quest objective completed!"
    );

  }


  checkQuestCompletion();

}


function checkQuestCompletion() {

  const completed =
    quests.every(
      (quest) => quest.complete
    );


  if (!completed) {
    return;
  }


  questTitle.textContent =
    "🎉 CHAPTER 1 COMPLETE";
  if (
  typeof window.openVillage === "function"
) {
  window.openVillage();
  }


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "🏰 Chapter 2 — Forgotten Village unlocked!"
    );

  }

}


window.completeQuest =
  completeQuest;


window.updateQuestPanel =
  updateQuestPanel;


updateQuestPanel();
