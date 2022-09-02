
import React, { Component } from 'react';
import './SearchBox.css';
import store from "../GlobalState/Store"

class SearchBox extends Component {
    state = {
        searchLine: '',
        emptyResponse: true
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=fdc2a817`)
        .then(response=>response.json())
        .then(
            (result)=>{
                store.dispatch({
                    type: "ADD_FILM",
                    payload: {
                        movies: result.Search ? result.Search : []
                    }
                })
            }
        )
        
    }
    
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;