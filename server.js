const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const apiUrl = 'https://api.themoviedb.org/3/movie/popular';
const apiKey = 'fad72911f54b8d9b9d58b5d6a74487b2';

app.use(cors());

// Endpoint لجلب الأفلام
app.get('/api/movies', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}?api_key=${apiKey}&language=en-US&page=1`);
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


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
