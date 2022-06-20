import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading'
import { useGlobalContext } from "../context";
import { FaArrowLeft,FaArrowRight,FaBookmark} from 'react-icons/fa';

const TRMovies = () => {
    const {items,loading,error,fetchData,toggle,watchlist}=useGlobalContext()
    const [page,setPage]=useState(1)
    useEffect(()=>{
        fetchData(`https://api.themoviedb.org/3/movie/top_rated?api_key=72de8895bb64376912ef844faac64a10&language=en-US&page=${page}`)
    },[page])
    if(loading){
        return <Loading/>
    }
    if(error){
        return <div>ERROR</div>
    }
    console.log(items);
  return (
      <div className='popCont'>
        <h1>Top Rated Movies</h1>
        <div className='popularMovies'>
        
        {items.results && items.results.map((item,i)=>{
            const {original_title,vote_average,backdrop_path,id,poster_path,release_date}=item
            const img_path='https://image.tmdb.org/t/p/w1280'
            const t='movie'
            const stylesRating={
                border:vote_average>6.99?'2px solid green':vote_average>3.99?'2px solid yellow':'2px solid red'
            }
            const styleBookmark={
              color:watchlist && watchlist.some(x=>parseInt(x.id)===parseInt(id))?'rgb(196, 196, 36)':'rgb(128, 126, 126)',
              position:'absolute',
              left:'-80px',
              fontSize:'25px',
              opacity:'0.6'
            }     
  return (
    <div className='itemPopular'>
        <div className='posterCont'>
            <div name='watchlist' className="bookmark" onClick={(e)=>toggle(id,original_title,poster_path,t,e.currentTarget.attributes.name.value)}><FaBookmark style={styleBookmark} className="star"/></div>
            <Link to={`/SingleItem/${t}/${id}`}><img className='itemImg' src={`${img_path}${poster_path}`}/></Link>
            <div style={stylesRating} className='rating'>{vote_average*10}</div>
        </div>
        <div className='popInfo'>
            <Link className='PopTitleLink' to={`/SingleItem/${t}/${id}`}><h5>{original_title}</h5></Link>
            <p className='date'>{release_date}</p>
        </div>
    </div>
  )
  })} 
    </div>
    <div className='SearchBtns'>{page>1 && <div onClick={()=>setPage(pre=>pre-1)}><FaArrowLeft/>Prev</div>}<h3>{page}</h3>{page<items.total_pages && <div onClick={()=>setPage(pre=>pre+1)}>Next<FaArrowRight/></div>}</div>

    </div>
  )
}

export default TRMovies