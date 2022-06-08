import React, { useState, useContext, useReducer, useEffect } from 'react'
import {reducer} from './reducer'

const AppContext = React.createContext()
const initialState={
  'favorites':[],
  'watchlist':[]
}
const AppProvider = ({ children }) => {
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const [query,setQuery]=useState('')
  const [dropCheck,setDropCheck]=useState(false)


const [movies,dispatch]=useReducer(reducer,[],()=>{
  const localData=localStorage.getItem('movies')
  return localData.length>0?JSON.parse(localData):initialState
})


const toggleFavorites=(id,title,img,media,which)=>{
  dispatch({type:'TOGGLE_FAVORITE',movie:{
    id,title,img,media
  },which:which})
}

const removeFavorites=(id,which)=>{
  dispatch({type:'REMOVE_FAVOIRTE',id:id,which:which})
}
useEffect(()=>{
localStorage.setItem('movies', JSON.stringify(movies))
},[movies])

  const fetchData=async(url)=>{
    setLoading(true)
    try{
    const response=await fetch(url)
    const data=await response.json()
    if(data.results || data){    
    setItems(data)
    setLoading(false)}
    else{
      setError(true)
    }
  }catch(err){
    return console.log(err);
  }
  }
  
  


  return <AppContext.Provider value={{removeFavorites,...movies,toggleFavorites,query,setQuery,error,loading,fetchData,setDropCheck,dropCheck,items}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
