import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";
import MiniNavBar from "./MiniNavBar";
import { Link } from "react-router-dom";

function WritenTextPage() {
  const gotToken = localStorage.getItem("authToken");
  const [writtenText, setWrittenText] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/write`, {
        headers: { authorization: `Bearer ${gotToken}` },
      })
      .then((response) => {
        const { text } = response.data;
        setWrittenText(text);
        setFetching(false);
      });
  }, [gotToken]);

  return (
    <Layout>
      <MiniNavBar />
      <div className="WrittenTextPage"> 
        <h1>Written text</h1>
        <div className="text-div">
         {fetching ? <p>Loading ...</p> : <p>{writtenText}</p>}
        </div>

        <Link to="/display"><button className="pink-button"> See all texts </button></Link>
      </div>
    </Layout>
  );
}

export default WritenTextPage;
