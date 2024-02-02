import {API_KEY, BASE_URL} from '../../env';

export class GetMovieService {
  private mainUrl = BASE_URL + API_KEY + "&query=";
  private url: string = '';

  constructor() {}

  getMovieDetails(searchInput: string): Promise<PageDetails> {
    this.url = this.mainUrl + searchInput;
    return fetch(this.mainUrl + searchInput)
      .then(response => response.json())
      .then(data => data as PageDetails)
      .catch(error => {
        console.error(`Error: ${error.message}`);
        throw error;
      });
  }

  getPaginatedData(pageNumber: number): Promise<PageDetails> {
    return fetch(this.url + "&page=" + pageNumber)
      .then(response => response.json())
      .then(data => data as PageDetails)
      .catch(error => {
        console.error(`Error: ${error.message}`);
        throw error;
      });
  }
}

export interface PageDetails {
    page: number;
    total_pages: number;
    results: MovieDetails[];
    total_results: number;
  }
  
export interface MovieDetails {
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  }
