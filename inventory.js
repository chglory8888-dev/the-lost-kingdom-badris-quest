// Inventory.js
// THE LOST KINGDOM: BADRI'S QUEST
// Complete Inventory System

// ==========================================
// ITEM DATABASE
// ==========================================

export const items = [
  // CHAPTER 1
  {
    id: "item_candle",
    name: "Old Candle",
    description: "An old candle found inside the abandoned house.",
    category: "tool",
    usable: true,
    stackable: false
  },

  {
    id: "item_rusty_key",
    name: "Rusty Key",
    description: "A small rusty key. It may open an old lock.",
    category: "key",
    usable: true,
    stackable: false
  },

  {
    id: "item_torn_paper",
    name: "Torn Paper",
    description: "A mysterious piece of an old document.",
    category: "clue",
    usable: false,
    stackable: false
  },

  {
    id: "item_ancient_coin",
    name: "Ancient Coin",
    description: "A coin carrying the symbol of a forgotten kingdom.",
    category: "clue",
    usable: true,
    stackable: false
  },

  {
    id: "item_strange_stone",
    name: "Strange Stone",
    description: "A strange stone with a faint symbol engraved on it.",
    category: "artifact",
    usable: true,
    stackable: false
  },

  {
    id: "item_old_iron_key",
    name: "Old Iron Key",
    description: "A heavy iron key discovered inside the wooden box.",
    category: "key",
    usable: true,
    stackable: false
  },

  {
    id: "item_blue_crystal",
    name: "Blue Crystal",
    description: "A mysterious blue crystal that seems to contain hidden energy.",
    category: "artifact",
    usable: true,
    stackable: false
  },

  {
    id: "item_kingdom_map_fragment",
    name: "Kingdom Map Fragment",
    description: "A fragment of an ancient map showing part of the Lost Kingdom.",
    category: "map",
    usable: true,
    stackable: false
  },

  {
    id: "item_ancient_pendant",
    name: "Ancient Pendant",
    description: "An ancient pendant bearing the symbol of the kingdom.",
    category: "artifact",
    usable: true,
    stackable: false
  },

  {
    id: "item_kingdom_symbol",
    name: "Kingdom Symbol",
    description: "An ancient symbol found inside the hidden passage.",
    category: "clue",
    usable: true,
    stackable: false
  },

  // CHAPTER 2
  {
    id: "item_torch",
    name: "Torch",
    description: "A torch useful for exploring dark places.",
    category: "tool",
    usable: true,
    stackable: false
  },

  {
    id: "item_rope",
    name: "Rope",
    description: "A strong rope useful for reaching difficult places.",
    category: "tool",
    usable: true,
    stackable: false
  },

  {
    id: "item_stone_fragment",
    name: "Stone Fragment",
    description: "A piece of an ancient statue.",
    category: "artifact",
    usable: true,
    stackable: false
  }
];


// ==========================================
// INVENTORY STATE
// ==========================================

let inventoryState = {
  slots: [],
  selectedItem: null,
  maxSlots: 24
};


// ==========================================
// GET ITEM DATABASE
// ==========================================

export function getAllItems() {
  return items;
}


// ==========================================
// GET ITEM BY ID
// ==========================================

export function getItemById(id) {
  return items.find(
    (item) => item.id === id
  );
}


// ==========================================
// CHECK IF ITEM EXISTS IN INVENTORY
// ==========================================

export function hasItem(itemId) {
  return inventoryState.slots.some(
    (slot) => slot.itemId === itemId
  );
}


// ==========================================
// GET ITEM QUANTITY
// ==========================================

export function getItemQuantity(itemId) {
  const slot = inventoryState.slots.find(
    (slot) => slot.itemId === itemId
  );

  return slot ? slot.quantity : 0;
}


// ==========================================
// ADD ITEM
// ==========================================

