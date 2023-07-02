import { useEffect, useState } from 'react';
import {BsTwitter, BsInstagram} from 'react-icons/bs';
import {FaFacebookF, FaLinkedin } from 'react-icons/fa'
import './App.css';

function App() {
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${name}`);
      const data = await response.json();
      if (data.status === "OK") {
        setUserData(data.result);
        setError(false);
      } else {
        setError(true);
      }
    } catch(e) {
      setError(true);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    fetchData();
    setError(false);
  }
  return (
      <div className='total'>
        <div className='fixit'>
          <div>
            <h3 style={{color:'#001C30', textTransform:'uppercase'}}>ICF Visualizer</h3>
            <form className='form'>
              <input className='input' type="text" placeholder='Handle' value={name} onChange={(e) => setName(e.target.value)}/>
              <button className='btn' onClick={handleClick}>Get Info</button>
            </form>
          </div>
          {
            error
            ? (
              <div>
                <h3 style={{color:'#2C3333'}}>Invalid Handle</h3>
              </div>
            )
            :userData.length != 0
            ?  userData.map( (user) => (
              <div className='person' key={user.registrationTimeSeconds}>
                  {
                    <p
                      style={{
                        color: user.rating >= 2100 ? '#F7C04A'
                        : user.rating >= 1900 ? '#DD58D6'
                        : user.rating >= 1600 ? '#11009E'
                        : user.rating >= 1400 ? '#79E0EE'
                        : user.rating >= 1200 ? '#539165'
                        : '#27374D'
                      }}
                    ><span>Handle: </span>{user.handle}</p>
                  }
                  {(user.firstName || user.lastName) && <p><span>Name: </span>{user.firstName} {user.lastName}   </p>}
                  {user.email && <p><span>Email: </span>{user.email}</p>}
                  {user.country && <p><span>Country: </span>{user.country}</p>}
                  {user.city && <p><span>City: </span>{user.city}</p>}
                  {user.organization && <p><span>Organization: </span>{user.organization}</p>}
                  {user.rating && <p><span>Current Rating: </span>{user.rating}</p>}
                  {user.rank && <p><span>Rank: </span>{user.rank}</p>}
                  {user.maxRating&& <p><span>Max Rating: </span>{user.maxRating}</p>}
                  {user.maxRank && <p><span>Max Rank: </span>{user.maxRank}</p>}
              </div>
            ))
            : (
              <div>
                <h3 style={{color:'#2C3333'}}>Invalid Handle</h3>
              </div>
            )
          }
        
        </div>
        <div className='footer'>
          <div className='social'>
            <div>
              <a href="https://web.facebook.com/iftikharmohammedshishir/"><FaFacebookF/></a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/iftekhar-md-shishir-9292a5231/"><FaLinkedin/></a>
            </div>
            <div>
              <a href="https://www.instagram.com/iftekhar_md._shishir/"><BsInstagram/></a>
            </div>
          </div>
          <div>
            <a href="https://iftekharweb.netlify.app/" className='port'>Portfolio</a>
          </div>
          <div className='copy'>
            <p className='p-text'>@2023 IFTEKHAR</p>
            <p className='p-text'>All Rights Reserved</p>
        </div>
        </div>
      </div>
  )
}

export default App
