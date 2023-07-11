import { useEffect, useState } from 'react';
import axios from 'axios';

const RecordPage = () => {
  const [text, setText] = useState("");
  const [fetching, setFetching] = useState(true);


  // useEffect(() => {                               
  //   axios
  //     .post("http://localhost:5005/auth/addRecord")
  //     .then((response) => {
  //       setText(response.data.text);  
  //       setFetching(false);
  //     });
    
  // }, [] );

  return (
    <div>
    Transcription
     {fetching && <p>Loading ...</p>}
    <p>{text}</p>
  </div>
  )
};

export default RecordPage;