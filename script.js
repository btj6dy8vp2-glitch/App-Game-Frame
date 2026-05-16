let games = JSON.parse(localStorage.getItem("games")) || [];

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
}

function render() {
  const list = document.getElementById("gameList");
  list.innerHTML = "";

  games.forEach((game, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${game}
      <button onclick="removeGame(${i})">X</button>
    `;
    list.appendChild(li);
  });

  localStorage.setItem("games", JSON.stringify(games));
}

function addGame() {
  const input = document.getElementById("gameInput");
  if (!input.value) return;

  games.push(input.value);
  input.value = "";

  render();
}

function removeGame(i) {
  games.splice(i, 1);
  render();
}

render();
showTab("library");
