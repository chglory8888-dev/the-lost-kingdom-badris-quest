const symbolButtons = document.querySelectorAll(
  ".symbol-buttons button"
);

const sequenceSlots = document.querySelectorAll(
  "#sequenceDisplay span"
);

const puzzleMessage = document.getElementById(
  "puzzleMessage"
);

const resetPuzzle = document.getElementById(
  "resetPuzzle"
);

const hintButton = document.getElementById(
  "hintButton"
);

const closePuzzle = document.getElementById(
  "closePuzzle"
);

let selectedSequence = [];

const correctSequence = [
  "🌙",
  "🔥",
  "🌿",
  "⭐"
];


// ==============================
// SYMBOL BUTTONS
// ==============================

symbolButtons.forEach((button) => {

  button.addEventListener("click", () => {

    if (selectedSequence.length >= 4) {
      return;
    }

    const symbol = button.dataset.symbol;

    selectedSequence.push(symbol);

    updateSequence();

    if (selectedSequence.length === 4) {
      checkPuzzle();
    }

  });

});


// ==============================
// UPDATE SEQUENCE
// ==============================

function updateSequence() {

  sequenceSlots.forEach((slot, index) => {

    slot.textContent =
      selectedSequence[index] || "?";

  });

}


// ==============================
// CHECK PUZZLE
// ==============================

function checkPuzzle() {

  const isCorrect =
    selectedSequence.length ===
      correctSequence.length &&
    selectedSequence.every(
      (symbol, index) =>
        symbol === correctSequence[index]
    );


  if (isCorrect) {

    puzzleMessage.textContent =
      "🔓 CORRECT! The Ancient Gate is unlocked!";

    puzzleMessage.style.color =
      "#7dff9c";


    // Unlock the gate

    window.gateUnlocked = true;


    const gate =
      document.getElementById("ancientGate");


    if (gate) {

      gate.textContent = "🚪";

    }


    // Show success message

    setTimeout(() => {

      puzzleMessage.textContent =
        "🎉 Secret path discovered!";

    }, 700);


    // Close puzzle

    setTimeout(() => {

      const puzzleScreen =
        document.getElementById("puzzleScreen");

      if (puzzleScreen) {

        puzzleScreen.classList.add("hidden");

      }

    }, 1800);


  } else {

    puzzleMessage.textContent =
      "❌ Wrong sequence! Try again.";

    puzzleMessage.style.color =
      "#ff7777";

  }

}


// ==============================
// RESET PUZZLE
// ==============================

resetPuzzle.addEventListener("click", () => {

  selectedSequence = [];

  updateSequence();

  puzzleMessage.textContent = "";

});


// ==============================
// HINT
// ==============================

hintButton.addEventListener("click", () => {

  puzzleMessage.textContent =
    "💡 Hint: The Moon comes first. Then follow the elements of the ancient story.";

  puzzleMessage.style.color =
    "#f2d56b";

});


// ==============================
// CLOSE PUZZLE
// ==============================

closePuzzle.addEventListener("click", () => {

  const puzzleScreen =
    document.getElementById("puzzleScreen");

  if (puzzleScreen) {

    puzzleScreen.classList.add("hidden");

  }

});
