import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";

function Display() {
  const gotToken = localStorage.getItem("authToken");
  const user = useContext(AuthContext);
  const { userId } = useParams();

  const [displayedRecord, setDisplayedRecord] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [toggle, setToggle] = useState(false)

  // const handleToggle = () => {
  //   setToggle((current) => !current);
  // };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5005/auth/display", {
        headers: { authorization: ` Bearer ${gotToken} `},
      })
      .then((res) => {
        setDisplayedRecord(res.data);
        setFetching(false);
      })
      .catch((error) => console.log(error));
  }, [toggle]);

  const handleDeleteTranscription = async (transcriptId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your transcription?"
    );
    if (confirmDelete && gotToken) {
      try {
        await axios.post(
          `${API_URL}/auth/display`,
          { transcriptId },
          {
            headers: { authorization: `Bearer ${gotToken}` },
          }
        );
        setDisplayedRecord(prevRecords => prevRecords.filter(record => record !== transcriptId));
        setToggle(((current) => !current))
      } catch (err) {
        console.log("There was an error while deleting the transcript", err);
      }
    }
  };

  return (
    <Layout>
      <div className="display-main-div">
        <h3 className="small-h3">Transcript:</h3>
        {fetching ? (
          <li>Loading transcript...</li>
        ) : (
          <div>
            {displayedRecord.map((entry, index) => (
              <div key={index}>
                {entry}
                <button
                  className="red-button"
                  onClick={() => handleDeleteTranscription(entry)}
                >
                  Delete Transcription
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Display;