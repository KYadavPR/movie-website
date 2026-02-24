
const API_KEY = "c7d99220";
const searchBtn = document.getElementById("searchbtn");
const searchInput = document.getElementById("searchhere");
const movieContainer = document.getElementById("showmoviedetails");
const loadingText = document.getElementById("loading");

searchBtn.addEventListener("click", searchMovie);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchMovie();
});

// Default load
fetchMovies("avengers");

async function searchMovie() {
    const movieName = searchInput.value.trim();
    if (movieName === "") {
        alert("Please enter a movie name");
        return;
    }
    fetchMovies(movieName);
}

async function fetchMovies(movieName) {
    movieContainer.innerHTML = "";
    loadingText.classList.remove("hidden");

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`
        );
        const data = await response.json();

        loadingText.classList.add("hidden");

        if (data.Response === "False") {
            movieContainer.innerHTML = `<h2>No movies found 😢</h2>`;
            return;
        }

        data.Search.forEach(movie => {
            movieContainer.innerHTML += `
                <div class="moviecard">
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : "./no_image_available.jpg"}">
                    <h3>${movie.Title}</h3>
                    <span>${movie.Year}</span>
                </div>
            `;
        });

    } catch (error) {
        loadingText.classList.add("hidden");
        movieContainer.innerHTML = `<h2>Error loading movies ❌</h2>`;
        console.error(error);
    }
}