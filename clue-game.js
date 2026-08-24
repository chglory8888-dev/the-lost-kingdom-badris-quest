// Clue.js
// THE LOST KINGDOM: BADRI'S QUEST
// Complete Clue & Mystery System

// ==========================================
// CLUE DATA
// ==========================================

export const clues = [
  // ========================================
  // CHAPTER 1
  // ========================================

  {
    id: "clue_ch1_torn_paper",
    chapter: 1,
    title: "Torn Paper",
    description:
      "A piece of an old document found inside the abandoned house.",
    type: "document",
    discovered: false,
    important: true
  },

  {
    id: "clue_ch1_three_symbols",
    chapter: 1,
    title: "Three Ancient Symbols",
    description:
      "A Sun, a Snake and a Crown are carved into the old wooden box.",
    type: "symbol",
    discovered: false,
    important: true
  },

  {
    id: "clue_ch1_ancient_coin",
    chapter: 1,
    title: "Ancient Coin",
    description:
      "An unusual coin bearing the symbol of a forgotten kingdom.",
    type: "object",
    discovered: false,
    important: false
  },

  {
    id: "clue_ch1_mysterious_letter",
    chapter: 1,
    title: "Mysterious Letter",
    description:
      "The letter suggests that the Lost Kingdom may not have disappeared forever.",
    type: "document",
    discovered: false,
    important: true
  },

  {
    id: "clue_ch1_blue_crystal",
    chapter: 1,
    title: "Blue Crystal",
    description:
      "A strange blue crystal found inside the ancient wooden box.",
    type: "artifact",
    discovered: false,
    important: true
  },

  {
    id: "clue_ch1_kingdom_symbol",
    chapter: 1,
    title: "Kingdom Symbol",
    description:
      "An ancient symbol discovered inside the hidden passage.",
    type: "symbol",
    discovered: false,
    important: true
  },

  // ========================================
  // CHAPTER 2
  // ========================================

  {
    id: "clue_ch2_broken_statue",
    chapter: 2,
    title: "Broken Statue",
    description:
      "A damaged statue with the same symbol seen in the old letter.",
    type: "object",
    discovered: false,
    important: true
  },

  {
    id: "clue_ch2_forest_mark",
    chapter: 2,
    title: "Forest Mark",
    description:
      "A mysterious mark carved into an ancient tree.",
    type: "symbol",
    discovered: false,
    important: true
  }
];


// ==========================================
// CLUE STATE
// ==========================================

let clueState = {
  discoveredClues: [],
  combinedClues: [],
  solvedMysteries: []
};


// ==========================================
// GET ALL CLUES
// ==========================================

export function getAllClues() {
  return clues;
}


// ==========================================
// GET CLUE BY ID
// ==========================================

export function getClueById(id) {
  return clues.find(
    (clue) => clue.id === id
  );
}


// ==========================================
// DISCOVER CLUE
// ==========================================

export function discoverClue(id) {
  const clue = getClueById(id);

  if (!clue) {
    console.warn("Clue not found:", id);
    return false;
  }

  if (
    !clueState.discoveredClues.includes(id)
  ) {
    clueState.discoveredClues.push(id);
  }

  return true;
}


// ==========================================
// CHECK CLUE DISCOVERED
// ==========================================

export function isClueDiscovered(id) {
  return clueState.discoveredClues.includes(
    id
  );
}


// ==========================================
// GET DISCOVERED CLUES
// ==========================================

export function getDiscoveredClues() {
  return clues.filter((clue) =>
    clueState.discoveredClues.includes(
      clue.id
    )
  );
}


// ==========================================
// GET CHAPTER CLUES
// ==========================================

export function getChapterClues(
  chapterNumber
) {
  return clues.filter(
    (clue) =>
      clue.chapter === chapterNumber
  );
}


// ==========================================
// GET DISCOVERED CHAPTER CLUES
// ==========================================

export function getDiscoveredChapterClues(
  chapterNumber
) {
  return getChapterClues(
    chapterNumber
  ).filter((clue) =>
    clueState.discoveredClues.includes(
      clue.id
    )
  );
}


// ==========================================
// COMBINATION RECIPES
// ==========================================

const clueCombinations = [
  {
    id: "combination_001",

    clues: [
      "clue_ch1_torn_paper",
      "clue_ch1_three_symbols"
    ],

    result: {
      id: "clue_ch1_symbol_message",

      title: "Hidden Symbol Message",

      description:
        "The torn paper and the three symbols reveal a hidden message.",

      type: "combined",

      chapter: 1
    }
  },

  {
    id: "combination_002",

    clues: [
      "clue_ch1_mysterious_letter",
      "clue_ch1_ancient_coin"
    ],

    result: {
      id: "clue_ch1_kingdom_connection",

      title: "Kingdom Connection",

      description:
        "The symbol on the coin matches the description in the mysterious letter.",

      type: "combined",

      chapter: 1
    }
  }
];


