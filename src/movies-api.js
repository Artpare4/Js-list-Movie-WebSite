export const API_URL="http://movies-api";

export function getAllMovies(page=1){
    let $request;
    $request=fetch(`${API_URL}/movies?page=${page}`);
    return $request.then((response)=>extractCollectionAndPagination(response))
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


export function extractCollectionAndPagination(response){
        return response.json().then((data)=>{
            return{
                collection:data,
                pagination:extractPaginationFromHeaders(response)
            }
            }
        )}