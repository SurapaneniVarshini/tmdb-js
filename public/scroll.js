// import {API_KEY} from '../env';

// const {API_KEy} = require('../env');

let currentPageMode = 'home'; 

window.addEventListener('scroll', () => {
    if ((currentPageMode === 'infiniteScroll') && !loading && (window.innerHeight + window.scrollY >= document.body.offsetHeight)) {
        // console.log('Loading next page');
        loadNextPage();
        // console.log(`Page ${currentPage} of ${totalPages}`);
    }
});

let loading = false; 
let currentPage = 1;
let totalPages = Infinity; 

function loadNextPage() {
    if (currentPageMode === 'infiniteScroll' && !loading && currentPage <= totalPages) {
        // console.log('Load next page');
        loading = true;
        document.getElementById('loading').style.display = 'block'; 

        fetchNextPage()
            .then(data => {
                totalPages = data.total_pages; 
                renderResults(data.results);
                currentPage++;
                document.getElementById('loading').style.display = 'block'; 
                if (currentPage <= totalPages) {
                    console.log(`Page ${currentPage} of ${totalPages}`);
                    setTimeout(() => { 
                        loading = false;
                        document.getElementById('loading').style.display = 'none'; 
                    }, 2000);
                } else {
                    console.log('End of results');
                    loading = false;
                    document.getElementById('loading').style.display = 'none'; 
                }
            })
            .catch(error => {
                console.error(`Error: ${error.message}`);
                loading = false;
                document.getElementById('loading').style.display = 'none'; 
            });
    }
}


async function fetchNextPage() {
    // console.log('Fetching next page');
    const input = document.getElementById('movieInput').value.trim();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=0dc79e9f8d8261756060e27eae2708db&query=${input}&page=${currentPage}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

function renderResults(results) {
    // console.log('Rendering results');
    const resultsDiv = document.getElementById('results');
    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">Release Date: ${movie.release_date}</p>
                    <p class="card-text">Vote Average: ${movie.vote_average}</p>
                </div>
            </div>
        `;
        resultsDiv.appendChild(movieCard);
    });
}