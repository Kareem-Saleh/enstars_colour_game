import {
  selected,
  playable,
  resetPlayable,
  resetSelected,
  checkSelectedEmpty,
  setPlayable,
} from "./select_agency.js";
import { colours } from "./colours.js";

const leftContainer = document.querySelector(".left");
const rightContainer = document.querySelector(".right");

let currentColour;
let currentColouridx = 0;
let shuffledColours;
let playingLength;
let playingColours;
let allColoursSelected = false;
let picked = [];
let score = 0;
let timeElapsed = 0;
let clockInterval;

function resetGameVariables() {
  allColoursSelected = false;
  picked = [];
  score = 0;
  playingLength = 0;
  timeElapsed = 0;
  clearInterval(clockInterval);
}

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
    <div class="links">
      <a href="https://x.com/xppppppplol">
        <img class="twitter" src="imgs/other/twitter-round-svgrepo-com.svg" />
      </a>
      <a href="https://github.com/Kareem-Saleh/enstars_colour_game">
        <img class="github" src="imgs/other/github-142-svgrepo-com.svg" />
      </a>
    </div>
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

  resetPlayable();
  resetSelected();
  checkSelectedEmpty(selected);
  resetGameVariables();
}

if (window.innerWidth < 680) {
  console.log("hi");
}

function play() {
  timeElapsed = 0;

  if (!playable) {
    return;
  } else {
    leftContainer.innerHTML = `
    <h1>Enstars Colour Quiz</h1>
    <h2>For the best experience please play on desktop</h2>
    <div class="colour-info">
      <p>Current Colour:</p>
      <div class="current-colour"></div>
      <p class="colour-name">
    </div>
    </p>
    <div class="timer">00:00</div>
    <div class="game-btns">
      <button class="finish">Finish</button>
      <button class="restart">Restart</button>
      <button class="quit"  >Quit</button>
    </div>
    `;

    rightContainer.innerHTML = `<div class="character-container"></div>`;

    if (!document.querySelector(".colour-info-small")) {
      const smallInfoDiv = document.createElement("div");
      smallInfoDiv.className = "colour-info-small";
      smallInfoDiv.innerHTML = `
      <p>Current Colour:</p>
      <div class="current-colour-small"></div>
      <p class="colour-name-small">
      `;
      document.body.appendChild(smallInfoDiv);
    }

    const characterContainer = document.querySelector(".character-container");

    // rendering characters
    const toRender = [];
    playingColours = [];
    selected.forEach((unit) => {
      const unitObj = colours[unit];
      Object.entries(unitObj).forEach(([name, characterObj]) => {
        const obj = {
          unit: unit,
          name: name,
          object: characterObj,
        };
        toRender.push(obj);
        playingColours.push(characterObj["colour"]);
      });
    });

    const shuffledRender = shuffleArray(toRender);

    shuffledRender.forEach((characterObj) => {
      characterContainer.innerHTML += `<div class="character">
      <img class="character-img" src="${characterObj["object"]["img"]}" id="${characterObj["name"]}" />
      </div>`;
    });

    shuffledColours = shuffleArray(playingColours);
    playingLength = shuffledColours.length;

    currentColour = shuffledColours[currentColouridx];
    document.body.style.setProperty("--current-colour", currentColour);

    const colourName = document.querySelector(".colour-name");
    colourName.innerText = currentColour;

    const colourNameSmall = document.querySelector(".colour-name-small");
    colourNameSmall.innerText = currentColour;

    const playingColourBox = document.querySelector(".current-colour");
    playingColourBox.style.backgroundColor = currentColour;

    const playingColourBoxSmall = document.querySelector(
      ".current-colour-small"
    );
    playingColourBoxSmall.style.backgroundColor = currentColour;

    clock();
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
  const finishTime = generateTime(timeElapsed);

  leftContainer.innerHTML = `
  <h1>Enstars Colour Quiz</h1>
  <h2>For the best experience please play on desktop</h2>
  <p class="score"></p>
  <div class="timer">${finishTime}</div>
  <div class="game-btns">
    <button class="restart">Restart</button>
    <button class="quit">Quit</button>
  </div>
  `;

  const allSelectedObj = {};

  selected.forEach((unit) => {
    const unitObj = colours[unit];
    Object.assign(allSelectedObj, unitObj);
  });

  rightContainer.innerHTML = `<div class="corrections"></div>`;
  const correctionsDiv = document.querySelector(".corrections");

  picked.forEach((pick) => {
    if (pick["colour"] === allSelectedObj[pick["name"]]["colour"]) {
      score++;
      correctionsDiv.innerHTML += `
      <p class="correct-message">
        <b>✔️ CORRECT</b>
        <span class="name-end">${pick.name}</span> was
        <span style="background-color: ${pick.colour}">${pick.colour}</span>
      </p>
      `;
    } else {
      correctionsDiv.innerHTML += `
      <p class="correct-message">
        <b>❌ INCORRECT</b>
        You picked
        <span style="background-color: ${pick.colour}">${
        pick.colour
      }</span> for <span class="name-end">${pick.name}</span>, but it was
        <span style="background-color: ${
          allSelectedObj[pick["name"]]["colour"]
        }">${allSelectedObj[pick["name"]]["colour"]}</span>
      </p>
      `;
    }
  });

  const scoreBox = document.querySelector(".score");
  scoreBox.innerText = `You got ${score}/${picked.length} correct!`;

  resetPlayable();
  resetGameVariables();
}

function restart() {
  resetGameVariables();
  clearInterval(clockInterval);
  setPlayable();
  play();
}

leftContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("play-btn")) {
    if (playable) {
      play();
    }
  }
  if (event.target.classList.contains("quit")) {
    quit();
  }
  if (event.target.classList.contains("finish")) {
    if (allColoursSelected) {
      finish();
    }
  }
  if (event.target.classList.contains("restart")) {
    restart();
  }
});

