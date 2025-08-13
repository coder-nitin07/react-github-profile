import { useEffect, useState } from "react";
import '../css/Body.css';

const Body = () => {
  const [ profile, setProfile ] = useState([]);
  const [ numberOfProfile, setNumberOfProfile ] = useState('');
  
  async function profileGenerator( count ){
    const ran = Math.floor(1+Math.random() * 10000);
    const response = await fetch(`https://api.github.com/users?since=${ran}&per_page=${count}`);
    const data = await response.json();

    setProfile(data); 
  }

  useEffect(()=>{
        profileGenerator(5);
  }, []);
  
  return (
    <div className="container">

        <div className="search">
            <input type='number' placeholder="Search Here" min='1' max='50' value={ numberOfProfile } onChange={(e)=> setNumberOfProfile(e.target.value) } />

            <button onClick={()=> profileGenerator(Number(numberOfProfile)) }>Search</button>
        </div>

        <div className="cards">
            { profile.map((item, index)=>(
                <div className="profile_card" key={ index }>
                    <img src={ item.avatar_url } />
                    <h2>{ item.login }</h2>
                    <a href={ item.html_url }>View Github Profile</a>
                </div>
            )) }
        </div>
    </div>
  )
}

export default Body;