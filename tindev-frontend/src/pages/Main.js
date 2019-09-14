import React,{ useEffect, useState } from 'react';
import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import api from '../services/api';

export default function Login({ match }){
  
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    async function loadUse(){
       const response = await api.get('/devs/',{
         headers: {user:match.params.id}
       })
       setUsers(response.data);
    }

    loadUse();
  },[match.params.id]);

  async function handleLike(id){
    await api.post(`/devs/${id}/likes`,null,{
      headers:{user:match.params.id}
    });

    setUsers(users.filter(user=> user._id !== id));
  }

  async function handleDislike(id){
    await api.post(`/devs/${id}/dislikes`,null,{
      headers:{user:match.params.id}
    });
    setUsers(users.filter(user=> user._id !== id));
  }
  return (
    <div className="main-container">
       <img src={logo} alt="tindev"/>
         { users.length > 0 ? (
           <ul>
              {users.map(user => (
                  <li key={user._id}>
                  <img src={user.avatar} alt={user.name} />
                  <footer>
                    <strong>{user.name}</strong>
                    <p>{user.bio}</p>
                  </footer>
                  <div className="buttons">
                    <button type="button">
                      <img  src={like} alt="like" onClick={() => handleLike(user._id)} />
                    </button>
                    <button type="button">
                      <img  src={dislike} alt="dislike" onClick={() => handleDislike(user._id)} />
                    </button>
                  </div>
                </li>
              ))}
           </ul>
         ) : (
           <div className="empty">Acabou :(</div>
         ) }
    </div>
  );
}