document.addEventListener("click", (event) => {
  const playingColourBox = document.querySelector(".current-colour");
  const playingColourBoxSmall = document.querySelector(".current-colour-small");
  const colourName = document.querySelector(".colour-name");
  const colourNameSmall = document.querySelector(".colour-name-small");
  const character = event.target.closest(".character");
  const finishBtn = document.querySelector(".finish");

  if (character) {
    // handles when a player picks a character that already has a colour
    if (character.classList.contains("selected")) {
      const selectedColour = rgbToHex(character.style.backgroundColor);
      shuffledColours.splice(0, 0, selectedColour);

      character.classList.remove("selected");
      character.style.backgroundColor = "unset";
      character.style.setProperty("--border-colour", "var(--current-colour)");

      if (picked.length === playingLength) {
        allColoursSelected = false;
        document.body.style.setProperty("--current-colour", selectedColour);

        playingColourBox.style.backgroundColor = selected;
        playingColourBox.innerText = "";

        playingColourBoxSmall.style.backgroundColor = selected;
        playingColourBoxSmall.innerText = "";

        colourName.innerText = selectedColour;
        colourNameSmall.innerText = selectedColour;

        finishBtn.style.backgroundColor = "rgb(182, 182, 182)";
        finishBtn.style.cursor = "auto";
      }

      const characterName = character.querySelector(".character-img").id;

      for (let i = 0; i < picked.length; i++) {
        if (picked[i].name === characterName) {
          picked.splice(i, 1);
        }
      }

      document.body.style.setProperty("--current-colour", selectedColour);

      playingColourBox.style.backgroundColor = selectedColour;
      playingColourBoxSmall.style.backgroundColor = selectedColour;

      colourName.innerText = selectedColour;
      colourNameSmall.innerText = selectedColour;

      currentColour = shuffledColours[0];
      return;
    }

    // set colour and push the answer to be checked later
    character.style.backgroundColor = currentColour;
    character.style.setProperty("--border-colour", currentColour);
    const characterName = character.querySelector(".character-img").id;

    character.classList.add("selected");

    picked.push({
      name: characterName,
      colour: currentColour,
    });

    shuffledColours.splice(0, 1);
    currentColour = shuffledColours[0];

    document.body.style.setProperty("--current-colour", currentColour);
    playingColourBox.style.backgroundColor = currentColour;
    colourName.innerText = currentColour;

    playingColourBoxSmall.style.backgroundColor = currentColour;
    colourNameSmall.innerText = currentColour;

    // handles reaching end of picking all the colours
    if (picked.length === playingLength) {
      document.body.style.setProperty("--current-colour", "black");
      playingColourBox.style.backgroundColor = "black";
      playingColourBox.innerText = "No more colours left!";
      colourName.innerText = "";

      playingColourBoxSmall.style.backgroundColor = "black";
      playingColourBoxSmall.innerText = "No more colours left!";
      colourNameSmall.innerText = "";

      finishBtn.style.backgroundColor = "rgb(59, 246, 59)";
      finishBtn.style.cursor = "pointer";

      finishBtn.addEventListener("mouseenter", () => {
        finishBtn.style.backgroundColor = "rgba(36, 208, 36, 1)";
      });

      finishBtn.addEventListener("mouseleave", () => {
        finishBtn.style.backgroundColor = "rgb(59, 246, 59)";
      });

      allColoursSelected = true;
      return;
    }
  }
});

function clock() {
  const timer = document.querySelector(".timer");
  let time;

  clockInterval = setInterval(() => {
    if (!playable) {
      clearInterval(clockInterval);
    }
    timeElapsed += 1;

    time = generateTime(timeElapsed);
    timer.innerText = time;
  }, 1000);
}

function rgbToHex(rgb) {
  // Extract the RGB values using a regex
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) {
    return rgb; // Return original if not in expected format
  }

  // Convert each RGB component to hex
  const hex = (x) => {
    const hex = parseInt(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const r = hex(match[1]);
  const g = hex(match[2]);
  const b = hex(match[3]);

  return `#${r}${g}${b}`.toUpperCase();
}

function generateTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  const timeText = `${minutes}:${seconds}`;
  return timeText;
}
