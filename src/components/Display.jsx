import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import MiniNavBar from "./MiniNavBar";

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
        // console.log(res.data);
        // console.log("record zero", res.data[0].writtenText[0].text);
        setFetching(false);
      })
      .catch((error) => console.log(error));
  }, [toggle]);

  const handleDeleteTranscription = async (recordId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your transcription?"
    );
    if (confirmDelete && gotToken) {
      try {
        await axios.post(
          `${API_URL}/auth/display`,
          { recordId },
          {
            headers: { authorization: `Bearer ${gotToken}` },
          }
        );
        setDisplayedRecord(prevRecords => prevRecords.filter(record => record.recordId !== recordId));
        setToggle(((current) => !current))
      } catch (err) {
        console.log("There was an error while deleting the transcript", err);
      }
    }
  };

  const handleDeleteWrittenText = async (writtenTextId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your transcription?"
    );
    if (confirmDelete && gotToken) {
      try {
        await axios.post(
          `${API_URL}/auth/deletetext`,
          { writtenTextId },
          {
            headers: { authorization: `Bearer ${gotToken}` },
          }
        );
        setDisplayedRecord(prevRecords => prevRecords.filter(record => record !== writtenTextId));
        setToggle(((current) => !current))
      } catch (err) {
        console.log("There was an error while deleting the transcript", err);
      }
    }
  };

  return (
    <Layout>
    <MiniNavBar/>
      <div className="display-main-div">
        <h3 className="small-h3">Transcript:</h3>
        {fetching ? (
          <li>Loading transcript...</li>
        ) : (
          <div>
            {displayedRecord.map((entry, index) => (
              <div key={index}>
              <p>This is a transcript: {entry.transcript} </p> 

              {/* transcript delete */}
              {console.log("entry._id", entry._id)}
              <button className="red-button" onClick={() => handleDeleteTranscription(entry._id)}> Delete Transcription </button> 
                {entry.writtenText.map((item, itemIndex) => (
                  <div key={itemIndex}>
                  <p>This is a written text:  {item.text} </p>
                  {console.log("item id", item._id)}

                {/* writtenText delete */}
                    <button className="red-button" onClick={() => handleDeleteWrittenText(item._id)}> Delete written text </button>
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