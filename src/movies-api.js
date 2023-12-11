export const API_URL="http://movies-api";

export function getAllMovies(){
    let $request;
    $request=fetch(`${API_URL}/movies`);
    return $request.then((response)=>response.json())
}

export function posterUrl(imagePath,size="original"){
    return `${API_URL}${imagePath}/${size}`;
}

export function extractPaginationFromHeaders(response){
    return {
        current: parseInt(response.headers.get("Pagination-Current-Page")),
        last: parseInt(response.headers.get("Pagination-Last-Page")),
    };

}