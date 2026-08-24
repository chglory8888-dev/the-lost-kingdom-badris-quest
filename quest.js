// Quest.js
// THE LOST KINGDOM: BADRI'S QUEST
// Complete Quest System

// ==========================================
// QUEST DATA
// ==========================================

export const quests = [
  // ========================================
  // CHAPTER 1
  // ========================================

  {
    id: "ch1_quest1",
    chapter: 1,
    title: "The Mysterious Letter",
    description: "Explore the abandoned house and discover its secret.",
    objective: "Find the old wooden box.",
    status: "active",
    type: "exploration",
    reward: {
      xp: 50,
      item: "Torn Paper"
    }
  },

  {
    id: "ch1_quest2",
    chapter: 1,
    title: "The Locked Box",
    description: "The old wooden box is locked. Find a way to open it.",
    objective: "Open the mysterious wooden box.",
    status: "locked",
    type: "puzzle",
    reward: {
      xp: 75,
      item: "Ancient Coin"
    }
  },

  {
    id: "ch1_quest3",
    chapter: 1,
    title: "Three Symbols",
    description:
      "Three ancient symbols appear to hold the secret of the locked box.",
    objective: "Find the correct order of the symbols.",
    status: "locked",
    type: "puzzle",
    puzzle: {
      symbols: ["SUN", "SNAKE", "CROWN"],
      solution: ["SUN", "SNAKE", "CROWN"]
    },
    reward: {
      xp: 100,
      item: "Old Iron Key"
    }
  },

  {
    id: "ch1_quest4",
    chapter: 1,
    title: "The Forgotten Message",
    description:
      "Inside the box lies a mysterious letter. Discover what happened to the lost kingdom.",
    objective: "Read the mysterious letter.",
    status: "locked",
    type: "clue",
    reward: {
      xp: 100,
      item: "Blue Crystal"
    }
  },

  {
    id: "ch1_quest5",
    chapter: 1,
    title: "The Iron Key",
    description:
      "The old iron key must belong to a hidden door somewhere in the house.",
    objective: "Find the hidden door.",
    status: "locked",
    type: "exploration",
    reward: {
      xp: 150,
      item: "Kingdom Map Fragment"
    }
  },

  {
    id: "ch1_quest6",
    chapter: 1,
    title: "The Hidden Passage",
    description:
      "The hidden door reveals an ancient passage beneath the abandoned house.",
    objective: "Enter the secret passage.",
    status: "locked",
    type: "story",
    reward: {
      xp: 200,
      item: "Ancient Pendant"
    }
  },

  {
    id: "ch1_quest7",
    chapter: 1,
    title: "The First Revelation",
    description:
      "An ancient inscription reveals the first clue about the Lost Kingdom.",
    objective: "Examine the ancient inscription.",
    status: "locked",
    type: "story",
    reward: {
      xp: 250,
      item: "Kingdom Symbol"
    }
  }
];


// ==========================================
// GAME QUEST STATE
// ==========================================

let questState = {
  activeQuest: "ch1_quest1",
  completedQuests: [],
  collectedItems: [],
  xp: 0
};


// ==========================================
// GET ALL QUESTS
// ==========================================

export function getAllQuests() {
  return quests;
}


// ==========================================
// GET ACTIVE QUEST
// ==========================================

export function getActiveQuest() {
  return quests.find(
    (quest) => quest.id === questState.activeQuest
  );
}


// ==========================================
// GET QUEST BY ID
// ==========================================

export function getQuestById(id) {
  return quests.find(
    (quest) => quest.id === id
  );
}


// ==========================================
// CHECK QUEST STATUS
// ==========================================

export function getQuestStatus(id) {
  if (questState.completedQuests.includes(id)) {
    return "completed";
  }

  if (questState.activeQuest === id) {
    return "active";
  }

  return "locked";
}


// ==========================================
// COMPLETE QUEST
// ==========================================

export function completeQuest(id) {
  const quest = getQuestById(id);

  if (!quest) {
    console.warn("Quest not found:", id);
    return false;
  }

  // Prevent duplicate completion
  if (questState.completedQuests.includes(id)) {
    return false;
  }

  // Add completed quest
  questState.completedQuests.push(id);

  // Add XP
  if (quest.reward?.xp) {
    questState.xp += quest.reward.xp;
  }

  // Add reward item
  if (quest.reward?.item) {
    addItem(quest.reward.item);
  }

  // Find next quest
  const currentIndex = quests.findIndex(
    (q) => q.id === id
  );

  const nextQuest = quests[currentIndex + 1];

  if (nextQuest) {
    questState.activeQuest = nextQuest.id;
  } else {
    questState.activeQuest = null;
  }

  return true;
}


