import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex'}}>
      <Link to={'/'}><h1 style={{marginLeft:'0.5rem',marginTop:'0.5rem',textDecoration:'none'}}>Movies App</h1></Link>
      <Link to={'/Favourites'}><h2 style={{marginLeft:'2rem',marginTop:'1.5rem',textDecoration:'none'}}>Favourites</h2></Link>   
      </div>
    ) 
  }
}
