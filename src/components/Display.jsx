import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

function Display() {
  const gotToken = localStorage.getItem("authToken");
  // const [displayedText, setDisplayedText] = useState("");
  const [displayedRecord, setDisplayedRecord] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {     
    axios.get('http://localhost:5005/auth/display',
    {
      headers: { authorization: `Bearer ${gotToken}` },
    })
    .then((res) => {
      // setDisplayedText(res.data);
      setDisplayedRecord(res.data);
      setFetching(false);
    })
    .catch((error) => console.log(error));
  }, [] );

  return (
    // <Layout>
    <div>
       <p>View all saved records</p>
       <p>Transcript</p>
       { fetching ? <p>Loading ...</p> : <p> { displayedRecord.transcript } </p>}

       <p>Written text:</p>
          {displayedRecord.writtenText.map((entry) => (
            <p key={entry._id}>{entry.text}</p>))}
    </div>
    // </Layout>
  )
}

export default Display