// ==========================================
// ADD ITEM TO INVENTORY
// ==========================================

export function addItem(item) {
  if (!item) return;

  if (!questState.collectedItems.includes(item)) {
    questState.collectedItems.push(item);
  }
}


// ==========================================
// REMOVE ITEM
// ==========================================

export function removeItem(item) {
  questState.collectedItems =
    questState.collectedItems.filter(
      (currentItem) => currentItem !== item
    );
}


// ==========================================
// CHECK INVENTORY ITEM
// ==========================================

export function hasItem(item) {
  return questState.collectedItems.includes(item);
}


// ==========================================
// GET INVENTORY
// ==========================================

export function getInventory() {
  return [...questState.collectedItems];
}


// ==========================================
// GET XP
// ==========================================

export function getXP() {
  return questState.xp;
}


// ==========================================
// GET COMPLETED QUESTS
// ==========================================

export function getCompletedQuests() {
  return [...questState.completedQuests];
}


// ==========================================
// CHECK IF QUEST IS COMPLETED
// ==========================================

export function isQuestCompleted(id) {
  return questState.completedQuests.includes(id);
}


// ==========================================
// CHECK IF QUEST IS ACTIVE
// ==========================================

export function isQuestActive(id) {
  return questState.activeQuest === id;
}


// ==========================================
// RESET QUEST SYSTEM
// ==========================================

export function resetQuests() {
  questState = {
    activeQuest: "ch1_quest1",
    completedQuests: [],
    collectedItems: [],
    xp: 0
  };
}


// ==========================================
// SAVE QUEST PROGRESS
// ==========================================

export function saveQuestProgress() {
  try {
    localStorage.setItem(
      "badriQuestProgress",
      JSON.stringify(questState)
    );

    return true;
  } catch (error) {
    console.error(
      "Failed to save quest progress:",
      error
    );

    return false;
  }
}


// ==========================================
// LOAD QUEST PROGRESS
// ==========================================

export function loadQuestProgress() {
  try {
    const savedData =
      localStorage.getItem(
        "badriQuestProgress"
      );

    if (!savedData) {
      return false;
    }

    const parsedData =
      JSON.parse(savedData);

    questState = {
      activeQuest:
        parsedData.activeQuest ?? "ch1_quest1",

      completedQuests:
        Array.isArray(parsedData.completedQuests)
          ? parsedData.completedQuests
          : [],

      collectedItems:
        Array.isArray(parsedData.collectedItems)
          ? parsedData.collectedItems
          : [],

      xp:
        typeof parsedData.xp === "number"
          ? parsedData.xp
          : 0
    };

    return true;
  } catch (error) {
    console.error(
      "Failed to load quest progress:",
      error
    );

    return false;
  }
}


// ==========================================
// GET COMPLETE GAME STATE
// ==========================================

export function getQuestState() {
  return {
    activeQuest: questState.activeQuest,

    completedQuests: [
      ...questState.completedQuests
    ],

    collectedItems: [
      ...questState.collectedItems
    ],

    xp: questState.xp
  };
}


// ==========================================
// COMPLETE ACTIVE QUEST
// ==========================================

export function completeActiveQuest() {
  if (!questState.activeQuest) {
    return false;
  }

  return completeQuest(
    questState.activeQuest
  );
}


// ==========================================
// CHAPTER COMPLETION CHECK
// ==========================================

export function isChapterCompleted(
  chapterNumber
) {
  const chapterQuests =
    quests.filter(
      (quest) =>
        quest.chapter === chapterNumber
    );

  return chapterQuests.every(
    (quest) =>
      questState.completedQuests.includes(
        quest.id
      )
  );
}


// ==========================================
// GET CHAPTER QUESTS
// ==========================================

export function getChapterQuests(
  chapterNumber
) {
  return quests.filter(
    (quest) =>
      quest.chapter === chapterNumber
  );
}


// ==========================================
// GET QUEST PROGRESS
// ==========================================

export function getQuestProgress(
  chapterNumber
) {
  const chapterQuests =
    getChapterQuests(chapterNumber);

  const completed =
    chapterQuests.filter(
      (quest) =>
        questState.completedQuests.includes(
          quest.id
        )
    ).length;

  return {
    completed,
    total: chapterQuests.length,
    percentage:
      chapterQuests.length === 0
        ? 0
        : Math.round(
            (completed /
              chapterQuests.length) *
              100
          )
  };
}
