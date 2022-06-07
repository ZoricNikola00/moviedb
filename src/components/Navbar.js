import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import sublinks from "../data";
import ItemList from "./ItemList";
import Submenu from "./Submenu";
const Navbar=()=>{

    const{dropCheck,searchTrue}=useGlobalContext()

  const submEl=sublinks.map((x,i)=>{
        if(!x.links){return <li  className="nav-btn" key={i}><Link to={x.link}><button >{x.page}</button></Link></li>}
        return <Submenu key={i} name={x.page} links={x.links}/>
        })
return (
<nav className={dropCheck?'nav check':'nav '}>
    <div className="navbar">
        <Link className="logo" to='/'><h1>Movie DB</h1></Link>
        <ul className="links">
            {submEl}
        </ul>
        {searchTrue && <form>
            <input/>
        </form>}
    </div>
</nav>
)
}

export default Navbar
