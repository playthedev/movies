import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Favourites extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgen:'All Genre',
            movies:[],
            currText:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data=JSON.parse(localStorage.getItem('movies')||'[]');
        let temp=[];
         data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]]))
            temp.push(genreids[movieObj.genre_ids[0]]);
         })
         temp.unshift('All Genre')
         this.setState({
            genres:[...temp],
            movies:[...data]
         })
    }
    handleGenChange=(genre)=>{
      this.setState({
        currgen:genre
      })
    }
    sortpopularitydesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortpopularitydesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
     sortpopularityass=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortratingdesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortratingass=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }
    handledelete=(id)=>{
        let newarr=[];
        newarr=this.state.movies.filter((movieObj)=>movieObj.id!=id)
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem('movies',JSON.stringify(newarr))
    }

    render() {
        // const movie = movies.results;
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        //  let temp=[];
        //  movie.forEach((movieObj)=>{
        //     if(!temp.includes(genreids[movieObj.genre_ids[0]]))
        //     temp.push(genreids[movieObj.genre_ids[0]]);
        //  }) 
        //  temp.unshift('All Genre')  
        // //  console.log(temp)     
        // //  this.setState({
        // //     genres:[...temp]
        // //  })

        let filterarr=[];   
        if(this.state.currText==''){
            filterarr=this.state.movies;
        }else{
            filterarr=this.state.movies.filter((movieObj)=>{
               let title= movieObj.original_title.toLowerCase();
               return title.includes(this.state.currText.toLowerCase())
            })
        }
        if(this.state.currgen!=='All Genre'){
            filterarr= this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
        }
        
        let pages=Math.ceil(filterarr.length/this.state.limit);
        let pagesarr=[];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si=(this.state.currPage-1)*this.state.limit;
        let li=si+this.state.limit;    
        filterarr=filterarr.slice(si,li)
        return (
            <>
                <div class="row favourite-handle">
                    <div class="col-lg-3  col-sm-12"  >
                        <ul class="list-group" style={{width:'80%'}}>
                        {
                            this.state.genres.map((genre)=>(
                                this.state.currgen===genre?
                                <li class="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}}>{genre}</li> :
                                <li class="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={()=>this.handleGenChange(genre)}>{genre}</li>
                            ))
                        }
                                         
                        </ul>

                    </div>
                    <div class="col-lg-9 col-sm-12 favourite-table">
                        <div class="row ">
                            <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e)=>this.setState({
                                currText:e.target.value
                            })}/>
                            <input type="number" className='input-group-text col' placeholder='Row count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortpopularitydesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortpopularityass}></i></th>
                                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortratingdesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortratingass}></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterarr.map((movieObj) => (
                                        <tr>

                                            <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}}/> {movieObj.original_title}</td>
                                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{movieObj.vote_average}   </td>
                                            <button type="button" class="btn btn-danger" style={{backgroundColor:'red'}} onClick={()=>this.handledelete(movieObj.id)}>Delete</button>
                                        </tr>

                                    ))
                                }

                               
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                            {
                                pagesarr.map((page)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)} >{page}</a></li>
                                ))
                            }
                               
                             </ul>
                        </nav>
                    </div>
                </div>
            </>
        )
    }
}
