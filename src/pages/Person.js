import React, {useState,useEffect} from 'react'
import { useParams,Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { FaImdb,FaTwitter,FaInstagram,FaFacebook } from 'react-icons/fa';
import Loading from '../Loading';
const img_path='https://image.tmdb.org/t/p/w1280'
const genders={
    1:'Female',
    2:'Male'
}
const Person = () => {
    const {id}=useParams()
    const {fetchData,items,loading}=useGlobalContext()
    const [socialLinks,setSocialLinks]=useState({})
    const [movieCredits,setMovieCredits]=useState([])
    const [showBio,setShowBio]=useState(true)
    const fetchMovies=async()=>{
        try{
            const response=await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=72de8895bb64376912ef844faac64a10&language=en-US`)
            const data= await response.json()
            if(data){    
                setMovieCredits(data)
            }
            }catch(err){
                return console.log(err);
              }
    }

    const fetchSocial=async()=>{
            try{
            const response=await fetch(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=72de8895bb64376912ef844faac64a10&language=en-US`)
            const data= await response.json()
            if(data){    
                setSocialLinks(data)
            }
            }catch(err){
                return console.log(err);
              }
        }
    useEffect(()=>{
        fetchData(`https://api.themoviedb.org/3/person/${id}?api_key=72de8895bb64376912ef844faac64a10&language=en-US`)
        fetchMovies()
        fetchSocial()
    },[id])
    if(loading){
        return <Loading/>
    }

    const {known_for_department,gender,biography, birthday,homepage,name,place_of_birth,profile_path}=items
    const {imdb_id,facebook_id,twitter_id,instagram_id}=socialLinks

    const movieKnown=movieCredits.cast && movieCredits.cast.sort((a,b)=>b.popularity-a.popularity)

  return (
    <div className='person-container'>
        
        <div className='person-info-left'>
            <img src={`${img_path}${profile_path}`}/>
            <h2>Personal Info</h2>
            <h4>Known For</h4>
            <p>{known_for_department}</p>
            <h4>Gender</h4>
            <p>{genders[gender]}</p>
            <h4>Birthday</h4>
            <p>{birthday}</p>
            <h4>Place of Birth</h4>
            <p>{place_of_birth}</p>
            <div className='socials'>
            {imdb_id && <a href={`https://www.imdb.com/name/${imdb_id}`}><FaImdb/></a>}
            {facebook_id && <a href={`https://www.facebook.com/${facebook_id}`}><FaFacebook/></a>}
            {twitter_id && <a href={`https://www.twitter.com/${twitter_id}`}><FaTwitter/></a>}
            {instagram_id && <a href={`https://www.instagram.com/${instagram_id}`}><FaInstagram/></a>}
            </div>
        </div>
        <div className='person-info-right'>
            <h1>{name}</h1>
            <h3>Biography</h3>
            <p>{biography && showBio ? biography.slice(0, 600) : biography}
      {biography && biography.length>600 &&<span onClick={()=>setShowBio(p=>!p)} className="readMore">
        {biography.length &&showBio ? "...Read More" : " Show Less"}</span>}</p>
        <h2>Known for...</h2>

            <div className='knownFor'>
                {movieCredits.cast && (movieKnown.length>10?movieKnown.slice(0,10):movieKnown).map((x,i)=>{
                    const {original_title,poster_path,id,media_type,name}=x
                    const title=media_type==='tv'?name:original_title
                    return <Link key={i} className='person-movie' to={`/SingleItem/${media_type}/${id}`}><div  >
                        <img src={`${img_path}${poster_path}`}/>
                        <h4>{title}</h4>
                    </div></Link>
                })}
            </div>
          {movieCredits.cast && <div className='allCast'><h3>Acting</h3>{movieCredits.cast && movieCredits.cast.sort((a,b)=>{
        const dateA = a.release_date ? a.release_date.slice(0,4): a.first_air_date && a.first_air_date.slice(0,4)
        const dateB= b.release_date ? b.release_date.slice(0,4) : b.first_air_date && b.first_air_date.slice(0,4)
        return dateB-dateA
    }).map((x)=>{
        const {release_date,first_air_date,name,original_title,character,media_type,id}=x
        const date = release_date ? release_date.slice(0,4): first_air_date && first_air_date.slice(0,4)   
        const title=media_type==='tv'?name:original_title

             return <div className='castFromAll' key={id}>
            <p>{date}</p><h4><Link to={`/SingleItem/${media_type}/${id}`}>{title}</Link></h4>{character && <p><small>as</small> {character}</p>}
        </div>
    })}</div>}
        </div>
        
    </div>
  )
}

export default Person

//                    {movieCredits.cast && movieCredits.cast.sort((a,b)=>a.release_date- b.release_date).map()}       
