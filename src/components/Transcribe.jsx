
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Transcribe() {
  const [transcription, setTranscription] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {                               
    axios
      .get("http://localhost:5005/auth/transcribe")
      .then((response) => {
        console.log(response.data);
        const { text } = response.data;
        setTranscription(text);  
        setFetching(false);
      });
    
  }, [] );

  //  useEffect(() => {     
  //     console.log('Change useEffect 2:', transcription);
  //  },[transcription]);

  return (
    <div>
      Transcription
       {fetching && <p>Loading ...</p>}
      <p>{transcription}</p>

      <Link to="/write"> <button> Write me something </button></Link> 
    </div>
  )
}

export default Transcribe