// ==========================================
// CHECK POSSIBLE COMBINATION
// ==========================================

export function canCombine(
  clueId1,
  clueId2
) {
  const combination =
    clueCombinations.find((combo) => {
      const required =
        combo.clues;

      return (
        required.includes(clueId1) &&
        required.includes(clueId2)
      );
    });

  if (!combination) {
    return false;
  }

  return combination.clues.every(
    (id) =>
      clueState.discoveredClues.includes(
        id
      )
  );
}


// ==========================================
// COMBINE CLUES
// ==========================================

export function combineClues(
  clueId1,
  clueId2
) {
  const combination =
    clueCombinations.find((combo) => {
      const required =
        combo.clues;

      return (
        required.includes(clueId1) &&
        required.includes(clueId2)
      );
    });

  if (!combination) {
    return {
      success: false,
      message:
        "These clues cannot be combined."
    };
  }

  const hasAllClues =
    combination.clues.every(
      (id) =>
        clueState.discoveredClues.includes(
          id
        )
    );

  if (!hasAllClues) {
    return {
      success: false,
      message:
        "You have not discovered all the required clues."
    };
  }

  if (
    clueState.combinedClues.includes(
      combination.id
    )
  ) {
    return {
      success: false,
      message:
        "These clues have already been combined."
    };
  }

  clueState.combinedClues.push(
    combination.id
  );

  return {
    success: true,
    message:
      "New evidence discovered!",
    result:
      combination.result
  };
}


// ==========================================
// GET COMBINED CLUES
// ==========================================

export function getCombinedClues() {
  return [...clueState.combinedClues];
}


// ==========================================
// SOLVE MYSTERY
// ==========================================

export function solveMystery(
  mysteryId
) {
  if (
    clueState.solvedMysteries.includes(
      mysteryId
    )
  ) {
    return false;
  }

  clueState.solvedMysteries.push(
    mysteryId
  );

  return true;
}


// ==========================================
// CHECK MYSTERY SOLVED
// ==========================================

export function isMysterySolved(
  mysteryId
) {
  return clueState.solvedMysteries.includes(
    mysteryId
  );
}


// ==========================================
// GET SOLVED MYSTERIES
// ==========================================

export function getSolvedMysteries() {
  return [
    ...clueState.solvedMysteries
  ];
}


// ==========================================
// CLUE PROGRESS
// ==========================================

export function getClueProgress(
  chapterNumber
) {
  const chapterClues =
    getChapterClues(
      chapterNumber
    );

  const discovered =
    chapterClues.filter((clue) =>
      clueState.discoveredClues.includes(
        clue.id
      )
    ).length;

  return {
    discovered,
    total: chapterClues.length,

    percentage:
      chapterClues.length === 0
        ? 0
        : Math.round(
            (discovered /
              chapterClues.length) *
              100
          )
  };
}


// ==========================================
// SAVE CLUE PROGRESS
// ==========================================

export function saveClueProgress() {
  try {
    localStorage.setItem(
      "badriQuestClues",
      JSON.stringify(clueState)
    );

    return true;
  } catch (error) {
    console.error(
      "Failed to save clue progress:",
      error
    );

    return false;
  }
}


// ==========================================
// LOAD CLUE PROGRESS
// ==========================================

export function loadClueProgress() {
  try {
    const savedData =
      localStorage.getItem(
        "badriQuestClues"
      );

    if (!savedData) {
      return false;
    }

    const parsedData =
      JSON.parse(savedData);

    clueState = {
      discoveredClues:
        Array.isArray(
          parsedData.discoveredClues
        )
          ? parsedData.discoveredClues
          : [],

      combinedClues:
        Array.isArray(
          parsedData.combinedClues
        )
          ? parsedData.combinedClues
          : [],

      solvedMysteries:
        Array.isArray(
          parsedData.solvedMysteries
        )
          ? parsedData.solvedMysteries
          : []
    };

    return true;
  } catch (error) {
    console.error(
      "Failed to load clue progress:",
      error
    );

    return false;
  }
}


// ==========================================
// RESET CLUES
// ==========================================

export function resetClues() {
  clueState = {
    discoveredClues: [],
    combinedClues: [],
    solvedMysteries: []
  };
}


// ==========================================
// GET COMPLETE CLUE STATE
// ==========================================

export function getClueState() {
  return {
    discoveredClues: [
      ...clueState.discoveredClues
    ],

    combinedClues: [
      ...clueState.combinedClues
    ],

    solvedMysteries: [
      ...clueState.solvedMysteries
    ]
  };
}
