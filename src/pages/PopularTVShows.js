import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading'
import { FaArrowLeft,FaArrowRight,FaBookmark} from 'react-icons/fa';
import { useGlobalContext } from "../context";

const PopularTVShows = () => {
    const {items,loading,error,fetchData,toggle,watchlist}=useGlobalContext()
    const [page,setPage]=useState(1)

    useEffect(()=>{
        fetchData(`http://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=72de8895bb64376912ef844faac64a10&page=${page}`)
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
       <h1>Popular TV Shows</h1>
       <div className='popularMovies'>
        
       {items.results && items.results.map((item,i)=>{
        const {name,vote_average,backdrop_path,id,poster_path,first_air_date}=item
        const img_path='https://image.tmdb.org/t/p/w1280'
        const t='tv'
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
    <div key={id} className='itemPopular'>
        <div className='posterCont'>
            <Link to={`/SingleItem/${t}/${id}`}><img className='itemImg' src={`${img_path}${poster_path}`}/></Link>
            <div style={stylesRating} className='rating'>{vote_average*10}</div>
            <div name='watchlist' className="bookmark" onClick={(e)=>toggle(id,name,poster_path,t,e.currentTarget.attributes.name.value)}><FaBookmark style={styleBookmark} className="star"/></div>
        </div>
        <div className='popInfo'>
            <Link className='PopTitleLink' to={`/SingleItem/${t}/${id}`}><h5>{name}</h5></Link>
            <p className='date'>{first_air_date}</p>
        </div>
    </div>
  )
  })} 
    </div>
        <div className='SearchBtns'>{page>1 && <div onClick={()=>setPage(pre=>pre-1)}><FaArrowLeft/><p>Prev</p></div>}<h3>{page}</h3>{page<items.total_pages && <div onClick={()=>setPage(pre=>pre+1)}><p>Next</p><FaArrowRight/></div>}</div>

    </div>
  )
}

export default PopularTVShows