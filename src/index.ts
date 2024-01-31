import {GetMovieService} from './get-movie.service';
import {SearchComponent} from './search.component';

export function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function () {
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

const movieService = new GetMovieService();
const searchComponent = new SearchComponent(movieService);
searchComponent.init();