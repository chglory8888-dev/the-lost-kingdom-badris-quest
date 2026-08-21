const inventoryButton =
  document.getElementById(
    "inventoryButton"
  );

const inventoryScreen =
  document.getElementById(
    "inventoryScreen"
  );

const closeInventory =
  document.getElementById(
    "closeInventory"
  );

const potionInventory =
  document.getElementById(
    "potionInventory"
  );

const inventoryMessage =
  document.getElementById(
    "inventoryMessage"
  );


/* =========================
   OPEN INVENTORY
========================= */

inventoryButton.addEventListener(
  "click",
  () => {

    inventoryScreen.classList.remove(
      "hidden"
    );

    if (
      typeof updateInventoryUI ===
      "function"
    ) {

      updateInventoryUI();

    }

  }
);


/* =========================
   CLOSE INVENTORY
========================= */

closeInventory.addEventListener(
  "click",
  () => {

    inventoryScreen.classList.add(
      "hidden"
    );

    inventoryMessage.textContent =
      "";

  }
);


/* =========================
   USE POTION
========================= */

potionInventory.addEventListener(
  "click",
  () => {

    if (
      typeof window.useHealthPotion ===
      "function"
    ) {

      window.useHealthPotion();

    }

  }
);


/* =========================
   INVENTORY MESSAGE
========================= */

function showInventoryMessage(
  text
) {

  inventoryMessage.textContent =
    text;


  clearTimeout(
    window.inventoryMessageTimer
  );


  window.inventoryMessageTimer =
    setTimeout(() => {

      inventoryMessage.textContent =
        "";

    }, 2500);

}


window.showInventoryMessage =
  showInventoryMessage;
