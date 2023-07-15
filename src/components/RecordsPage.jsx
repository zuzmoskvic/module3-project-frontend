import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const RecordPage = () => {
  const [text, setText] = useState("");
  const [fetching, setFetching] = useState(true);
  const { user } = useContext(AuthContext);
 
  useEffect(() => {                               
    axios
      .get(`http://localhost:5005/auth/addRecord`)
      .then((response) => {
        setText(response.data.text);  
        console.log(response.data.text);
        setFetching(false);
      });
    
  }, [] );


      

  return (
    <div>
    {user}
    Transcription
     {fetching && <p>Loading ...</p>}
    <p>{text}</p>
  </div>
  )
};

export default RecordPage;