import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

function Display() {
  const gotToken = localStorage.getItem("authToken");
  const [displayedText, setDisplayedText] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {     
    axios.get('http://localhost:5005/auth/display',
    {
      headers: { authorization: `Bearer ${gotToken}` },
    })
    .then((res) => {
      setDisplayedText(res.data);
      setFetching(false);
    })

    .catch((error) => console.log(error));

  }, [] );

  return (
    <Layout>
    <div>
       View all saved records:

      *** Last record
       Transcript:
       { fetching ? <p>Loading ...</p> : <p> { displayedText } </p>}
    </div>
    </Layout>
  )
}

export default Display