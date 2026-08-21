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


let selectedSequence = [];


const correctSequence = [
  "🌙",
  "🔥",
  "🌿",
  "⭐"
];


symbolButtons.forEach((button) => {

  button.addEventListener("click", () => {

    if (
      selectedSequence.length >= 4
    ) {
      return;
    }


    const symbol =
      button.dataset.symbol;


    selectedSequence.push(symbol);

    updateSequence();


    if (
      selectedSequence.length === 4
    ) {

      checkPuzzle();

    }

  });

});


function updateSequence() {

  sequenceSlots.forEach(
    (slot, index) => {

      slot.textContent =
        selectedSequence[index] || "?";

    }
  );

}


function checkPuzzle() {

  const correct =
    selectedSequence.length ===
      correctSequence.length &&
    selectedSequence.every(
      (symbol, index) =>
        symbol === correctSequence[index]
    );


  if (!correct) {

    puzzleMessage.textContent =
      "❌ Wrong sequence! Try again.";

    puzzleMessage.style.color =
      "#ff7777";

    return;

  }


  puzzleMessage.textContent =
    "🔓 CORRECT! Ancient Gate unlocked!";

  puzzleMessage.style.color =
    "#7dff9c";


  window.gateUnlocked = true;


  if (
    typeof window.completeQuest ===
    "function"
  ) {

    window.completeQuest("gate");

  }


  const gate =
    document.getElementById(
      "ancientGate"
    );


  if (gate) {

    gate.textContent = "🚪";

    gate.classList.add(
      "gate-unlocked"
    );

  }


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "🔓 The Ancient Gate has opened!"
    );

  }


  setTimeout(() => {

    const screen =
      document.getElementById(
        "puzzleScreen"
      );

    if (screen) {

      screen.classList.add(
        "hidden"
      );

    }

  }, 1800);

}


resetPuzzle.addEventListener(
  "click",
  () => {

    selectedSequence = [];

    updateSequence();

    puzzleMessage.textContent = "";

  }
);


hintButton.addEventListener(
  "click",
  () => {

    puzzleMessage.textContent =
      "💡 Hint: Moon → Fire → Nature → Star";

    puzzleMessage.style.color =
      "#f2d56b";

  }
);


closePuzzle.addEventListener(
  "click",
  () => {

    const screen =
      document.getElementById(
        "puzzleScreen"
      );

    if (screen) {

      screen.classList.add(
        "hidden"
      );

    }

  }
);
