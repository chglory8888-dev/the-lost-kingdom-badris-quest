/* =====================================================
   THE LOST KINGDOM: BADRI'S QUEST
   CHAPTER 1 — HIDDEN CLUE MINI GAME
===================================================== */

(function () {

  /* =====================================================
     CREATE CLUE SYSTEM
  ===================================================== */

  let clueFound = false;
  let clueOpened = false;
  let clueSolved = false;


  /* =====================================================
     CREATE CLUE BUTTON
  ===================================================== */

  const forest =
    document.getElementById("forest");

  if (!forest) {
    return;
  }


  const clueObject =
    document.createElement("div");

  clueObject.id = "ancientClue";

  clueObject.innerHTML = "📜";

  clueObject.title =
    "Something is hidden here...";


  forest.appendChild(
    clueObject
  );


  /* =====================================================
     POSITION
  ===================================================== */

  clueObject.style.position =
    "absolute";

  clueObject.style.left =
    "38%";

  clueObject.style.top =
    "52%";

  clueObject.style.fontSize =
    "42px";

  clueObject.style.zIndex =
    "9";

  clueObject.style.cursor =
    "pointer";

  clueObject.style.userSelect =
    "none";

  clueObject.style.filter =
    "drop-shadow(0 0 8px #e6c85d)";


  /* =====================================================
     ANIMATION
  ===================================================== */

  const style =
    document.createElement("style");

  style.textContent = `

    @keyframes ancientClueGlow {

      0%,100% {
        transform: scale(1);
        filter:
          drop-shadow(0 0 5px #e6c85d);
      }

      50% {
        transform: scale(1.15);
        filter:
          drop-shadow(0 0 18px #ffe98a);
      }

    }

    #ancientClue {
      animation:
        ancientClueGlow 1.5s infinite;
    }

    #clueModal {
      position: fixed;
      inset: 0;
      z-index: 500;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 20px;

      background:
        rgba(0,0,0,.82);
    }

    .clue-box {
      width: min(520px, 94vw);

      padding: 28px 22px;

      background:
        linear-gradient(
          #182519,
          #080d09
        );

      border:
        2px solid #b4933d;

      border-radius: 18px;

      text-align: center;

      box-shadow:
        0 0 45px black;
    }

    .clue-box h2 {
      color: #f1d477;
      margin-bottom: 12px;
    }

    .clue-scroll {
      padding: 18px;

      background:
        #211b10;

      border:
        1px solid #806b38;

      border-radius: 12px;

      color: #eee4c5;

      line-height: 1.6;

      margin-bottom: 18px;
    }

    .clue-options {
      display: grid;

      grid-template-columns:
        repeat(2,1fr);

      gap: 10px;
    }

    .clue-options button {
      min-height: 55px;

      border:
        1px solid #806b38;

      border-radius: 10px;

      background:
        #1c3020;

      color: white;

      font-size: 16px;

      cursor: pointer;
    }

    .clue-options button:active {
      transform: scale(.95);
    }

    #clueResult {
      min-height: 25px;

      margin-top: 15px;

      font-weight: bold;
    }

    #closeClue {
      margin-top: 15px;

      padding: 9px 18px;

      border-radius: 8px;

      border:
        1px solid #806b38;

      background:
        transparent;

      color: #aaa;
    }

    @media(max-width:600px) {

      .clue-box {
        padding: 22px 15px;
      }

      .clue-options button {
        font-size: 14px;
      }

    }

  `;

  document.head.appendChild(
    style
  );


  /* =====================================================
     DISTANCE CHECK
  ===================================================== */

  function closeEnough() {

    const player =
      document.getElementById(
        "player"
      );

    if (!player) {
      return false;
    }

    const a =
      player.getBoundingClientRect();

    const b =
      clueObject.getBoundingClientRect();

    const ax =
      a.left + a.width / 2;

    const ay =
      a.top + a.height / 2;

    const bx =
      b.left + b.width / 2;

    const by =
      b.top + b.height / 2;

    const d =
      Math.sqrt(
        Math.pow(ax - bx, 2) +
        Math.pow(ay - by, 2)
      );

    return d < 75;

  }


  /* =====================================================
     OPEN CLUE
  ===================================================== */

  function openClue() {

    if (clueSolved) {
      return;
    }


    if (!closeEnough()) {

      if (
        typeof window.showMessage ===
        "function"
      ) {

        window.showMessage(
          "🔎 Move closer to the ancient scroll."
        );

      }

      return;

    }


    clueOpened = true;


    createClueModal();

  }


  /* =====================================================
     MODAL
  ===================================================== */

  function createClueModal() {

    const old =
      document.getElementById(
        "clueModal"
      );

    if (old) {
      old.remove();
    }


    const modal =
      document.createElement("div");

    modal.id =
      "clueModal";


    modal.innerHTML = `

      <div class="clue-box">

        <div style="
          font-size:48px;
          margin-bottom:5px;
        ">
          📜
        </div>

        <h2>
          ANCIENT FOREST CLUE
        </h2>

        <div class="clue-scroll">

          "The guardian does not fear
          the strongest warrior."

          <br><br>

          "He fears the light
          that grows beneath
          the ancient tree."

          <br><br>

          🔎 Find the object
          hidden beneath the tree.

        </div>

        <div class="clue-options">

          <button data-answer="sword">
            ⚔️ Ancient Sword
          </button>

          <button data-answer="flower">
            🌸 Golden Flower
          </button>

          <button data-answer="stone">
            🪨 Shadow Stone
          </button>

          <button data-answer="shield">
            🛡️ Royal Shield
          </button>

        </div>

        <div id="clueResult"></div>

        <button id="closeClue">
          ← RETURN
        </button>

      </div>

    `;


    document.body.appendChild(
      modal
    );


    /* =================================================
       ANSWERS
    ================================================= */

    modal
      .querySelectorAll(
        ".clue-options button"
      )
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              checkAnswer(
                button.dataset.answer
              );

            }
          );

        }
      );


    /* =================================================
       CLOSE
    ================================================= */

    const close =
      document.getElementById(
        "closeClue"
      );


    if (close) {

      close.addEventListener(
        "click",
        function () {

          modal.remove();

        }
      );

    }

  }


  /* =====================================================
     CHECK ANSWER
  ===================================================== */

  function checkAnswer(
    answer
  ) {

    const result =
      document.getElementById(
        "clueResult"
      );


    if (!result) {
      return;
    }


    if (answer !== "flower") {

      result.textContent =
        "❌ That is not the object described by the clue.";

      result.style.color =
        "#ff7777";

      return;

    }


    /* ================================================
       CORRECT
    ================================================= */

    clueSolved = true;
    clueFound = true;


    result.textContent =
      "✨ Correct! You discovered the Golden Flower!";

    result.style.color =
      "#7dff9c";


    clueObject.style.display =
      "none";


    /* ================================================
       QUEST UPDATE
    ================================================= */

    if (
      typeof window.completeQuest ===
      "function"
    ) {

      window.completeQuest(
        "clue"
      );

    }


    /* ================================================
       ADD ITEM
    ================================================= */

    window.goldenFlower =
      true;


    if (
      typeof window.updateInventoryUI ===
      "function"
    ) {

      window.updateInventoryUI();

    }


    if (
      typeof window.showMessage ===
      "function"
    ) {

      window.showMessage(
        "🌸 Golden Flower discovered! A hidden path may be nearby."
      );

    }


    /* ================================================
       CLOSE
    ================================================= */

    setTimeout(
      function () {

        const modal =
          document.getElementById(
            "clueModal"
          );

        if (modal) {
          modal.remove();
        }

      },
      1600
    );

  }


  /* =====================================================
     CLICK SCROLL
  ===================================================== */

  clueObject.addEventListener(
    "click",
    function () {

      openClue();

    }
  );


  /* =====================================================
     KEYBOARD INTERACTION
  ===================================================== */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.code === "KeyE"
      ) {

        if (
          !document.getElementById(
            "clueModal"
          )
        ) {

          openClue();

        }

      }

    }
  );


  /* =====================================================
     EXPORT
  ===================================================== */

  window.openAncientClue =
    openClue;


  window.isClueSolved =
    function () {

      return clueSolved;

    };


})();
