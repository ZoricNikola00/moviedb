import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context'
const img_path='https://image.tmdb.org/t/p/w1280'

const Favorite = () => {
    const {remove,favorites}=useGlobalContext()
  return (
    <div className='favorites'>
        <h1>Favorite</h1>
        <div className='favoriteMovies'>
            {favorites && favorites.map(x=>{
                const {id,title,img,media}=x
                console.log(media);
                return <div key={id} className='favoriteMovie'>
                   <Link to={`/SingleItem/${media}/${id}/`}><img src={`${img_path}${img}`}/>
                    <h4>{title}</h4></Link>
                    <button name='favorite' className='rmvFav' onClick={(e)=>remove(id,e.currentTarget.attributes.name.value)}><FaTimes/></button>
                </div>
            })}
        </div>
    </div>
  )
}

export default Favorite