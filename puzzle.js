/* =====================================================
   THE LOST KINGDOM: BADRI'S QUEST
   ANCIENT GATE PUZZLE CONTROLLER
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const symbolButtons =
  document.querySelectorAll(
    ".symbol-buttons button"
  );

const sequenceSlots =
  document.querySelectorAll(
    "#sequenceDisplay span"
  );

const puzzleMessage =
  document.getElementById(
    "puzzleMessage"
  );

const resetPuzzle =
  document.getElementById(
    "resetPuzzle"
  );

const hintButton =
  document.getElementById(
    "hintButton"
  );

const closePuzzle =
  document.getElementById(
    "closePuzzle"
  );

const puzzleScreen =
  document.getElementById(
    "puzzleScreen"
  );

const ancientGate =
  document.getElementById(
    "ancientGate"
  );


/* =====================================================
   PUZZLE VARIABLES
===================================================== */

let selectedSequence = [];


/*
 * Correct sequence
 *
 * 🌙 Moon
 * 🔥 Fire
 * 🌿 Nature
 * ⭐ Star
 */

const correctSequence = [
  "🌙",
  "🔥",
  "🌿",
  "⭐"
];


/* =====================================================
   PUZZLE LOCK
===================================================== */

let puzzleCompleted = false;


/* =====================================================
   INITIAL STATE
===================================================== */

window.gateUnlocked =
  window.gateUnlocked || false;


/* =====================================================
   SYMBOL BUTTONS
===================================================== */

symbolButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        /*
         * Don't allow input after completion
         */

        if (puzzleCompleted) {
          return;
        }


        /*
         * Maximum 4 symbols
         */

        if (
          selectedSequence.length >= 4
        ) {

          return;

        }


        const symbol =
          button.dataset.symbol;


        if (!symbol) {
          return;
        }


        selectedSequence.push(
          symbol
        );


        updateSequence();


        /*
         * Automatically check
         * after 4 symbols
         */

        if (
          selectedSequence.length === 4
        ) {

          checkPuzzle();

        }

      }
    );

  }
);


/* =====================================================
   UPDATE SEQUENCE
===================================================== */

function updateSequence() {

  sequenceSlots.forEach(
    function (slot, index) {

      slot.textContent =
        selectedSequence[index] ||
        "?";

    }
  );

}


/* =====================================================
   CHECK PUZZLE
===================================================== */

function checkPuzzle() {

  /*
   * Prevent checking twice
   */

  if (puzzleCompleted) {
    return;
  }


  const correct =
    selectedSequence.length ===
      correctSequence.length &&
    selectedSequence.every(
      function (symbol, index) {

        return (
          symbol ===
          correctSequence[index]
        );

      }
    );


  /* ===================================================
     WRONG ANSWER
  =================================================== */

  if (!correct) {

    if (puzzleMessage) {

      puzzleMessage.textContent =
        "❌ Wrong sequence! Try again.";

      puzzleMessage.style.color =
        "#ff7777";

    }


    /*
     * Small shake animation
     */

    if (puzzleScreen) {

      puzzleScreen.classList.remove(
        "puzzle-shake"
      );


      void puzzleScreen.offsetWidth;


      puzzleScreen.classList.add(
        "puzzle-shake"
      );

    }


    /*
     * Clear wrong answer
     * after short delay
     */

    setTimeout(
      function () {

        selectedSequence = [];

        updateSequence();

      },
      900
    );


    return;

  }


  /* ===================================================
     CORRECT ANSWER
  =================================================== */

  puzzleCompleted = true;


  window.gateUnlocked =
    true;


  if (puzzleMessage) {

    puzzleMessage.textContent =
      "🔓 CORRECT! Ancient Gate unlocked!";

    puzzleMessage.style.color =
      "#7dff9c";

  }


  /* ===================================================
     COMPLETE QUEST
  =================================================== */

  if (
    typeof window.completeQuest ===
    "function"
  ) {

    window.completeQuest(
      "gate"
    );

  }


  /* ===================================================
     UPDATE GATE
  =================================================== */

  if (ancientGate) {

    ancientGate.textContent =
      "🚪";


    ancientGate.classList.add(
      "gate-unlocked"
    );

  }


  /* ===================================================
     GAME MESSAGE
  =================================================== */

  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "🔓 The Ancient Gate has opened!"
    );

  }


  /* ===================================================
     CLOSE PUZZLE
  =================================================== */

  setTimeout(
    function () {

      if (puzzleScreen) {

        puzzleScreen.classList.add(
          "hidden"
        );

      }


      /*
       * Start Chapter 2
       */

      if (
        typeof window.startVillageChapter ===
        "function"
      ) {

        window.startVillageChapter();

      }


      /*
       * Open Forgotten Village
       */

      setTimeout(
        function () {

          if (
            typeof window.openChapter2 ===
            "function"
          ) {

            window.openChapter2();

          }

        },
        800
      );

    },
    1800
  );

}


/* =====================================================
   RESET PUZZLE
===================================================== */

if (resetPuzzle) {

  resetPuzzle.addEventListener(
    "click",
    function () {

      if (puzzleCompleted) {
        return;
      }


      selectedSequence = [];


      updateSequence();


      if (puzzleMessage) {

        puzzleMessage.textContent =
          "";

        puzzleMessage.style.color =
          "";

      }

    }
  );

}


/* =====================================================
   HINT
===================================================== */

if (hintButton) {

  hintButton.addEventListener(
    "click",
    function () {

      if (puzzleCompleted) {
        return;
      }


      if (!puzzleMessage) {
        return;
      }


      puzzleMessage.textContent =
        "💡 Hint: Moon → Fire → Nature → Star";


      puzzleMessage.style.color =
        "#f2d56b";

    }
  );

}


/* =====================================================
   CLOSE PUZZLE
===================================================== */

if (closePuzzle) {

  closePuzzle.addEventListener(
    "click",
    function () {

      if (puzzleScreen) {

        puzzleScreen.classList.add(
          "hidden"
        );

      }

    }
  );

}


/* =====================================================
   OPEN PUZZLE
===================================================== */

window.openAncientGatePuzzle =
  function () {

    /*
     * Already unlocked
     */

    if (window.gateUnlocked) {

      if (
        typeof window.showMessage ===
        "function"
      ) {

        window.showMessage(
          "🔓 The Ancient Gate is already unlocked!"
        );

      }

      return;

    }


    selectedSequence = [];

    puzzleCompleted = false;


    updateSequence();


    if (puzzleMessage) {

      puzzleMessage.textContent =
        "";

      puzzleMessage.style.color =
        "";

    }


    if (puzzleScreen) {

      puzzleScreen.classList.remove(
        "hidden"
      );

    }

  };


/* =====================================================
   COMPATIBILITY
===================================================== */

window.checkPuzzle =
  checkPuzzle;

window.updateSequence =
  updateSequence;


/* =====================================================
   AUTO INITIALIZE
===================================================== */

updateSequence();


/* =====================================================
   DEBUG / TEST FUNCTION
===================================================== */

window.resetAncientGatePuzzle =
  function () {

    selectedSequence = [];

    puzzleCompleted = false;

    window.gateUnlocked =
      false;


    updateSequence();


    if (puzzleMessage) {

      puzzleMessage.textContent =
        "";

    }


    if (ancientGate) {

      ancientGate.textContent =
        "🚪";

      ancientGate.classList.remove(
        "gate-unlocked"
      );

    }

  };
