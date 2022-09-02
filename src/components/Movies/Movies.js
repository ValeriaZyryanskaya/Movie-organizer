import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from "../GlobalState/Store"

class Movies extends Component {
    state = { 
        movies: [],
        showEmptyError: false
    }
    componentDidMount(){
        store.subscribe(()=>{
            const state=store.getState();
            this.setState({
                movies: state.movies,
                showEmptyError: state.showEmptyError
            })
        })
    }
    render() { 
        return ( 
            <ul className="movies">
                {this.state.showEmptyError && !this.state.movies.length ? <div>Фильм не найден</div> : ""}
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default Movies;