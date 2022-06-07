import React from 'react'
import { Link } from 'react-router-dom'

const Item= ({original_title,vote_average,backdrop_path,id,poster_path,release_date}) => {
    const img_path='https://image.tmdb.org/t/p/w1280'

    const stylesRating={
        border:vote_average>6.99?'2px solid green':vote_average>3.99?'2px solid yellow':'2px solid red'
    }
    const t='movie'
  return (
    <div className='item'>
        <div className='posterCont'>
            <Link to={`SingleItem/${t}/${id}`}><img className='itemImg' src={`${img_path}${poster_path}`}/></Link>
            <div style={stylesRating} className='rating'>{vote_average*10}</div>
        </div>
        <Link className='titleLink' to={`SingleItem/${t}/${id}`}><h5>{original_title}</h5></Link>
        <p>{release_date}</p>
    </div>
  )
}

export default Item