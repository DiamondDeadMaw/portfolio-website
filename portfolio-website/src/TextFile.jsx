import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import "./TextFile.css"

import background from "./assets/images/textfile_background.png"
import unhovered from "./assets/images/cross_unhovered.png"
import hovered from "./assets/images/cross_hovered.png"


function Cross({close}) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <img className="cross-image"src={isHovered? hovered:unhovered} onMouseOver={()=>{setIsHovered(true)}}  onMouseOut={ ()=> {setIsHovered(false)} } onClick={close} />
    )
}

//takes in a string for showing title, then html for content, and a function to close the window
export default function TextFile({title, content, onClickCross}) {
    return (
        <div className='window'>
            <Cross close={onClickCross} />
            <div className='header'>
                <h3 className='title-text'>{title}</h3>
            </div>  

            {content}
        </div>
    )
}