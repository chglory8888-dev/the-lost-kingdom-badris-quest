const hiddenHouseScreen =
  document.getElementById("hiddenHouseScreen");

const hiddenObjects =
  document.querySelectorAll(".hidden-object");

const hiddenProgress =
  document.getElementById("hiddenProgress");

const hiddenMessage =
  document.getElementById("hiddenMessage");

const closeHouse =
  document.getElementById("closeHouse");


let foundObjects = 0;

const totalObjects = 4;


/* =========================
   OPEN HOUSE
========================= */

function openHiddenHouse() {

  if (!hiddenHouseScreen) {
    return;
  }

  hiddenHouseScreen.classList.remove(
    "hidden"
  );

  foundObjects = 0;

  resetHiddenObjects();

  updateHiddenProgress();

}


/* =========================
   RESET
========================= */

function resetHiddenObjects() {

  hiddenObjects.forEach((object) => {

    object.classList.remove(
      "found"
    );

    object.style.pointerEvents =
      "auto";

  });

}


/* =========================
   OBJECT CLICK
========================= */

hiddenObjects.forEach((object) => {

  object.addEventListener("click", () => {

    if (
      object.classList.contains(
        "found"
      )
    ) {
      return;
    }


    const correct =
      object.dataset.correct === "true";


    if (!correct) {

      hiddenMessage.textContent =
        "❌ That's not what you're looking for!";

      hiddenMessage.style.color =
        "#ff7777";

      setTimeout(() => {

        hiddenMessage.textContent =
          "";

      }, 1500);

      return;

    }


    object.classList.add(
      "found"
    );

    object.style.pointerEvents =
      "none";

    foundObjects++;

    updateHiddenProgress();


    hiddenMessage.textContent =
      "✨ Correct! You found an important object.";

    hiddenMessage.style.color =
      "#7dff9c";


    if (
      foundObjects >= totalObjects
    ) {

      completeHiddenHouse();

    }

  });

});


/* =========================
   PROGRESS
========================= */

function updateHiddenProgress() {

  if (hiddenProgress) {

    hiddenProgress.textContent =
      `${foundObjects} / ${totalObjects}`;

  }

}


/* =========================
   COMPLETE
========================= */

function completeHiddenHouse() {

  hiddenMessage.textContent =
    "🎉 Hidden Object Challenge Complete!";

  hiddenMessage.style.color =
    "#f1d477";


  /*
    Add Village Key
    to inventory.
  */

  window.villageKey =
    true;


  if (
    typeof window.showMessage ===
    "function"
  ) {

    window.showMessage(
      "🗝️ Village Key added to inventory!"
    );

  }


  setTimeout(() => {

    closeHiddenHouse();

  }, 1800);

}


/* =========================
   CLOSE
========================= */

function closeHiddenHouse() {

  if (!hiddenHouseScreen) {
    return;
  }

  hiddenHouseScreen.classList.add(
    "hidden"
  );

}


if (closeHouse) {

  closeHouse.addEventListener(
    "click",
    closeHiddenHouse
  );

}


window.openHiddenHouse =
  openHiddenHouse;

window.closeHiddenHouse =
  closeHiddenHouse;
