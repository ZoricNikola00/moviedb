import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
const img_path='https://image.tmdb.org/t/p/w1280'

const Watchlist = () => {
    const {removeFavorites,watchlist}=useGlobalContext()
  return (
    <div className='favorites'>
        <h1>Watchlist</h1>
        <div className='favoriteMovies'>
            {watchlist && watchlist.map(x=>{
                const {id,title,img,media}=x
                console.log(media);
                return <div key={id} className='favoriteMovie'>
                   <Link to={`/SingleItem/${media}/${id}/`}><img src={`${img_path}${img}`}/>
                    <h4>{title}</h4></Link>
                    <button name='watchlist' className='rmvFav' onClick={(e)=>removeFavorites(id,e.currentTarget.attributes.name.value)}><FaTimes/></button>
                </div>
            })}
        </div>
    </div>
  )
}

export default Watchlist