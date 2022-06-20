import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import Loading from "../Loading";
import {FaArrowRight,FaLink,FaStar,FaBookmark} from 'react-icons/fa';
import axios from 'axios'


const SingleItem=()=>{
    const {id,t}=useParams()
    const {favorites,fetchData,items,loading,toggleFavorites,watchlist}=useGlobalContext()
    const [cast,setCast]=useState([])
    const img_path='https://image.tmdb.org/t/p/w1280'
    
    useEffect(()=>{
    fetchData(`https://api.themoviedb.org/3/${t}/${id}?api_key=72de8895bb64376912ef844faac64a10&language=en-US`)
    const fetchPeople=async()=>{
        const response=await axios(`https://api.themoviedb.org/3/${t}/${id}/credits?api_key=72de8895bb64376912ef844faac64a10&language=en-US`).catch((err)=>console.log(err))
        const data=response.data
        setCast(data.cast);
    }
    fetchPeople()
    },[id])

    if(loading){
        return <Loading/>
    }   
    const {first_air_date,last_air_date,backdrop_path,poster_path,original_title,name,release_date,overview,vote_average,homepage,genres,runtime,status,tagline,budget}=items
    const stylesRating={
    border:vote_average>6.99?'4px solid green':vote_average>3.99?'4px solid yellow':'4px solid red'   }
    const styleStar={
     color:favorites && favorites.some(x=>parseInt(x.id)===parseInt(id))?'rgb(196, 196, 36)':'rgb(128, 126, 126)'
    }
    const styleBookmark={
        color:watchlist && watchlist.some(x=>parseInt(x.id)===parseInt(id))?'rgb(196, 196, 36)':'rgb(128, 126, 126)'
    }
const title=t==='movie'?original_title:name
const date=release_date && t==='movie'?release_date.slice(0,4): first_air_date && first_air_date.slice(0,4)!==last_air_date.slice(0,4)?`${first_air_date.slice(0,4)}-${last_air_date.slice(0,4)}`:`${first_air_date && first_air_date.slice(0,4)}-`
console.log(t);
    return(<>
    <div className="singleItem">
        <div className="background"><img src={`${img_path}${backdrop_path}`} alt='*'/></div>
        <div className="imgContainerSingle">
            <img className="singleImg" src={`${img_path}${poster_path}`} alt='*'/>
            <div name='watchlist' className="bookmark" onClick={(e)=>toggleFavorites(id,title,poster_path,t,e.currentTarget.attributes.name.value)}><FaBookmark style={styleBookmark} className="star"/></div>
        </div>
        
        <div className="singleContInfo">
            <div className="title">
                <h1>{title && title}</h1>
                <p>({date && date})</p>
                {homepage && <a href={homepage}><FaLink/></a>}
            </div>
            <div className="genre">
                {genres && genres.map((x,u)=><p key={u}>{x.name}</p>)}
                {runtime && <div className="dot"></div>}
                <p>{runtime && `${runtime}m`}</p>
            </div>
            <div className="ratCont">
                <div style={stylesRating} className="ratingSingle">{vote_average && vote_average}</div>
                <p>Rating</p>
                <div name='favorite' onClick={(e)=>toggleFavorites(id,title,poster_path,t,e.currentTarget.attributes.name.value)}><FaStar style={styleStar} className="star"/></div>
            </div>
            {tagline && <div className="tagline">{tagline}</div>}
            <div className="overview"><h4>Overview</h4><p>{overview && overview}</p> </div>
        </div>
        
    </div>
    <div className="casts">
            {cast && cast.slice(0,7).map((x)=>{
                const {id,character,name,profile_path}=x
                return <div key={id} className="cast">
                            <Link to={`/person/${id}`}><img src={`${img_path}${profile_path}`}/></Link>
                            <div className="cast-info">
                                <h3>{character}</h3>
                                <p>{name}</p>
                            </div>
                        </div>
            })}
            <Link to='cast' className="viewMore"><div>View More <FaArrowRight/></div></Link>
        </div>
    </> )}

export default SingleItem
