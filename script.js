const apiUrl = 'http://localhost:3000/api/movies'; // رابط API الخاص بك
const movieGrid = document.querySelector('.movie-grid'); // تحديد مكان عرض الأفلام

// دالة لجلب الأفلام استنادًا إلى استعلام البحث
async function fetchMovies(query = '') {
    const url = query ? `${apiUrl}?search=${query}` : apiUrl; // إذا كان هناك استعلام، استخدمه
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// دالة لعرض الأفلام
function displayMovies(movies) {
    movieGrid.innerHTML = ''; // تفريغ أي أفلام موجودة مسبقًا

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300';

        movieCard.innerHTML = `
            <a href="movie.html?id=${movie.id}">
                <img src="${posterPath}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            </a>
        `;

        movieGrid.appendChild(movieCard);
    });
}

// التعامل مع حدث البحث
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    const query = document.getElementById('searchInput').value.trim(); // الحصول على قيمة البحث
    fetchMovies(query); // جلب الأفلام استنادًا إلى استعلام البحث
});

// جلب الأفلام عند تحميل الصفحة
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
