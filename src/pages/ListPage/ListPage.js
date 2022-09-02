import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [
           
        ],
        title: ""
    }

    componentDidMount() {
        const id = this.props.match.params;
        console.log(id.id);
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id.id}`)
        .then(data=>data.json())
        .then(data=>{
            this.setState({movies:data.movies, title:data.title})
        })
        .catch(err=>console.log(err))
        
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1> 
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;