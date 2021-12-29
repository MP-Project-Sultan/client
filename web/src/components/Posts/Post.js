import React,{ useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'

import axios from 'axios';

export default function Post() {
    const [comments, setComments] = useState([])
     const state = useSelector(state => {
       return {
         Login: state.Login,
         postRD: state.PostRD,
       };
     });
  const {id} = useParams();
  console.log(id);
  useEffect(() => {
    result();
  }, []);
  const result = async () => {
    await axios
      .get(`http://localhost:5000/getComments/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setComments(result.data);
     
      });
  };
  return (
        <>
                    {comments.length &&  <h1>{comments[0].postId.description}</h1>}
                    <hr />
      {comments.map((item,index)=>{
          return   <div key={item._id}>

        <h1>{item.userId.username}</h1>
        <p>{item.description}</p>
    </div>
      })}
      <button onClick></button>
  </>
);
}
