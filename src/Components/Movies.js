import React, { Component } from 'react'
// import {movies} from './getMovies'
import axios from 'axios';
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }
    
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        // console.log(data)
        
        this.setState({
            movies: [...data.results]  
        })
       this. handleFavouriteState()
    }
    changesMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        // console.log(data)
        this.setState({
            movies: [...data.results]
        })
    }
    handleRight = async () => {
        let temparr = [];
        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            temparr.push(i);
        }
        this.setState({
            parr: [...temparr],
            currPage: this.state.currPage + 1
        }, this.changesMovies)
    }
    handleLeft = () => {
        if (this.state.currPage != 1) {
            let temparr = [];
            for (let i = 1; i <= this.state.parr.length - 1; i++) {
                temparr.push(i);
            }
            this.setState({
                currPage: this.state.currPage - 1,
                parr: [...temparr]
            }, this.changesMovies)
        }
    }
    handleClick = (value) => {
        if (value != this.state.currPage) {
            this.setState({
                currPage: value
            }, this.changesMovies)
        }
    }
    handleFavourites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]');
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((m) =>
                m.id !== movie.id
            )
        } else {
            oldData.push(movie)
        }
        localStorage.setItem('movies', JSON.stringify(oldData));
        //    console.log(oldData)
        this.handleFavouriteState();
    }
    handleFavouriteState = () => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]');
        let temp = oldData.map((movies) => movies.id);
        this.setState({
            favourites: [...temp]
        })
    }
    render() {
        // console.log('render')
        // let movie=movies.results;
        
        return (
            <>
                {

                    this.state.movies.length == 0 ?
                        <div class="spinner-border" role="status" >
                            <span class="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h3 className='text-center'><strong>Trending</strong></h3>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map((movieObj) => (

                                        <div className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: ' ' })} >
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.title} />
                                            <div clasName="card-body">
                                                <h1 className="card-title movies-title">{movieObj.original_title}</h1>
                                                {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                                <div className='button-wrapper' style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                                    {
                                                        this.state.hover == movieObj.id &&
                                                        <a className="btn btn-primary movies-button" onClick={() => this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id) ? 'Remove from favourites' : 'Add to favourites'}</a>

                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {

                                            this.state.parr.map((value) => (
                                                <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)} >{value}</a></li>
                                            ))
                                        }
                                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}
