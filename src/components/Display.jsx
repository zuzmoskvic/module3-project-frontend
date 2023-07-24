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
    <Layout>
      <div className="display-main-div">
        <h3 className="small-h3">Transcript:</h3>
        { fetching ? <li> Loading transcript...</li> : <li> { displayedRecord.transcript } </li>}

        <h3 className="small-h3">Written text:</h3>
      {fetching ? <li>Loading written text...</li> : displayedRecord.writtenText.map((entry) => (
        <li key={entry._id}>{entry.text}</li>
      ))}
      </div>
    </Layout>
  )
}

export default Display