import { selected, playable } from "./select_agency.js";

const playBtn = document.querySelector(".play-btn");

playBtn.addEventListener("click", () => {
  if (!playable) {
    return;
  } else {
    console.log(selected);
  }
});
