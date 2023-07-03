import { useState, useEffect,useRef  } from 'react'
import "./mobile.css"


const Image = ({ filename }) => {
    //for netlify, wont work on local machine
    const imagePath = `./project_images/${filename}`;
    return <img className="project-image" src={imagePath} alt={filename} />;
  };

function ProjectSection({title, text, image, tech, link}) {
        
    const [isVisible, setVisible] = useState(true);
    const domRef = useRef();
    document.addEventListener("DOMContentLoaded", function(){

        useEffect(() => {
          const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
          });
          observer.observe(domRef.current);
          return () => observer.unobserve(domRef.current);
        }, []);
      
      
      });
    


    const imagePath = `./project_images/${image}`;
    return (
        <div className={`project-container ${isVisible ? "visible" : ""}`} ref={domRef}>
        <Image filename={image}></Image>
        <div className='project-overlay'>
            <p className='project-title'>{title}</p>
            <p className='project-content'>{text}</p>
            <div className='project-bottom'>
                <p className='project-tech'>{tech}</p>
                <a href={link} className='project-link'>Github</a>
            </div>
        </div>
    </div>
    );
}


function ProjectFilterButton({update, filter, text, selected}) {
    selected = (selected === filter)
    return (
        <button className={selected ? "filter-button-selected" : "filter-button"} onClick={() => {update(filter)}}>{text}</button>
      );
}



function Mobile() {

    const [showName, setShowName] = useState(false);
    const [nameOpacity, setNameOpacity] = useState(0);
    const [filter, setFilter] = useState("all");

    var data = useRef({});
    const [gotData, setGotData] = useState(false);

    
    const [projects, setProjects] = useState([]);
    function updateProjects() {
        var p = [];
        for (let i = 0; i< data.current.length; i++ ) {
            if (filter === "all" || data.current[i].Tech === filter) {
                var cur = data.current[i];
                p.push(
                    <ProjectSection title={cur.Name} text={cur.Description} link={cur.Link} image={cur.Image} tech={cur.Tech}/>
                   
                )
                setProjects([]);
                setProjects(p);
            }
        }
        
    }
    useEffect(() => {
        const getData = async () => {
         const res= await  fetch("https://portfolio-website-backend-jygb.onrender.com/values")
         const j = await res.json();

         data.current = j;
         setGotData(true);
        updateProjects();
        }
        getData();
      }, []);

    useEffect(
        () => {
            console.log(`useeffect: ${(projects[0])} s`);
        }, [projects]
    )

    
    function updateFilter(val) {
        setFilter(val);
        var p = [];
        for (let i = 0; i< data.current.length; i++) {
            var cur = data.current[i];
            if (val === "all" || cur.Tech === val) {
                p.push(<ProjectSection title={cur.Name} text={cur.Description} link={cur.Link} image={cur.Image} tech={cur.Tech}/>);
            }
        }
        setProjects([]);
        setProjects(p);
    }

    function changeOpacity() {
        setShowName(true);
    }

    const name = document.getElementById("name");
    if (!showName) {
        window.addEventListener('scroll', () => {
       
            const rect = name.getBoundingClientRect();
            const distanceFromTop = rect.top - window.scrollY;
            if (distanceFromTop < 90) {
              changeOpacity();
            }
          }, true);
    } else {
        window.removeEventListener(scroll, () => {
       
            const rect = name.getBoundingClientRect();
            const distanceFromTop = rect.top - window.scrollY;
            if (distanceFromTop < 90) {
              changeOpacity();
            }
          }, true )
    }
 

      const projectRef = useRef(null);

      const handleProjectScroll= () => {
        projectRef.current?.scrollIntoView({behaviour:"smooth"});
      };

      const contactRef = useRef(null);

      const handleContactScroll= () => {
        console.log("clicked");
        contactRef.current?.scrollIntoView({behaviour:"smooth"});
      };
      
      const topRef = useRef(null);

      const handleHomeScroll = () => {
        topRef.current?.scrollIntoView({behaviour:"smooth"});
      };

    return(
        <div className='mobile-content'>
            <div className='mobile-navbar'>
                <p className='nav-button' onClick={() => handleProjectScroll()}>Projects</p>
                <p className={`nav-name ${showName && "fade-in"}`}  style={{"opacity":{nameOpacity}}} onClick={() => handleHomeScroll()}>Armaan Shah</p>
                <p className='nav-button'  onClick={handleContactScroll}>Contact</p>
            </div>

            <p className='welcome-text-top' ref={topRef}>Hi! My name is <span id="name" className='welcome-text-name '>Armaan</span>.</p>
            <p className='welcome-text'>I'm a 19 year old aspiring software developer.</p>
            <p className='welcome-text'>Since beginning my journey 5 years ago, I've worked on a number of different technologies and projects.</p>
            <p className='welcome-text'>Always looking for something new to create, you can take a look at some of what I'm doing and have done below.</p>

        <h1 className='projects-title' ref={projectRef}>Projects</h1>
        <div className='filter-container'>
        <ProjectFilterButton update={updateFilter} filter={"all"} text={"Show All"} selected={filter}></ProjectFilterButton> 
        <ProjectFilterButton update={updateFilter} filter={"python"} text={"Python"} selected={filter}></ProjectFilterButton>
        <ProjectFilterButton update={updateFilter} filter={"javascript"} text={"JavaScript"} selected={filter}></ProjectFilterButton>
        <ProjectFilterButton update={updateFilter} filter={"c#"} text={"C#"} selected={filter}></ProjectFilterButton>
        <ProjectFilterButton update={updateFilter} filter={"dart"} text={"Dart"} selected={filter}></ProjectFilterButton>
        </div>

        {!gotData ? <h2>Loading</h2> : <div className='projects-container'>
            
            {projects}
            </div>}
        <h1 className='projects-title' ref={contactRef}>Contact</h1>
        <p className='welcome-text'>Want to chat? You can contact me at any of the below:</p>
        <a href='https://www.linkedin.com/in/armaanshah3103/'>LinkedIn</a>
        <p className='email'>Email: armaan.shah2004@gmail.com</p>
        </div>
    );
}


export default Mobile;