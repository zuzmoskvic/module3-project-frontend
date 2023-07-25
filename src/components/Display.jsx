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
        console.log(res.data);
        console.log("record zero", res.data[0].writtenText[0].text);
        setFetching(false);
      })
      .catch((error) => console.log(error));
  }, [toggle]);

  // const handleDeleteTranscription = async (transcriptId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete your transcription?"
  //   );
  //   if (confirmDelete && gotToken) {
  //     try {
  //       await axios.post(
  //         `${API_URL}/auth/display`,
  //         { transcriptId },
  //         {
  //           headers: { authorization: `Bearer ${gotToken}` },
  //         }
  //       );
  //       setDisplayedRecord(prevRecords => prevRecords.filter(record => record !== transcriptId));
  //       setToggle(((current) => !current))
  //     } catch (err) {
  //       console.log("There was an error while deleting the transcript", err);
  //     }
  //   }
  // };

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
              <p>This is a transcript: {entry.transcript} </p>  
                {entry.writtenText.map((item, itemIndex) => (
                  <div key={itemIndex}>
                  <p>This is a written text:  {item.text} </p>
                    <button
                      className="red-button"
                      // onClick={() => handleDeleteTranscription(item)}
                    >
                      Delete Transcription
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
  
                }
export default Display;