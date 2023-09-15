import React, { Component } from 'react'
import {movies} from './getMovies'
export default class Banner extends Component {
  render() {
  let movie=movies.results[0];
    return (
     
     <>
     {
        movie==''?
        <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>  :
        <div className="card banner-card">
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt={movie.title}/>
        <div clasName="card-body">
          <h1 className="card-title banner-title">{movie.original_title}</h1>
          <p className="card-text banner-text">{movie.overview}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
     }
      </>
     
    )
  }
}
