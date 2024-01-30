const $ = (selector) => document.querySelector(selector);
const create = (element) => document.createElement(element);
// header
export const hamMenu = $("nav .hamMenu");
export const hamIcon = $(".hamMenu .fa-bars");
export const quitIcon = $(".hamMenu .fa-xmark");
export const menu = $("main div ul");

// main
export const navHome = $("#navHome");
export const navSeries = $("#navSeries");
export const navMovies = $("#navMovies");
export const navNewRelease = $("#navNewRelease");
export const moviesContainer = $("#previewCards-container");
export const articleContainer = $("#trendMovies");
export const divContainer = $("main > div");
export const inputContainer = $("main > div > div");
export const sectionTrending = $("main > section");
export const sectionTitle = $("main > section > h1");

// section more details
export const moreDetailsView = $("#moreDetails");
export const backBtnContainer = create("div");
export const anchor = create("a");
export const backIcon = document.createElement("i");
export const backdropContainer = create("figure");
export const backdropImg = create("img");
export const movieTitle = create("figcaption");
export const infoContainer = create("div");
export const timeContainer = create("div");
export const releaseDate = create("p");
export const separator = create("span");
export const duration = create("p");
export const ratingContainer = create("div");
export const ratingScore = create("p");
export const ratingIcon = create("i");
export const genreContainer = create("div");
export const genres = create("p");
export const overviewContainer = create("div");
export const overview = create("h2");
export const movieOverview = create("p");
export const director = create("h3");
export const positionTitle = create("p");
