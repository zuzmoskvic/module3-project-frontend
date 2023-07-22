
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";

function Transcribe() {
  const [transcription, setTranscription] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {                               
    axios
      .get(`${API_URL}/auth/transcribe`)
      .then((response) => {
        console.log(response.data);
        const { text } = response.data;
        setTranscription(text);  
        setFetching(false);
      });
    
  }, [] );

  return (
    <Layout>
    <div>
      Transcription
       {fetching && <p>Loading ...</p>}
      <p>{transcription}</p>

      <Link to="/write"> <button> Write me something </button></Link> 
    </div>
    </Layout>
  )
}

export default Transcribe
