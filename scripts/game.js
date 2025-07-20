import {
  selected,
  playable,
  resetPlayable,
  resetSelected,
  checkSelectedEmpty,
} from "./select_agency.js";
import { colours } from "./colours.js";

const playBtn = document.querySelector(".play-btn");
const leftContainer = document.querySelector(".left");
const rightContainer = document.querySelector(".right");

function quit() {
  leftContainer.innerHTML = `
  <div>
    <h1>Enstars Colour Quiz</h1>
    <h2>For the best experience please play on desktop</h2>
    <p class="agency-selected">
      Select the group / groups you want to play!
    </p>
  </div>
  <button class="play-btn">Play!</button>
  `;

  rightContainer.innerHTML = `
  <div class="row">
          <div class="agency" id="Cosmic Production">
            <img src="imgs/agencies/COSMIC_PRODUCTION_Logo.webp" />
          </div>

          <div class="unit-row">
            <div class="unit" id="Eden">
              <img src="imgs/sub_units/Eden_ES_Logo.webp" />
            </div>
            <div class="unit" id="Valkyrie">
              <img src="imgs/sub_units/Valkyrie_ES_Logo.webp" />
            </div>
            <div class="unit" id="2wink">
              <img src="imgs/sub_units/2wink_ES_Logo.webp" />
            </div>
            <div class="unit" id="Crazy:B">
              <img src="imgs/sub_units/CrazyB_ES_Logo.webp" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="agency" id="New Dimension">
            <img src="imgs/agencies/NEW_DIMENSION_Logo.webp" />
          </div>
          <div class="unit-row">
            <div class="unit" id="Knights">
              <img src="imgs/sub_units/Knights_ES_Logo.webp" />
            </div>
            <div class="unit" id="Switch">
              <img src="imgs/sub_units/Switch_ES_Logo.webp" />
            </div>
            <div class="unit" id="MaM">
              <img src="imgs/sub_units/MaM_ES_Logo.webp" />
            </div>
            <div class="unit" id="Special for Princess!">
              <img src="imgs/sub_units/Special_for_Princess!_ES_Logo.webp" />
            </div>
            <div class="unit" id="Double Face">
              <img src="imgs/sub_units/Double_Face_ES_Logo.webp" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="agency" id="Rhythm Link">
            <img src="imgs/agencies/Rhythm_Link_Logo.webp" />
          </div>
          <div class="unit-row">
            <div class="unit" id="UNDEAD">
              <img src="imgs/sub_units/UNDEAD_ES_Logo.webp" />
            </div>
            <div class="unit" id="Ra*bits">
              <img src="imgs/sub_units/Ra_bits_ES_Logo.webp" />
            </div>
            <div class="unit" id="AKATSUKI">
              <img src="imgs/sub_units/AKATSUKI_ES_Logo.webp" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="agency" id="Starmaker Production">
            <img src="imgs/agencies/STARMAKER_PRODUCTION_Logo.webp" />
          </div>
          <div class="unit-row">
            <div class="unit" id="Trickstar">
              <img src="imgs/sub_units/Trickstar_ES_Logo.webp" />
            </div>
            <div class="unit" id="fine">
              <img src="imgs/sub_units/Fine_ES_Logo.webp" />
            </div>
            <div class="unit" id="RYUSEITAI">
              <img src="imgs/sub_units/RYUSEITAI_ES_Logo.webp" />
            </div>
            <div class="unit" id="ALKALOID">
              <img src="imgs/sub_units/ALKALOID_ES_Logo.webp" />
            </div>
          </div>
        </div>`;
}

function play() {
  if (!playable) {
    return;
  } else {
    leftContainer.innerHTML = `
    <h1>Enstars Colour Quiz</h1>
    <h2>For the best experience please play on desktop</h2>
    <div class="colour-info">
      <p>Current Colour:</p>
      <div class="current-colour"></div>
    </div>
    <div class="timer">00:12</div>
    <div class="game-btns">
      <button class="finish">Finish</button>
      <button class="restart">Restart</button>
      <button class="quit"  >Quit</button>
    </div>
    `;

    rightContainer.innerHTML = `<div class="character-container none"></div>`;

    const characterContainer = document.querySelector(".character-container");
    characterContainer.classList.remove("none");

    // rendering characters
    const toRender = [];
    selected.forEach((unit) => {
      const unitObj = colours[unit];
      Object.entries(unitObj).forEach(([name, characterObj]) => {
        const obj = {
          name: name,
          object: characterObj,
        };
        toRender.push(obj);
      });
    });
    const shuffledRender = shuffleArray(toRender);
    shuffledRender.forEach((characterObj) => {
      characterContainer.innerHTML += `<div class="character">
          <img src="${characterObj["object"]["img"]}" id="${characterObj["name"]}" />
        </div>`;
    });
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function finish() {
  leftContainer.innerHTML = `
  <h1>Enstars Colour Quiz</h1>
  <h2>For the best experience please play on desktop</h2>
  <p class="score">You got 3/6 correct!</p>
  <div class="game-btns">
    <button class="restart">Restart</button>
    <button class="quit">Quit</button>
  </div>
  `;
}

leftContainer.addEventListener("click", (event) => {
  if (!playable) {
    return;
  }

  if (event.target.classList.contains("play-btn")) {
    play();
  }
});

leftContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("quit")) {
    quit();
    resetPlayable();
    resetSelected();
    checkSelectedEmpty(selected);
  }
});

leftContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("finish")) {
    finish();
  }
});

leftContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("restart")) {
    play();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains(".character")) {
  }
});
