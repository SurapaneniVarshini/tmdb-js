import {GetMovieService} from './get-movie.service';
import {PageDetails} from './get-movie.service';
import {MovieDetails} from './get-movie.service';
import {debounce} from './index';


export class SearchComponent {
    userInput: HTMLInputElement = document.getElementById('movieInput') as HTMLInputElement;
    resultsDiv: HTMLDivElement = document.getElementById('results') as HTMLDivElement;
    pageDetails: PageDetails = { page: 1, results: [], total_pages: 0, total_results: 0 };
    pageSize: number = this.pageDetails.results.length;
    currentPage: number = 1;
    totalPages: number = this.pageDetails.total_pages;
    pageData: MovieDetails[] = [];
  
    constructor(private movieService: GetMovieService) {}
  
    init() {
      this.userInput.addEventListener('input', debounce(() => {
        const input = this.userInput.value;
        this.movieService.getMovieDetails(input)
          .then(response => {
            this.pageDetails = response;
            this.pageSize = this.pageDetails.results.length;
            this.totalPages = this.pageDetails.total_pages;
            this.pageData = this.pageDetails.results;
            this.renderResults();
          })
          .catch(error => {
            console.error(`Error: ${error.message}`);
          });
      }, 750));
  
      document.getElementById('nextBtn')?.addEventListener('click', () => this.onNextPage());
      document.getElementById('prevBtn')?.addEventListener('click', () => this.onPreviousPage());
    }
    
    onNextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage += 1;
          this.getPaginatedData();
        }
      }
    
    onPreviousPage() {
        if (this.currentPage > 1 && this.currentPage <= this.totalPages) {
          this.currentPage -= 1;
          this.getPaginatedData();
        }
      }
    
      private getPaginatedData() {
        this.movieService.getPaginatedData(this.currentPage)
          .then(response => {
            this.pageDetails = response;
            this.pageSize = this.pageDetails.results.length;
            this.totalPages = this.pageDetails.total_pages;
            this.pageData = this.pageDetails.results;
            this.renderResults();
          })
          .catch(error => {
            console.error(`Error: ${error.message}`);
          });
      }
    
      private renderResults() {
        this.resultsDiv.innerHTML = ''; 
  
        const pageNumberElement = document.getElementById('pageNumber');
        if (pageNumberElement) {
          pageNumberElement.textContent = `Page ${this.currentPage} / ${this.totalPages}`;
        }

        this.pageData.forEach(movie => {
          const movieElement = document.createElement('div');
          movieElement.classList.add('movie');
          movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Release Date: ${movie.release_date}</p>
            <p>Vote Average: ${movie.vote_average}</p>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          `;
          this.resultsDiv.appendChild(movieElement);
        });
      }
}
