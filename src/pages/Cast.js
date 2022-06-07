import React, { useEffect } from 'react'
import { useParams,Link } from "react-router-dom";
import { useGlobalContext } from '../context';
const img_path='https://image.tmdb.org/t/p/w1280'

const Cast = () => {
    const {fetchData,items}=useGlobalContext()
    const {id,t}=useParams()

    useEffect(() => {
        fetchData(`https://api.themoviedb.org/3/${t}/${id}/credits?api_key=72de8895bb64376912ef844faac64a10&language=en-US`)
    }, [t])
const {cast,crew}=items
var ids =crew && crew.map(o => o.name)
var filtered =crew && crew.filter(({name}, index) => !ids.includes(name, index + 1))

  return (
    <div className='castContainer'>
        <div className='allCast'>
            <div className='castHead'><p>Cast</p><span>{cast && cast.length}</span></div>
            {cast && cast.map((x)=>{
                const {id,name,character,profile_path}=x
                return <div key={id} className='singleCast'>
                        <Link to={`/person/${id}`}><img src={`${img_path}${profile_path}`} alt='Image not found' onError={(e)=>{e.target.onerror=null;e.target.src=`https://images.assetsdelivery.com/compings_v2/belopoppa/belopoppa2002/belopoppa200200004.jpg`}}/></Link>
                        <div className='nameAndCharacter'>
                            <h3>{name}</h3>
                            <p>{character}</p>
                        </div>
                       </div>
            })}
        </div>
        <div className='allCast'>
        <div className='castHead'><p>Crew</p><span>{crew && crew.length}</span></div>
        {filtered && filtered.map((x)=>{
                const {id,name,known_for_department,department,profile_path}=x
                
                return <div key={id} className='singleCast'>
                        <Link to={`person/${id}`}><img src={`${img_path}${profile_path}`} alt='Image not found' onError={(e)=>{e.target.onerror=null;e.target.src=`https://images.assetsdelivery.com/compings_v2/belopoppa/belopoppa2002/belopoppa200200004.jpg`}}/></Link>
                        <div className='nameAndCharacter'>
                            <h3>{name}</h3>
                            <p>{known_for_department}</p>
                        </div>
                       </div>
            })}
        </div>    
    </div>
  )
}

export default Cast