import {getAllMovies} from "./movies-api";

export function createMovieElt(movieData){
    const Div=document.createElement("article");
    Div.className="movie-item";

    const movieItemInfo=document.createElement("div");
    movieItemInfo.className="movie-item__info";
    Div.appendChild(movieItemInfo);

    const movieItemTitle=document.createElement("div");
    movieItemTitle.className="movie-item__title";
    movieItemInfo.appendChild(movieItemTitle);

    const Title=document.createElement("p");
    Title.className="title";
    Title.textContent=`${movieData["title"]}`;
    movieItemTitle.appendChild(Title);

    return Div;
}

export function updateMoviesElt(){
    const article=document.querySelector(".movies-list")
    const films=getAllMovies()
        .then((response)=>
            response.map((film)=>article.appendChild(createMovieElt(film))));
    return  article;

}