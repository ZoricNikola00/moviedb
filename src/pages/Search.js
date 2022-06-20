import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { FaArrowLeft,FaArrowRight} from 'react-icons/fa';

const img_path='https://image.tmdb.org/t/p/w1280'

const Search = () => {
    const {q,t}=useParams()
    const {fetchData,items,query}=useGlobalContext()
    const [page,setPage]=useState(1)
    const [searchType,setSearchType]=useState('movie')
    const navigate=useNavigate()

    const redirect=(id,type)=>{
        if(searchType==='person'){
            navigate(`/person/${id}`)
        }
        else{
            navigate(`/SingleItem/${type}/${id}`)
        }
    }
   
    useEffect(()=>{
        fetchData(`https://api.themoviedb.org/3/search/${searchType}?api_key=72de8895bb64376912ef844faac64a10&language=en-US&query=${q}&page=${page}`)
        window.scrollTo(0, 0);
    },[q,page,searchType])

  console.log(query);
  
    return (
    <div className='searchPage'>
        <div className='searchSide'>
            <h3>Search Results : {items.total_results && items.total_results}</h3>
            <h3>Number Of Pages : {items.total_pages && items.total_pages}</h3>
            <form>
                <div className="radio">
                  <label>
                    <input type="radio" checked={searchType==='movie'} value="movie" onChange={e=>setSearchType(e.target.value)} />
                    Movie
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" checked={searchType==='tv'} value="tv" onChange={e=>setSearchType(e.target.value)} />
                    TV Shows
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" checked={searchType==='person'} value="person" onChange={e=>setSearchType(e.target.value)} />
                    People
                  </label>
                </div>
            </form>
        </div>
        <div className='searchItems'>
            {items.results && items.results.map((x)=>{
                    const genders={1:'Female',2:'Male'}
                    const {id,gender,poster_path,original_title,name,profile_path,first_air_date,overview,release_date}=x
                    const title=searchType==='movie'?original_title:name
                    const date=searchType==='movie'?release_date:first_air_date
                return <div key={id} className='searchItem'>
                    <img src={`${img_path}${poster_path?poster_path:profile_path}`} onClick={()=>redirect(id,searchType)} alt='Image not found' onError={(e)=>{e.target.onerror=null;e.target.src=`${searchType==='person'?'https://images.assetsdelivery.com/compings_v2/belopoppa/belopoppa2002/belopoppa200200004.jpg':'https://archive.org/download/no-photo-available/no-photo-available.png'}`}}/>
                    <div className='searchInfo'>
                        <h3 onClick={()=>redirect(id,searchType)}>{title}</h3>
                        <small>{date?date:genders[gender]}</small>
                        {overview && <p>{overview}</p>}
                    </div>
                    
                    </div>
            })}
            <div className='SearchBtns'>{page>1 && <div onClick={()=>setPage(pre=>pre-1)}><FaArrowLeft/>Prev</div>}<h3>{page}</h3>{page<items.total_pages && <div onClick={()=>setPage(pre=>pre+1)}>Next<FaArrowRight/></div>}</div>
        </div>
        
    </div>
  )
}

export default Search