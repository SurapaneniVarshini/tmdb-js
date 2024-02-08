import { GetMovieService } from '../services/get-movie.service';
import { PageDetails } from '../services/get-movie.service';
import { MovieDetails } from '../services/get-movie.service';
import { debounce } from '../index';

export class SearchComponent {
  userInput: HTMLInputElement;
  resultsDiv: HTMLDivElement;
  pageDetails: PageDetails;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  pageData: MovieDetails[];
  loading: boolean;

  constructor(private movieService: GetMovieService) {
    this.userInput = document.getElementById('movieInput') as HTMLInputElement;
    this.resultsDiv = document.getElementById('results') as HTMLDivElement;
    this.pageDetails = { page: 1, results: [], total_pages: 0, total_results: 0 };
    this.pageSize = this.pageDetails.results.length;
    this.currentPage = 1;
    this.totalPages = this.pageDetails.total_pages;
    this.pageData = [];
    this.loading = false;
  }

  init() {
    this.userInput.addEventListener('input', debounce(() => {
      this.search();
    }, 750));

    this.togglePaginationButtons(false); 

    document.getElementById('nextBtn')?.addEventListener('click', () => this.onNextPage());
    document.getElementById('prevBtn')?.addEventListener('click', () => this.onPreviousPage());
  }

  search() {
    const input = this.userInput.value;
    if (input.trim() !== '') {
      this.movieService.getMovieDetails(input)
        .then(response => {
          this.pageDetails = response;
          this.pageSize = this.pageDetails.results.length;
          this.totalPages = this.pageDetails.total_pages;
          this.pageData = this.pageDetails.results;
          this.currentPage = 1;
          this.renderResults();
          this.togglePaginationButtons(this.totalPages > 1);
        })
        .catch(error => {
          console.error(`Error: ${error.message}`);
        });
    }
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

    this.pageData.forEach((movie, index) => {
      if (index % 5 === 0) {
        const row = document.createElement('div');
        row.classList.add('row', 'mb-4');
        this.resultsDiv.appendChild(row);
      }

      const modalId = `overviewModal${index}`;
      const movieCard = document.createElement('div');
      movieCard.classList.add('col-md-2', 'col-6', 'movie');
      movieCard.innerHTML = `
        <div class="card" data-bs-toggle="modal" data-bs-target="#${modalId}">
          <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">Release Date: ${movie.release_date}</p>
            <p class="card-text">Vote Average: ${movie.vote_average}</p>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="overviewModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="overviewModalLabel">Overview</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>${movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      const currentRow = this.resultsDiv.lastChild as HTMLDivElement;
      currentRow.appendChild(movieCard);
    });
  }

  private togglePaginationButtons(visible: boolean) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn && nextBtn) {
      prevBtn.style.display = visible ? 'block' : 'none';
      nextBtn.style.display = visible ? 'block' : 'none';
    }
  }
}

const searchComponent = new SearchComponent(new GetMovieService());
searchComponent.init();
