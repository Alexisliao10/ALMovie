import * as node from "./nodes.js";
import { genreList } from "./getDataApi.js";
import { lazyLoader } from "../main.js";
import { addShowMoreBtn, removeShowMoreBtn } from "../buttons/showMoreBtn.js";
import noImageFound from "@assets/images/noImageAvailable.jpg";
export function getIdName(id, list) {
  const names = [];
  for (let i = 0; i < id.length; i++) {
    const idFound = list.find((item) => item.id === id[i]);
    if (idFound) {
      names.push(idFound.name);
    }
  }
  return names.slice(0, 3); // How many genres should be displayed
}
async function getGenreNames(apiData) {
  const resList = genreList;
  let list = [];
  apiData.forEach((data) => {
    const genres = getIdName(data.genre_ids, resList);
    list.push(genres);
  });
  return list;
}
function cardIterator(data, genreNames, lazyLoad) {
  data.forEach((movie, i) => {
    // variables
    const ratingInfo = movie.vote_average.toFixed(1);
    const movieCard = document.createElement("figure");
    const movieInfoContainer = document.createElement("div");
    const movieOverview = document.createElement("p");
    const movieGenresContainer = document.createElement("div");
    const movieImg = document.createElement("img");
    const movieTitle = document.createElement("figcaption");
    const movieCardFooter = document.createElement("div");
    const anchor = document.createElement("a");
    const viewMore = document.createElement("p");
    const movieRatingContainer = document.createElement("div");
    const rating = document.createElement("p");
    const starIcon = document.createElement("i");

    // classlist/attribute
    movieCard.classList.add(
      "relative",
      "z-auto",
      "w-full",
      "max-w-xs",
      "cursor-pointer",
      "select-none",
    );
    movieInfoContainer.classList.add(
      "absolute",
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );
    movieOverview.classList.add(
      "mt-2",
      "line-clamp-10",
      "max-h-40",
      "px-2",
      "text-start",
      "text-xs",
    );
    movieOverview.textContent = movie.overview;
    movieGenresContainer.classList.add(
      "top-44",
      "mt-2",
      "flex",
      "w-full",
      "flex-wrap",
      "justify-start",
      "gap-2",
      "px-2",
    );

    genreNames[i].forEach((name) => {
      const movieGenre = document.createElement("p");
      movieGenre.classList.add("genre", "text-xxs");
      movieGenre.textContent = name;
      movieGenresContainer.append(movieGenre);
    });
    movieCardFooter.classList.add(
      "absolute",
      "top-[230px]",
      "flex",
      "w-full",
      "items-center",
      "justify-between",
      "gap-1",
      "px-2",
    );
    anchor.classList.add("cursor-pointer", "hover:text-azure", "z-20");
    viewMore.classList.add("text-[14px]");
    viewMore.textContent = "View More...";
    movieRatingContainer.classList.add("flex", "items-center", "gap-1", "z-20");
    rating.classList.add("rating", "text-sm");
    rating.textContent = ratingInfo;
    starIcon.classList.add(
      "fa-solid",
      "fa-star",
      "fa-sm",
      "pb-1",
      "text-amber-500",
    );

    movieImg.classList.add(
      "relative",
      "w-full",
      "h-auto",
      "z-10",
      "rounded-lg",
      "select-none",
      "aspect-[13/20]",
      "hover:border-2",
      "hover:border-sky-500",
    );
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
        : noImageFound,
    );
    movieImg.alt = movie.title;
    movieImg.draggable = false;
    movieImg.setAttribute("loading", "lazy");
    movieTitle.textContent = movie.title;
    movieTitle.classList.add("relative", "text-center", "mt-2");
    // appends
    anchor.append(viewMore);
    movieRatingContainer.append(rating, starIcon);
    movieCardFooter.append(anchor, movieRatingContainer);
    movieInfoContainer.append(movieOverview);
    movieInfoContainer.append(movieGenresContainer);
    movieInfoContainer.append(movieCardFooter);
    movieCard.append(movieInfoContainer);
    movieCard.append(movieImg, movieTitle);

    // main movie container
    node.articleContainer.append(movieCard);

    // functions
    movieCard.addEventListener("click", () => {
      movieInfoContainer.classList.toggle("opacity-0");
      movieImg.classList.toggle("opacity-20");
    });
    movieCard.addEventListener("mouseenter", () => {
      movieInfoContainer.classList.remove("opacity-0");
      movieImg.classList.add("opacity-20");
    });
    movieCard.addEventListener("mouseleave", () => {
      movieInfoContainer.classList.add("opacity-0");
      movieImg.classList.remove("opacity-20");
    });
    anchor.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id + "-" + movie.title;
    });
    movieCard.addEventListener("dblclick", () => {
      location.hash = "#movie=" + movie.id + "-" + movie.title;
    });
    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }
  });
}

export default async function renderPreviewCards(
  apiData,
  { lazyLoad = true, clean = true } = {},
) {
  try {
    const res = await apiData;
    const genreNames = await getGenreNames(res);
    if (clean) {
      node.articleContainer.innerHTML = "";
    }
    if (document.getElementById("showMoreBtn")) {
      removeShowMoreBtn();
    }

    cardIterator(res, genreNames, lazyLoad);

    if (node.articleContainer.childElementCount === 20) {
      addShowMoreBtn();
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
