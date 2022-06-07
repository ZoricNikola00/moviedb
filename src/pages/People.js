import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import {Link } from "react-router-dom";
import { FaArrowLeft,FaArrowRight} from 'react-icons/fa';
import Loading from '../Loading';

const People = () => {
    const {fetchData,items,loading}=useGlobalContext()
    const [page,setPage]=useState(1)
    const img_path='https://image.tmdb.org/t/p/w1280'

    useEffect(()=>{
        fetchData(`https://api.themoviedb.org/3/person/popular?api_key=72de8895bb64376912ef844faac64a10&language=en-US&page=${page}`)
    },[page])
    if(loading){
        return <Loading/>
    }
  return (
    <div className='peopleCont'>
        {items.results && items.results.map((x)=>{
         const {known_for,id,name,profile_path}=x
         console.log(known_for);
         return <div key={id} className='profile'>
             <Link to={`/person/${id}`}><img src={`${img_path}${profile_path}`}/></Link>
             <h4>{name}</h4>
         </div>
        })}
            <div className='SearchBtns'>{page>1 && <div onClick={()=>setPage(pre=>pre-1)}><FaArrowLeft/><p>Prev</p></div>}<h3>{page}</h3>{page<items.total_pages && <div onClick={()=>setPage(pre=>pre+1)}><p>Next</p><FaArrowRight/></div>}</div>

    </div>
  )
}

export default People