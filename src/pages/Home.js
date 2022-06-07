import React from "react";
import ItemList from '../components/ItemList'
import SearchForm from '../components/SearchForm'
import { useGlobalContext } from "../context";

const Home=()=>{
    const {setSearchTrue}=useGlobalContext()
    return (
    <div className="cont-Home">
        <SearchForm/>
        <ItemList/>
    </div>
    )
}

export default Home