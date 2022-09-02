import React, { Component } from 'react';
import './MovieItem.css';
import store from "../GlobalState/Store"

class MovieItem extends Component {
state={
    favorites: []
}

    addToFavorites=(imdbID)=>{
        store.dispatch({
            type: "ADD_TO_FAVORITES",
            payload: {
                imdbID: imdbID
            }
        })
    }
    componentDidMount(){
        store.subscribe(()=>{  
            const state=store.getState();
            this.setState({
                favorites:state.favorites
            })
        })
        
    }
  
    render() {
        const { Title, Year, Poster, imdbID} = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" 
                    disabled={this.state.favorites.find(film => film.Title === Title)} 
                    onClick={()=>this.addToFavorites(imdbID)}>Добавить в список</button>
                    
                </div>
            </article>
        );
    }
}
 
export default MovieItem;