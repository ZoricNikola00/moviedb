import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Submenu=({links,name})=>{
    const{setDropCheck,dropCheck}=useGlobalContext()
    const [drop,setDrop]=useState(false)
    const dropOver=()=>{
        if(window.innerWidth>960){setDrop(true); setDropCheck(true)}
    }
    const pullOver=()=>{
        if(window.innerWidth>960){setDrop(false); setDropCheck(false)}
    }
return(<>
    <li onMouseOver={dropOver} onMouseLeave={pullOver} className="nav-btn"><button onClick={()=>setDrop(p=>!p)}>{name}{' '}</button>
    <ul className={drop?'drop show':'drop'}>
    {links.map((x,i)=><li key={i}><Link to={x.url}>{x.label}</Link></li>)}
</ul>
    </li>

</>)
}

export default Submenu