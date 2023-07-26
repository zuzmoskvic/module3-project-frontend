import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Layout from './Layout';
import axios from "axios";
import { API_URL } from "../config/config.index";

const RecordPage = () => {
  const gotToken = localStorage.getItem("authToken");
  const [transcription, setTranscription] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {                               
    axios
        .get(`${API_URL}/auth/transcription`,
        {
            headers: { authorization: `Bearer ${gotToken}` }
          })
        .then((response) => {
            const text = response.data.transcript;
            setTranscription(text);  
            setFetching(false);
        });
    
    }, [transcription] );
 
  return (
    <Layout>
      <div>
        <p> This is the transcription:  </p>
        
        {fetching ? <p>Loading ...</p> : <p> { transcription } </p>}
        <Link to="/write"> <button className="pink-button"> Write me something </button></Link> 
      </div>
  </Layout>
  )
};

export default RecordPage;