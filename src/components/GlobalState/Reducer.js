

const state={
    movies:[],
    favorites:[],
    showEmptyError: false
}



export default function reducer(store=state, action){
    switch(action.type){
        case ("ADD_FILM"):
            let moviesList=[...state.movies]
            action.payload.movies.map((item)=>{
                moviesList.push(item)
        })
        return{
            ...state,
            movies:moviesList,
            showEmptyError:true
        }
        case ("ADD_TO_FAVORITES"):
            let film=store.movies.find(item=>item.imdbID===action.payload.imdbID)
                let updatedState={
                ...store,
                favorites: [
                    ...store.favorites, 
                    film
                ]
            }
            return updatedState
            
            
            
            
        case ("REMOVE_MOVIE"):
                const newArray = store.favorites.filter(item=>item.imdbID!==action.payload.imdbID)
                let removeState={
                    ...store,
                    favorites: 
                        newArray
                    
                }
                    return removeState
        
    }
    return store
}