const API_key = "48109657";

const input = document.getElementById("moviename");
const button = document.getElementById("fetchbtn");
const poster = document.getElementById("poster");
const info = document.getElementById("info");
const errorEl = document.getElementById("error");
const loading = document.getElementById("loading");

const showError = (message) => {
  errorEl.textContent = message;
};

const clearUI = () => {
  showError("");
  poster.style.display = "none";
  info.innerHTML = "";
};

async function fetchMovie() {
  clearUI();

  const name = input.value.trim();

  if (!name) {
    showError("Please enter a movie name.");
    return;
  }

  loading.textContent = "Loading...";

  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=${API_key}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    loading.textContent = "";

    if (!res.ok || data.Response === "False") {
      throw new Error(data.Error || "Movie not found!");
    }

    // Split actors list
    let actors = data.Actors ? data.Actors.split(",") : [];

    let hero = actors[0] ? actors[0].trim() : "N/A";

    // Show poster
    if (data.Poster && data.Poster !== "N/A") {
      poster.src = data.Poster;
      poster.style.display = "block";
    }

    // Display movie info
    info.innerHTML = `
      <strong>${data.Title}</strong> (${data.Year})<br>
      ⭐ IMDB: ${data.imdbRating}<br>
      🎭 Genre: ${data.Genre}<br>
      🌍 Language: ${data.Language}<br>
      🎬 Hero: ${hero}<br>
      📝 Plot: ${data.Plot}
    `;
  } catch (error) {
    loading.textContent = "";
    showError(error.message);
  }
}

button.addEventListener("click", fetchMovie);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchMovie();
  }
});

const title = document.getElementById("title");
const text = "🎬 CineScope Movie Finder";
let index = 0;

title.textContent = "";

function typeEffect() {
  if (index < text.length) {
    title.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}

typeEffect();
