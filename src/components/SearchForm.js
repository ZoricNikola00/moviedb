import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context';

const SearchForm = () => {
 const navigate=useNavigate()
 const submit=(e)=>{
    e.preventDefault()
    navigate(`search/${query}`)
  }
    const {query,setQuery}=useGlobalContext()
  return (
    <div className='searchCont'>
           <div className='head-text'><h1>Welcome to Movie DB</h1></div>
           <div className='imgCont'></div>
           <form onSubmit={submit} className='fromSrch'>
               <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Type Movie/TV-Show Here'></input>
               <button type='submit' className='srcBtn'><FaSearch/></button>
           </form>
       </div>
  )
}

export default SearchForm




