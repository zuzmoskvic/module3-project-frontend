import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { API_URL } from "../config/config.index";
import MiniNavBar from "./MiniNavBar";
import loadingImage from "../img/loading.gif";

const RecordPage = () => {
  const gotToken = localStorage.getItem("authToken");
  const [transcription, setTranscription] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/transcription`, {
        headers: { authorization: `Bearer ${gotToken}` },
      })
      .then((response) => {
        const text = response.data.transcript;
        setTranscription(text);
        setFetching(false);
      });
  }, [transcription, gotToken]);

  return (
    <Layout>
      <MiniNavBar />
      <div className="RecordPage">
        <h1>Transcription</h1>
        <div className="text-div">
          {fetching ?  <img className="loading-gif" src={loadingImage} alt="loading"/> : <p> {transcription} </p>}
        </div>
        <Link to="/write"><button className="pink-button"> Next </button></Link>
      </div>
    </Layout>
  );
};

export default RecordPage;
