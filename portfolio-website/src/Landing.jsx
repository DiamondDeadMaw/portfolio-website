import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import "./Landing.css"

//Components
import Projects from "./Projects"
import TextFile from './TextFile'

//Images
import desktop from "./assets/images/desktop.png"
import projects from "./assets/images/projects_icon.png"
import text from "./assets/images/text_icon.png"
import pdf from "./assets/images/pdf_icon.png"
import power from "./assets/images/power_button.png"

//Other files
import resume from "./assets/other/resume.pdf"


export default function Landing({onPowerClicked}) {

    const possibleIcons = ["Projects", "About", "Contact", "Resumé"]

const [showProjects, setShowProjects] = useState(false)
const [showAbout, setShowAbout] = useState(false)
const [showContact, setShowContact] = useState(false)

const [taskbarIcons, setTaskbarIcons] = useState([
    <div className='taskbar-icon-container'>
        <img className='taskbar-icon' src={power} onClick={onPowerClicked} />
    </div>
])

function TaskbarIcon({s}) {
    return (
        <div className="taskber-icon-container">
            <img className='taskbar-icon' src={s}/>
        </div>
    )
}
function openProjects() {
    setShowProjects(!showProjects)
    setTaskbarIcons(old => [...old, <TaskbarIcon s={projects}/>])
    console.log(taskbarIcons[0])
}

function openAbout() {
    setShowAbout(!showAbout)   
    setTaskbarIcons(old => [...old, <TaskbarIcon s={text}/>])

}

function openContact() {
    setShowContact(!showContact)
    setTaskbarIcons(old => [...old, <TaskbarIcon s={text}/>])
}

function openResume() {
    console.log("Clicked")
    window.open(resume, "_blank")
}


function closeProjects() {
    setShowProjects(false)
    setTaskbarIcons(taskbarIcons.slice(0,-1))
}
function closeAbout() {
    setShowAbout(false)
    setTaskbarIcons(taskbarIcons.slice(0,-1))
}
function closeContact() {
    setShowContact(false)
    setTaskbarIcons(taskbarIcons.slice(0,-1))
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


            {showProjects && <Projects onClickCross= { () => {closeProjects()}}/>}
            {showAbout && <TextFile onClickCross={ () => {closeAbout()} } title="About.txt" content={<AboutContent/>}/>}
            {showContact && <TextFile onClickCross={() => {closeContact()}} title="Contact.txt" content={<ContactContent/>}/>}

            <div className="taskbar">
            {taskbarIcons}
            </div>
            </div>
        </div>
    )
}

function AboutContent() {
    return (
        <div className="content">
            <p className='content-text'>I am an 18 year old living in India, aspiring to one day be
         at the forefront of developement in my chosen field of study.</p>
         <p className='content-text'> I'm not quite sure what that will be just yet though, as my curiosity
         is sometimes detrimental, leading me to pursue many things at the same time.</p>
         <p className='content-text'>In fact, this website was created in 2 days after I learned React in order to
         create a website for a college competition. Till now, the hardest part of this was centering all my divs.</p>
         <p className='content-text'> My biggest interests include compiler design, the creation of hardware for machine learning,
         and game developement.</p>
        </div>
    )
}

function ContactContent() {
    return (
        <div className="content">
            <p className='content-text'>Github:</p>
            <a href="https://github.com/diamonddeadmaw" target="_blank" className='content-link'>github.com/diamonddeadmaw</a>
            <p className='content-text'>LinkedIn:</p>
            <a href="https://linkedin.com/in/armaanshah3103/" target="_blank" className='content-link'>linkedin.com/in/armaanshah3103/</a>
        </div>
    )
}