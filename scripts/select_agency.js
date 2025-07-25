export const selected = new Set();
export let playable = false;

let selectedText = "You have selected";

export function resetPlayable() {
  playable = false;
}

export function setPlayable() {
  playable = true;
}

export function resetSelected() {
  selected.clear();
}

export function checkSelectedEmpty(selected) {
  const playBtn = document.querySelector(".play-btn");
  if (selected.size !== 0) {
    playBtn.style.backgroundColor = "rgb(59, 246, 59)";
    playBtn.style.cursor = "pointer";

    playBtn.addEventListener("mouseenter", () => {
      if (playable) {
        playBtn.style.backgroundColor = "rgba(36, 208, 36, 1)";
      }
    });

    playBtn.addEventListener("mouseleave", () => {
      if (playable) {
        playBtn.style.backgroundColor = "rgb(59, 246, 59)";
      }
    });

    playable = true;
  } else {
    playBtn.style.backgroundColor = "rgba(182, 182, 182, 1)";
    playBtn.style.cursor = "auto";
    playable = false;
  }
}

checkSelectedEmpty(selected);

document.addEventListener("click", (event) => {
  const clicked = event.target.closest(".unit");
  const agencySelected = document.querySelector(".agency-selected");

  if (!clicked) {
    return;
  }
  const id = clicked.id;

  if (clicked) {
    clicked.classList.toggle("unit-selected");

    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }

    const selectedArray = Array.from(selected);

    if (selectedArray.length === 0) {
      selectedText = "Select the group / groups you want to play!";
      agencySelected.innerText = selectedText;
    }

    for (let i = 0; i < selectedArray.length; i++) {
      let name = selectedArray[i];

      if (selectedArray.length === 1) {
        selectedText += ` ${name}.`;
        break;
      }
      if (i === selectedArray.length - 1) {
        selectedText += ` and ${name}.`;
        break;
      } else if (i >= 0) {
        selectedText += ` ${name},`;
      }
    }
  }

  checkSelectedEmpty(selected);
  agencySelected.innerText = selectedText;
  selectedText = "You have selected";
});
