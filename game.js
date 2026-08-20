const startButton = document.querySelector(".start-button");
const titleScreen = document.querySelector(".title-screen");

startButton.addEventListener("click", () => {
  titleScreen.innerHTML = `
    <div class="kingdom">CHAPTER 1</div>

    <h1>🌲 THE DARK FOREST</h1>

    <h2>⚔️ Badri's Journey Begins</h2>

    <p class="story">
      King Manu has disappeared.
      A mysterious dark force has surrounded Eldoria.
      Badri must enter the Dark Forest and find the first
      Crystal Fragment.
    </p>

    <button class="start-button" onclick="startChapter()">
      ENTER THE DARK FOREST
    </button>
  `;
});

function startChapter() {
  titleScreen.innerHTML = `
    <div class="kingdom">ELDORIA KINGDOM</div>

    <h1>⚔️ BADRI</h1>

    <h2>THE ADVENTURE BEGINS</h2>

    <p class="story">
      The forest is silent...
      Something is watching from the shadows.
      Your quest begins now.
    </p>

    <button class="start-button" onclick="alert('🎮 Chapter 1 coming next!')">
      CONTINUE
    </button>
  `;
}
