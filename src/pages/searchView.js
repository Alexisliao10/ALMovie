import * as nodes from "../utilities/nodes.js";
import { searchMoviesAPI } from "../utilities/getDataApi.js";
import renderPreviewCards from "../utilities/renderCards.js";

export function searchViewLayout() {
  nodes.moviesContainerTitle.classList.add("hidden");
  nodes.moreDetailsView.innerHTML = "";
  nodes.inputContainer.classList.remove("hidden");
  nodes.moviesContainer.classList.remove("hidden");
  nodes.heroContainer.classList.add("lg:hidden");
  nodes.sectionTitle.classList.add("lg:hidden");
}

export let totalPagesFromSearch;

export async function searchMovies(page = 1, clean) {
  const [_, query] = location.hash.split("=");
  const searchData = await searchMoviesAPI(query, page);
  const resultsData = searchData.results.sort(
    (a, b) => b.popularity - a.popularity,
  );
  totalPagesFromSearch = [];
  totalPagesFromSearch.push(searchData.total_pages);
  renderPreviewCards(resultsData, { clean: clean });
}
