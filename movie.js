const apiKey = 'fad72911f54b8d9b9d58b5d6a74487b2';
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

async function fetchMovieDetails() {
    try {
        const response = await fetch(movieUrl);
        const movie = await response.json();
        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('moviePoster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        document.getElementById('movieOverview').innerText = movie.overview;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function goBack() {
    window.history.back();
}

// Call the function to fetch movie details
fetchMovieDetails();


const apiUrl = 'http://localhost:3000/api/movies';

async function fetchMovies() {
    try {
        const response = await fetch(apiUrl);
        const movies = await response.json();
        console.log(movies); // Check the movies in the console
        // Add logic to display movies on your frontend
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Call the function
fetchMovies();


app.get('/api/movies', async (req, res) => {
    const searchQuery = req.query.search || ''; // استعلام البحث
    const searchUrl = searchQuery 
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`
        : `${apiUrl}?api_key=${apiKey}&language=en-US&page=1`;

    try {
        const response = await axios.get(searchUrl);
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
});
