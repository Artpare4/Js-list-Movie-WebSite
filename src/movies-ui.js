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

export function appendSortToQuery(urlSearchParams){
    const value = document.querySelector('input[type="radio"]:checked').value;
    urlSearchParams.set(value,'asc');
}
export function updateMoviesElt(page=1){
    const url= new URLSearchParams;
    url.set("page",page);
    appendSortToQuery(url);
    const article=document.querySelector(".movies-list")
    setLoading();
    const films=getAllMovies(url)
        .then((response)=>{
            emptyElt(document.querySelector('article.movies-list'));
            updatePaginationElt(response.pagination);
            response.collection.forEach((film)=>article.appendChild(createMovieElt(film)))
        }

        ).catch((error)=>{
            console.log(error)
        });

    return  article;
}

export function createPaginationButtonElt(materialIcon, isDisabled,page){

    const bouton=document.createElement("button");
    bouton.className="button";
    bouton.type="button";
    bouton.addEventListener("click",()=>{
        updateMoviesElt(page);
    });

    if(isDisabled){
        bouton.disabled=true;
    }

    const span=document.createElement('span');
    span.className=`material-symbols-outlined`;
    span.textContent=materialIcon;
    bouton.appendChild(span);

    return bouton;
}


export function emptyElt(elt){
    while(elt.hasChildNodes()){
        elt.removeChild(elt.firstChild);
    }
}


export function updatePaginationElt(pagination) {
    if(pagination.last!==1){
        const nav = document.querySelector('nav.pagination');
        if (pagination.current === 1) {
            nav.appendChild(createPaginationButtonElt('first_page', true, 1))
            nav.appendChild(createPaginationButtonElt('navigate_before', true,1))

        } else {
            nav.appendChild(createPaginationButtonElt('first_page', false, 1))
            nav.appendChild(createPaginationButtonElt('navigate_before', false, pagination.current - 1))
        }

        const span = document.createElement("span")
        span.className = "pagination__info"
        span.textContent = `${pagination.current}/${pagination.last}`
        nav.appendChild(span);

        if (pagination.current === pagination.last) {
            nav.appendChild(createPaginationButtonElt('navigate_next', true, pagination.last ))
            nav.appendChild(createPaginationButtonElt('last_page', true, pagination.last))
        }
        else{
            nav.appendChild(createPaginationButtonElt('navigate_next', false, parseInt(pagination.current) + 1))
            nav.appendChild(createPaginationButtonElt('last_page', false, pagination.last))
        }
        return nav;
    }
}

export function setLoading(){
    emptyElt(document.querySelector('nav.pagination'))
    const article=document.createElement("article");
    article.className='loading';
    const  elmt = document.querySelector('article.movies-list');
    elmt.replaceChildren(article);
}