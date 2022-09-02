import React, { Component } from 'react';
import './Favorites.css';
import store from "../GlobalState/Store"
import {Link} from "react-router-dom"

class Favorites extends Component {
    state = {
        title: '',
        movies: [
    
        ],
        id: '' 
    }
    componentDidMount(){
        store.subscribe(()=>{
            const state=store.getState();
            this.setState({
                movies: state.favorites
            })
        })
        
    }
    removeMovie=(imdbID)=>{
        store.dispatch({
            type: "REMOVE_MOVIE",
            payload: {
                imdbID:imdbID
            }
        })
    }
    setTitle=(e)=>{
        this.setState({title:e.target.value})
    }
    createList=()=>{
        const info={
            title:this.state.title,
            movies:this.state.movies
        }
        fetch('https://acb-api.algoritmika.org/api/movies/list',
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(data=>data.json())
        .then(data=>{
            this.setState({id:data.id})
            console.log(data.id);
        })
        
    }
    
    render() { 
        return (
            
            <div className="favorites">
                <input value={this.state.title} placeholder="Введите название списка" className="favorites__name" onChange={this.setTitle}/>
                <ul className="favorites__list">
                    {this.state.movies && this.state.movies.map((item) =>
                    {
                        return (
                            <div className="favorites__list-item" key={item.imdbID}>
                                <li> {item.Title} ({item.Year})</li>
                                <button onClick={()=>{this.removeMovie(item.imdbID)}}>X</button>
                            </div>
                        )
                        
                    })}
                </ul>
                {this.state.id 
                ? <Link to ={'/list/' + this.state.id}> Перейти к списку </Link>
                :<button 
                type="button" className="favorites__save" 
                disabled={!this.state.title || this.state.movies.length===0} 
                onClick={this.createList}>Сохранить список
                </button>
                }
                
            </div>
        );
    }
}
 
export default Favorites;