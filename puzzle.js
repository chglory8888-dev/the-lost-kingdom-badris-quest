/* =====================================================
   ANCIENT GATE PUZZLE
   THE LOST KINGDOM: BADRI'S QUEST
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

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


  /* ===================================================
     VARIABLES
  =================================================== */

  let selectedSequence = [];

  let puzzleCompleted = false;


  const correctSequence = [
    "🌙",
    "🔥",
    "🌿",
    "⭐"
  ];


  /* ===================================================
     UPDATE SEQUENCE
  =================================================== */

  function updateSequence() {

    sequenceSlots.forEach(
      function (slot, index) {

        slot.textContent =
          selectedSequence[index] || "?";

      }
    );

  }


  /* ===================================================
     MESSAGE
  =================================================== */

  function setPuzzleMessage(
    text,
    type
  ) {

    if (!puzzleMessage) {
      return;
    }

    puzzleMessage.textContent =
      text;


    if (type === "success") {

      puzzleMessage.style.color =
        "#7dff9c";

    }
    else if (type === "error") {

      puzzleMessage.style.color =
        "#ff7777";

    }
    else {

      puzzleMessage.style.color =
        "#f2d56b";

    }

  }


  /* ===================================================
     SYMBOL CLICK
  =================================================== */

  symbolButtons.forEach(
    function (button) {

      /*
       * Make sure button is clickable
       */

      button.style.pointerEvents =
        "auto";

      button.style.position =
        "relative";

      button.style.zIndex =
        "100";


      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

          event.stopPropagation();


          if (puzzleCompleted) {
            return;
          }


          if (
            selectedSequence.length >= 4
          ) {

            return;

          }


          const symbol =
            button.getAttribute(
              "data-symbol"
            );


          if (!symbol) {
            return;
          }


          selectedSequence.push(
            symbol
          );


          updateSequence();


          /*
           * Button animation
           */

          button.classList.add(
            "symbol-selected"
          );


          setTimeout(
            function () {

              button.classList.remove(
                "symbol-selected"
              );

            },
            200
          );


          /*
           * Check after 4 clicks
           */

          if (
            selectedSequence.length === 4
          ) {

            checkPuzzle();

          }

        },
        false
      );

    }
  );


  /* ===================================================
     CHECK PUZZLE
  =================================================== */

  function checkPuzzle() {

    const correct =
      selectedSequence.length === 4 &&
      selectedSequence.every(
        function (
          symbol,
          index
        ) {

          return (
            symbol ===
            correctSequence[index]
          );

        }
      );


    /* ================= WRONG ================= */

    if (!correct) {

      setPuzzleMessage(
        "❌ Wrong sequence! Try again.",
        "error"
      );


      if (puzzleScreen) {

        puzzleScreen.classList.add(
          "puzzle-shake"
        );

      }


      setTimeout(
        function () {

          selectedSequence = [];

          updateSequence();


          if (puzzleScreen) {

            puzzleScreen.classList.remove(
              "puzzle-shake"
            );

          }

        },
        800
      );


      return;

    }


    /* ================= CORRECT ================= */

    puzzleCompleted = true;

    window.gateUnlocked = true;


    setPuzzleMessage(
      "🔓 CORRECT! Ancient Gate unlocked!",
      "success"
    );


    /*
     * Complete quest
     */

    if (
      typeof window.completeQuest ===
      "function"
    ) {

      window.completeQuest(
        "gate"
      );

    }


    /*
     * Open gate
     */

    if (ancientGate) {

      ancientGate.textContent =
        "🚪";

      ancientGate.classList.add(
        "gate-unlocked"
      );

    }


    /*
     * Game message
     */

    if (
      typeof window.showMessage ===
      "function"
    ) {

      window.showMessage(
        "🔓 The Ancient Gate has opened!"
      );

    }


    /*
     * Close puzzle
     */

    setTimeout(
      function () {

        if (puzzleScreen) {

          puzzleScreen.classList.add(
            "hidden"
          );

        }


        /*
         * Chapter 2
         */

        if (
          typeof window.startVillageChapter ===
          "function"
        ) {

          window.startVillageChapter();

        }


        setTimeout(
          function () {

            if (
              typeof window.openChapter2 ===
              "function"
            ) {

              window.openChapter2();

            }

          },
          500
        );

      },
      1500
    );

  }


  /* ===================================================
     RESET
  =================================================== */

  if (resetPuzzle) {

    resetPuzzle.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();


        if (puzzleCompleted) {
          return;
        }


        selectedSequence = [];

        updateSequence();


        setPuzzleMessage(
          "",
          ""
        );

      }
    );

  }


  /* ===================================================
     HINT
  =================================================== */

  if (hintButton) {

    hintButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();


        if (puzzleCompleted) {
          return;
        }


        setPuzzleMessage(
          "💡 Hint: 🌙 → 🔥 → 🌿 → ⭐",
          "hint"
        );

      }
    );

  }


  /* ===================================================
     CLOSE
  =================================================== */

  if (closePuzzle) {

    closePuzzle.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();


        if (puzzleScreen) {

          puzzleScreen.classList.add(
            "hidden"
          );

        }

      }
    );

  }


  /* ===================================================
     OPEN PUZZLE
  =================================================== */

  window.openAncientGatePuzzle =
    function () {

      selectedSequence = [];

      puzzleCompleted = false;


      updateSequence();


      setPuzzleMessage(
        "",
        ""
      );


      if (puzzleScreen) {

        puzzleScreen.classList.remove(
          "hidden"
        );

      }

    };


  /* ===================================================
     EXPORT
  =================================================== */

  window.checkPuzzle =
    checkPuzzle;


  window.updateSequence =
    updateSequence;


  /* ===================================================
     INITIALIZE
  =================================================== */

  updateSequence();

});
