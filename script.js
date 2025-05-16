let details = document.getElementById("details");
let movie = document.getElementById("movie");

movie.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let movieDetails = await getDetails(movie.value);
        if (movieDetails.Response === "False") {
            details.textContent = movieDetails.Error;
            return;
        }
        details.textContent = `
            Title: ${movieDetails.Title}
            Year: ${movieDetails.Year}
            Genre: ${movieDetails.Genre}
            Director: ${movieDetails.Director}
            Writer: ${movieDetails.Writer}
            Rated: ${movieDetails.Rated}
        `;
    }
});    

async function getDetails(movieName) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=ea4913bc&t=${movieName}`);
        const movieDetails = await response.json();
        return movieDetails;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}