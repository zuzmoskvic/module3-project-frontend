
import { useState, useEffect } from "react";
import axios from "axios";

function Transcribe() {
  const [transcription, setTranscription] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {                               
    axios
      .get("http://localhost:5005/auth/transcribe")
      .then((response) => {
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
    </div>
  )
}

export default Transcribe
