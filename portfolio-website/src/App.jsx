import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from "react-router-dom"
import './App.css'
import backgroundImage from './assets/images/home_background_image.jpg'
import backgroundVideo from './assets/videos/background_video.mp4'
import Landing from "./Landing"
import Mobile from "./mobile.jsx"


function HomePageBackground(props) {
  if (props.toPlay) {
    return (
      <video src={backgroundVideo} className="background-video" autoPlay></video>
    )
  } else {
    return (<img src= {backgroundImage} className="background-image"></img>)
  }
}


function App() {
  const [showLanding, setShowLanding] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
    const [hideContent, setHideContent] = useState(false)

    const [matches, setMatches] = useState(window.matchMedia("(min-width: 700px)").matches);

    useEffect(() => {
      window.matchMedia("(min-width: 700px)").addEventListener("change", e=> setMatches(e.matches)); 
    }, []);
  
    const handleButtonClick = () => {
      setPlayVideo(true);
      setHideContent(true);
      setTimeout(() => {setShowLanding(true);}, 7500);
    };

    const returnToPage = () => {
      setPlayVideo(false);
      setHideContent(false);
      setShowLanding(false);
    }

    if (!matches) {
      return (
        <Mobile/>
      );
    }
  function AppHome() {
    
    
  
    if (hideContent) {
      return (
        <div className='AppHome'>
          <HomePageBackground toPlay= {playVideo}/>
        </div>
      )
    } else {
      return (
        <div className="AppHome">
            <HomePageBackground toPlay={playVideo} />
        <video src={backgroundVideo} style={{display:'none'}}></video>
        <h1 className='WelcomeText'>Welcome</h1>
        <h1 className='WorldOfText'> to the world of</h1>
        <h1 className='ArmaanText'>Armaan</h1>
        <button className="enter-button" onClick={handleButtonClick}>Enter &gt;&gt;</button>
      </div>
      )
    }
  }

  if (!showLanding) {
    return <AppHome/>
  } else {
    return <Landing onPowerClicked={() => {returnToPage()}}/>
  }
}


export default App