export function addItem(
  itemId,
  quantity = 1
) {
  const item = getItemById(itemId);

  if (!item) {
    console.warn(
      "Item not found:",
      itemId
    );

    return {
      success: false,
      message: "Item does not exist."
    };
  }

  if (quantity <= 0) {
    return {
      success: false,
      message: "Invalid quantity."
    };
  }

  const existingSlot =
    inventoryState.slots.find(
      (slot) =>
        slot.itemId === itemId
    );

  // Stackable item
  if (
    existingSlot &&
    item.stackable
  ) {
    existingSlot.quantity += quantity;

    return {
      success: true,
      message:
        `${item.name} added to inventory.`,
      item
    };
  }

  // Non-stackable duplicate
  if (
    existingSlot &&
    !item.stackable
  ) {
    return {
      success: false,
      message:
        `You already have ${item.name}.`
    };
  }

  // Inventory full
  if (
    inventoryState.slots.length >=
    inventoryState.maxSlots
  ) {
    return {
      success: false,
      message: "Inventory is full."
    };
  }

  inventoryState.slots.push({
    itemId,
    quantity
  });

  return {
    success: true,
    message:
      `${item.name} added to inventory.`,
    item
  };
}


// ==========================================
// REMOVE ITEM
// ==========================================

export function removeItem(
  itemId,
  quantity = 1
) {
  const slot =
    inventoryState.slots.find(
      (slot) =>
        slot.itemId === itemId
    );

  if (!slot) {
    return {
      success: false,
      message: "Item not found."
    };
  }

  slot.quantity -= quantity;

  if (slot.quantity <= 0) {
    inventoryState.slots =
      inventoryState.slots.filter(
        (currentSlot) =>
          currentSlot.itemId !== itemId
      );
  }

  return {
    success: true,
    message: "Item removed."
  };
}


// ==========================================
// SELECT ITEM
// ==========================================

export function selectItem(itemId) {
  if (!hasItem(itemId)) {
    return false;
  }

  inventoryState.selectedItem =
    itemId;

  return true;
}


// ==========================================
// GET SELECTED ITEM
// ==========================================

export function getSelectedItem() {
  if (
    !inventoryState.selectedItem
  ) {
    return null;
  }

  return getItemById(
    inventoryState.selectedItem
  );
}


// ==========================================
// CLEAR SELECTED ITEM
// ==========================================

export function clearSelectedItem() {
  inventoryState.selectedItem =
    null;
}


// ==========================================
// GET INVENTORY
// ==========================================

export function getInventory() {
  return inventoryState.slots.map(
    (slot) => ({
      ...getItemById(
        slot.itemId
      ),
      quantity: slot.quantity
    })
  );
}


// ==========================================
// GET INVENTORY COUNT
// ==========================================

export function getInventoryCount() {
  return inventoryState.slots.reduce(
    (total, slot) =>
      total + slot.quantity,
    0
  );
}


// ==========================================
// GET EMPTY SLOTS
// ==========================================

export function getEmptySlots() {
  return (
    inventoryState.maxSlots -
    inventoryState.slots.length
  );
}


// ==========================================
// SET MAX INVENTORY SLOTS
// ==========================================

export function setMaxSlots(
  amount
) {
  if (amount < 1) {
    return false;
  }

  inventoryState.maxSlots =
    amount;

  return true;
}


// ==========================================
// USE ITEM
// ==========================================

export function useItem(itemId) {
  const item =
    getItemById(itemId);

  if (!item) {
    return {
      success: false,
      message: "Item not found."
    };
  }

  if (!hasItem(itemId)) {
    return {
      success: false,
      message:
        `You don't have ${item.name}.`
    };
  }

  if (!item.usable) {
    return {
      success: false,
      message:
        `${item.name} cannot be used here.`
    };
  }

  selectItem(itemId);

  return {
    success: true,
    item,
    message:
      `${item.name} selected.`
  };
}


// ==========================================
// USE ITEM ON OBJECT
// ==========================================

