import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import "./Projects.css"
import { useState } from 'react'


//Images
import browser from "./assets/images/browser_background.png"
import unhovered from "./assets/images/cross_unhovered.png"
import hovered from "./assets/images/cross_hovered.png"
import info from "./assets/images/info_icon.png"
import link from "./assets/images/link_icon.png"




function InfoPage(p) {
    return (
        <div className="info-page">
            <p className='info-text'>{p.desc}</p>
        </div>
    )
}

// to add a new project, you need to add entries to the excel, update the json, and add images into the public folder
function CardInfo(p) {
    const [showMoreInfo, setShowMoreInfo] = useState(false)
    return (
        <div className='card-info-container'>
           <img src={info} className='info-icon' onClick={() => setShowMoreInfo(true)}/>
           <a href={p.link} className='link-icon' target='_blank' rel="noopener noreferrer">
           <img src={link} className='link-icon' />
           </a>
            {showMoreInfo && <InfoPage desc = {p.desc}/>}
        </div>
    )
}

//had to move images to public as they could not be found in source
const Image = ({ filename }) => {
    const imagePath = "https://armaanshah.netlify.app/public" + `/project_images/${filename}`;
    return <img className="card-image" src={imagePath} alt={filename} />;
  };
  


function Card(props) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className='card-container' onMouseOver={()=>{setIsHovered(true)}}  onMouseOut={ ()=> {setIsHovered(false)} }>
            <Image filename={props.Image}/>
            {isHovered && <CardInfo link={props.Link} desc={props.Description}/>}
            <p className='card-text'>{props.Name}</p>
        </div>
    )
}


function MainContent({project_data}) {
    
    const cards = []
    for (let i = 0; i< project_data.length; i++) {
        cards.push(<Card 
            Name={project_data[i].Name}
            Description={project_data[i].Description}
            Link={project_data[i].Link}
            Image={project_data[i].Image}
        />)
    }
    return (
        <div className='main-content-container'>
           {cards}
        </div>
    )
}

function Cross({close}) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <img className="cross-image"src={isHovered? hovered:unhovered} onMouseOver={()=>{setIsHovered(true)}}  onMouseOut={ ()=> {setIsHovered(false)} } onClick={close} />
    )
}

export default function Projects({onClickCross, project_data}) {
    
    return (
        <div className='window'>
            
            <img src={browser} className='browser-background'/>
            <Cross  close= {onClickCross}/>
            <a href='https://github.com/DiamondDeadMaw' className='link-text' rel="noopener noreferrer" target="_blank">https://github.com/DiamondDeadMaw</a>
            <MainContent project_data={project_data} />

        </div>
    )
}