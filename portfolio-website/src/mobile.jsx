import { useState, useEffect } from 'react'
import "./mobile.css"

const Image = ({ filename }) => {
    //for netlify, wont work on local machine
    const imagePath = `./project_images/${filename}`;
    return <img className="project-image" src={imagePath} alt={filename} />;
  };
function ProjectSection({title, text, image, tech, link}) {

    <div className='project-container'>
        <Image filename={image}></Image>
        <div className='project-right-section'>
            <p className='project-title'>{title}</p>
            <p className='project-content'>{text}</p>

            <div className='project-content-bottom'>
                <p className='project-tech'>{tech}</p>
                <a href={link}>{"Github ->"}</a>
            </div>
        </div>
    </div>
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

    var data = {};
    const [gotData, setGotData] = useState(false);

    
    const [projects, setProjects] = useState([]);
    function updateProjects() {
        var p = [];
        console.log(`Length of data: ${Object.keys(data).length}`)
        for (let i = 0; i< data.length; i++ ) {
            
            if (filter === "all" || data[i].Tech === filter) {
                var cur = data[i];
                p.push(
                    <ProjectSection title={cur.Name} text={cur.Description} link={cur.Link} image={cur.Image} tech={cur.Tech}/>
                );
            }
        }
        console.log(`Length of projects: ${p.length}`)
        setProjects(p);
    }
    useEffect(() => {
        const getData = async () => {
         const res= await  fetch("https://portfolio-website-backend-jygb.onrender.com/values")
         const j = await res.json();

         data = j;
         setGotData(true);
        updateProjects();
        }
        getData();
      }, []);

    useEffect(
        () => {
            console.log(projects.length);
        }, [projects]
    )

    
    function updateFilter(val) {
        setFilter(val);
        updateProjects();
    }

    
    var test = [<p>Hello</p>, <p>Hi</p>];

    return(
        <div className='mobile-content'>
            <div className='mobile-navbar'>
                <p className='nav-button'>Projects</p>
                <p className='nav-name'  style={{"opacity":{nameOpacity}}}>Armaan Shah</p>
                <p className='nav-button'>Contact</p>
            </div>

            <p className='welcome-text-top'>Hi! My name is <span className='welcome-text-name'>Armaan</span>.</p>
            <p className='welcome-text'>I'm a 19 year old aspiring software developer.</p>
            <p className='welcome-text'>Since beginning my journey 5 years ago, I've worked on a number of different technologies and projects.</p>
            <p className='welcome-text'>Always looking for something new to create, you can take a look at some of what I'm doing and have done below.</p>

        <h1 className='projects-title'>Projects</h1>
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

        </div>
    );
}


export default Mobile;