export function useItemOnObject(
  itemId,
  objectId
) {
  if (!hasItem(itemId)) {
    return {
      success: false,
      message: "Item not in inventory."
    };
  }

  /*
    Game objects can use these IDs:

    wooden_box
    hidden_door
    temple_gate
    ancient_statue
    crystal_door
  */

  const combinations = {
    "item_old_iron_key:hidden_door": {
      success: true,
      consume: true,
      message:
        "The iron key opens the hidden door."
    },

    "item_rusty_key:old_cabinet": {
      success: true,
      consume: false,
      message:
        "The rusty key opens the old cabinet."
    },

    "item_candle:dark_room": {
      success: true,
      consume: false,
      message:
        "The candle lights the dark room."
    },

    "item_torch:dark_cave": {
      success: true,
      consume: false,
      message:
        "The torch lights the ancient cave."
    },

    "item_blue_crystal:crystal_door": {
      success: true,
      consume: false,
      message:
        "The blue crystal activates the ancient door."
    },

    "item_kingdom_symbol:ancient_statue": {
      success: true,
      consume: false,
      message:
        "The symbol matches the ancient statue."
    }
  };

  const combinationKey =
    `${itemId}:${objectId}`;

  const result =
    combinations[
      combinationKey
    ];

  if (!result) {
    return {
      success: false,
      message:
        "This item cannot be used here."
    };
  }

  if (
    result.consume
  ) {
    removeItem(
      itemId,
      1
    );
  }

  return result;
}


// ==========================================
// COMBINE TWO ITEMS
// ==========================================

export function canCombineItems(
  itemId1,
  itemId2
) {
  if (
    !hasItem(itemId1) ||
    !hasItem(itemId2)
  ) {
    return false;
  }

  const combinations = [
    [
      "item_blue_crystal",
      "item_ancient_pendant"
    ],

    [
      "item_ancient_coin",
      "item_kingdom_symbol"
    ]
  ];

  return combinations.some(
    ([a, b]) =>
      (a === itemId1 &&
        b === itemId2) ||
      (a === itemId2 &&
        b === itemId1)
  );
}


// ==========================================
// COMBINE ITEMS
// ==========================================

export function combineItems(
  itemId1,
  itemId2
) {
  if (
    !canCombineItems(
      itemId1,
      itemId2
    )
  ) {
    return {
      success: false,
      message:
        "These items cannot be combined."
    };
  }

  if (
    itemId1 ===
      "item_blue_crystal" &&
    itemId2 ===
      "item_ancient_pendant"
  ) {
    return {
      success: true,
      result: "item_kingdom_symbol",
      message:
        "The crystal activates the ancient pendant."
    };
  }

  if (
    itemId2 ===
      "item_blue_crystal" &&
    itemId1 ===
      "item_ancient_pendant"
  ) {
    return {
      success: true,
      result: "item_kingdom_symbol",
      message:
        "The crystal activates the ancient pendant."
    };
  }

  return {
    success: false,
    message:
      "Nothing happened."
  };
}


// ==========================================
// SAVE INVENTORY
// ==========================================

export function saveInventory() {
  try {
    localStorage.setItem(
      "badriQuestInventory",
      JSON.stringify(
        inventoryState
      )
    );

    return true;
  } catch (error) {
    console.error(
      "Failed to save inventory:",
      error
    );

    return false;
  }
}


// ==========================================
// LOAD INVENTORY
// ==========================================

export function loadInventory() {
  try {
    const savedData =
      localStorage.getItem(
        "badriQuestInventory"
      );

    if (!savedData) {
      return false;
    }

    const parsedData =
      JSON.parse(savedData);

    inventoryState = {
      slots:
        Array.isArray(
          parsedData.slots
        )
          ? parsedData.slots
          : [],

      selectedItem:
        parsedData.selectedItem ??
        null,

      maxSlots:
        typeof parsedData.maxSlots ===
        "number"
          ? parsedData.maxSlots
          : 24
    };

    return true;
  } catch (error) {
    console.error(
      "Failed to load inventory:",
      error
    );

    return false;
  }
}


// ==========================================
// RESET INVENTORY
// ==========================================

export function resetInventory() {
  inventoryState = {
    slots: [],
    selectedItem: null,
    maxSlots: 24
  };
}


// ==========================================
// GET COMPLETE INVENTORY STATE
// ==========================================

export function getInventoryState() {
  return {
    slots: inventoryState.slots.map(
      (slot) => ({
        ...slot
      })
    ),

    selectedItem:
      inventoryState.selectedItem,

    maxSlots:
      inventoryState.maxSlots
  };
      }
