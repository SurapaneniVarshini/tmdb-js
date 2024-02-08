let currentPageMode = 'home'; 

window.addEventListener('scroll', () => {
    if ((currentPageMode === 'infiniteScroll') && !loading && (window.innerHeight + window.scrollY >= document.body.offsetHeight)) {
        loadNextPage();
    }
});

let loading = false; 
let currentPage = 1;
let totalPages = Infinity; 

function loadNextPage() {
    if (currentPageMode === 'infiniteScroll' && !loading && currentPage <= totalPages) {
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
    const input = document.getElementById('movieInput').value.trim();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${window.API_KEY}&query=${input}&page=${currentPage}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

function renderResults(results) {
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