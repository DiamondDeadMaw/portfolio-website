import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import "./Landing.css"

//Components
import Projects from "./Projects"

//Images
import desktop from "./assets/images/desktop.png"
import projects from "./assets/images/projects_icon.png"
import text from "./assets/images/text_icon.png"
import pdf from "./assets/images/pdf_icon.png"


//Other files
import resume from "./assets/other/resume.pdf"



export default function Landing() {

    const possibleIcons = ["Projects", "About", "Contact", "Resumé"]

const [showProjects, setShowProjects] = useState(false)

function openProjects() {
    setShowProjects(!showProjects)
}

function openAbout() {
    return null   
}

function openContact() {
    return null
}

function openResume() {
    console.log("Clicked")
    window.open(resume, "_blank")
}

const functionsToCall = [openProjects, openAbout, openContact, openResume]

function AppIcon(props) {
    return <div className='desktop-icon' onClick={() => {functionsToCall[possibleIcons.indexOf(props.name)]()}}>
        <img className='icon_image' src={props.src}/>
        <p className='icon_text'>{props.name}</p>
    </div>
}


    return (
        <div className="container">
            <div className='desktop-container'>
            
            <img className='desktop-image' src={desktop}  />
            
            <div className='icons-container'>
                <AppIcon src={projects} name="Projects"/>
                <AppIcon src={text} name="About" />
                <AppIcon src={text} name="Contact" />
                <AppIcon src={pdf} name="Resumé" />
            </div>


            {showProjects && <Projects/>}

            </div>
        </div>
    )
}