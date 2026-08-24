/* =====================================================
   THE LOST KINGDOM: BADRI'S QUEST
   ADVANCED CLUE / INVESTIGATION SYSTEM
===================================================== */

let cluesFound = 0;

const clues = {

  forestSymbol: false,

  ancientScroll: false,

  crystalClue: false,

  villageClue: false

};


let currentClue = null;


/* =====================================================
   ELEMENTS
===================================================== */

const investigatePanel =
  document.getElementById(
    "investigatePanel"
  );

const investigateTitle =
  document.getElementById(
    "investigateTitle"
  );

const investigateText =
  document.getElementById(
    "investigateText"
  );

const investigateButton =
  document.getElementById(
    "investigateButton"
  );

const closeInvestigate =
  document.getElementById(
    "closeInvestigate"
  );


/* =====================================================
   CLUE DATA
===================================================== */

const clueData = {

  forestSymbol: {

    title:
      "🪨 Mysterious Stone",

    text:
      "An ancient symbol is carved into the stone. It looks like the same symbol seen near the Lost Kingdom gate.",

    reward:
      "You discovered an ancient symbol."

  },


  ancientScroll: {

    title:
      "📜 Ancient Scroll",

    text:
      "The old scroll speaks about four symbols: Moon, Fire, Nature and Star. Their order may open the Ancient Gate.",

    reward:
      "You discovered the Ancient Gate sequence."

  },


  crystalClue: {

    title:
      "🔮 Mysterious Crystal",

    text:
      "Inside the crystal you see a strange vision... King Manu is standing before a dark castle.",

    reward:
      "You discovered a vision of King Manu."

  },


  villageClue: {

    title:
      "🏘️ Village Secret",

    text:
      "The mark on this object belongs to the Forgotten Village. Someone there may know what happened to King Manu.",

    reward:
      "You discovered a clue leading to the village."

  }

};


/* =====================================================
   OPEN INVESTIGATION
===================================================== */

function openInvestigation(
  clueId
) {

  if (
    !clueData[clueId]
  ) {

    return;

  }


  currentClue =
    clueId;


  if (investigateTitle) {

    investigateTitle.textContent =
      clueData[clueId].title;

  }


  if (investigateText) {

    investigateText.textContent =
      clueData[clueId].text;

  }


  if (investigateButton) {

    investigateButton.textContent =
      clues[clueId]
        ? "✓ ALREADY INVESTIGATED"
        : "🔎 INVESTIGATE";

  }


  if (investigatePanel) {

    investigatePanel.classList.remove(
      "hidden"
    );

  }

}


/* =====================================================
   INVESTIGATE
===================================================== */

function investigateCurrentClue() {

  if (
    !currentClue
  ) {

    return;

  }


  if (
    clues[currentClue]
  ) {

    if (
      typeof window.showMessage ===
      "function"
    ) {

      window.showMessage(
        "🔎 You already investigated this clue."
      );

    }

    return;

  }


  clues[currentClue] =
    true;


  cluesFound++;


  if (investigateButton) {

    investigateButton.textContent =
      "✓ INVESTIGATED";

  }


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "🔎 Clue discovered!"
    );

  }


  /* =========================================
     SPECIAL CLUE REWARDS
  ========================================= */


  if (
    currentClue ===
    "ancientScroll"
  ) {

    if (
      typeof window.completeQuest ===
      "function"
    ) {

      window.completeQuest(
        "scroll"
      );

    }

  }


  if (
    currentClue ===
    "forestSymbol"
  ) {

    if (
      typeof window.completeQuest ===
      "function"
    ) {

      window.completeQuest(
        "clue"
      );

    }

  }


  if (
    currentClue ===
    "crystalClue"
  ) {

    if (
      typeof window.completeQuest ===
      "function"
    ) {

      window.completeQuest(
        "vision"
      );

    }

  }

}


/* =====================================================
   CLOSE
===================================================== */

function closeInvestigationPanel() {

  currentClue =
    null;


  if (investigatePanel) {

    investigatePanel.classList.add(
      "hidden"
    );

  }

}


/* =====================================================
   CLUE CLICK SYSTEM
===================================================== */

document
  .querySelectorAll(
    ".adventure-clue"
  )
  .forEach(
    function (clue) {

      clue.addEventListener(
        "click",
        function (event) {

          event.stopPropagation();


          const clueId =
            clue.dataset.clue;


          openInvestigation(
            clueId
          );

        }
      );

    }
  );


/* =====================================================
   BUTTONS
===================================================== */

if (investigateButton) {

  investigateButton.addEventListener(
    "click",
    function () {

      investigateCurrentClue();

    }
  );

}


if (closeInvestigate) {

  closeInvestigate.addEventListener(
    "click",
    function () {

      closeInvestigationPanel();

    }
  );

}


/* =====================================================
   PUBLIC FUNCTIONS
===================================================== */

window.findClue =
  function (clueId) {

    openInvestigation(
      clueId
    );

  };


window.hasClue =
  function (clueId) {

    return !!clues[clueId];

  };


window.getClueCount =
  function () {

    return cluesFound;

  };


window.resetClues =
  function () {

    cluesFound = 0;

    Object.keys(clues)
      .forEach(
        function (key) {

          clues[key] =
            false;

        }
      );

  };
