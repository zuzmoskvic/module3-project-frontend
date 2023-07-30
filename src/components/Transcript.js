import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { API_URL } from "../config/config.index";
import MiniNavBar from "./MiniNavBar";
import loadingImage from "../img/loading.gif";
import { useParams } from "react-router-dom";

const Transcript = () => {
  const { recordId } = useParams();
  const gotToken = localStorage.getItem("authToken");
  const [transcript, setTranscript] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/transcribe/${recordId}`, {
        headers: { authorization: `Bearer ${gotToken}` },
      })
      .then((response) => {
        const text = response.data.transcript;
        setTranscript(text);
        setFetching(false);
      });
  }, [transcript, gotToken, recordId]);

  return (
    <Layout>
      <MiniNavBar />
      <div className="RecordPage">
        <h1>Transcript</h1>
        <div className="text-div">
          {fetching ?  <img className="loading-gif" src={loadingImage} alt="loading"/> : <p> {transcript} </p>}
        </div>
        <Link to={ `/write/${recordId}` }><button className="pink-button"> Next </button></Link>
      </div>
    </Layout>
  );
};

export default Transcript;
