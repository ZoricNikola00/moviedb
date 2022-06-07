import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import Item from './Item'
import Loading from '../Loading'
const url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=72de8895bb64376912ef844faac64a10&page='

const ItemList=()=>{
    const {setQuery,items,loading,error,fetchData}=useGlobalContext()

    useEffect(()=>{
        fetchData(url)
        setQuery('')
    },[])
    if(loading){
        return <Loading/>
    }
    if(error){
        return <div>ERROR</div>
    }
    
    return(<div className="home">
        <h3>Movies now playing...</h3>
        <div className="homeList">
        {items.results && items.results.map((x,i)=>{
            return <Item key={x.id} {...x}/>
        })}
        </div>
    </div>)
}

export default ItemList