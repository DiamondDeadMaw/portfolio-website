import { useState } from 'react'
import {Routes, Route, useNavigate} from "react-router-dom"
import './App.css'
import backgroundImage from './assets/images/home_background_image.jpg'
import backgroundVideo from './assets/videos/video_placeholder.mp4'
import Landing from "./Landing"



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
  function AppHome() {
    const [playVideo, setPlayVideo] = useState(false);
    const [hideContent, setHideContent] = useState(false)
  
    const handleButtonClick = () => {
      setPlayVideo(true);
      setHideContent(true);
      setTimeout(() => {setShowLanding(true);}, 5000);
    };
  
  
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
    return <Landing/>
  }
}


export default App
