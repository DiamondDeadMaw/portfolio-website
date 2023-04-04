import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inner from './inner.jsx'
import backgroundImage from './assets/images/home_background_image_highres.jpg'
import backgroundVideo from './assets/videos/video_placeholder.mp4'


function HomePageBackground(props) {
  if (props.toPlay) {
    return (
      <video src={backgroundVideo} className="background-video" autoPlay ></video>
    )
  } else {
    return (<img src= {backgroundImage} className="background-image"></img>)
  }
}



function App() {
  const [showInner, setShowInner] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [hideContent, setHideContent] = useState(false)

  const handleButtonClick = () => {
    setPlayVideo(true);
    setHideContent(true);
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
        <HomePageBackground toPlay= {playVideo}/>
      <h1 className='WelcomeText'>Welcome</h1>
      <h1 className='WorldOfText'> to the world of</h1>
      <h1 className='ArmaanText'>Armaan</h1>
      <button className="enter-button" onClick={handleButtonClick}>Enter &gt;&gt;</button>
    </div>
    )
  }
}

export default App
