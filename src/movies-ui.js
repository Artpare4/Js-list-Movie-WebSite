import {getAllMovies,posterUrl} from "./movies-api";

export function createMovieElt(movieData){
    const Div=document.createElement("article");
    Div.className="movie-item";

    const movieItemPoster=document.createElement("img");
    movieItemPoster.setAttribute('src',posterUrl(movieData["poster"],'medium'));
    movieItemPoster.setAttribute('alt',`poster of '${movieData["title"]}'`);
    movieItemPoster.className="movie-item__poster";
    Div.appendChild(movieItemPoster);

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
            response.collection.map((film)=>article.appendChild(createMovieElt(film))));
    return  article;

}

export function createPaginationButtonElt(materialIcon, isDisabled, page){

    const bouton=document.createElement("button");
    bouton.className="button";
    bouton.type="button";

    bouton.addEventListener("click",updateMoviesElt);

    if(isDisabled){
        bouton.disabled=true;
    }

    const span=document.createElement('span');
    span.className="material-symbols-outlined";
    span.textContent=materialIcon;
    bouton.appendChild(span);

    return bouton;
}