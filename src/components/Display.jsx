import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

function Display() {
  const gotToken = localStorage.getItem("authToken");
  const ref = useRef(null);
  const user = useContext(AuthContext);
  const { userId } = useParams();

  const [displayedRecord, setDisplayedRecord] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/display`, {
        headers: { Authorization: `Bearer ${gotToken}` },
      })
      .then((res) => {
        setDisplayedRecord(res.data);
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
            headers: { Authorization: `Bearer ${gotToken}` },
          }
        );
        setDisplayedRecord(prevRecords =>
          prevRecords.filter(record => record._id !== recordId)
        );
        setToggle(current => !current);
      } catch (err) {
        console.log("There was an error while deleting the transcript", err);
      }
    }
  };

  const totalRecords = displayedRecord.length;

  const handleLinkClick = (index) => {
    const element = document.getElementById(totalRecords - index - 1);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <div className="display-div">
        <div className="display-main-div-1">
          {fetching ? (
            <li>Loading transcript...</li>
          ) : (
            <div className="test">
              {displayedRecord.reverse().map((entry, index) => (
                <div key={index} id={totalRecords - index - 1}>
                  <h3> Recording #{totalRecords - index} {entry.title}</h3>
                  <li>
                    <span className="bold">Transcript: </span>{entry.transcript}
                  </li>
                  {entry.writtenText.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <li>
                        <span className="bold">Written text: </span>{item.text}
                      </li>
                      <button
                        className="red-button"
                        onClick={() => handleDeleteTranscription(entry._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="display-main-div-2">
          <p className="bold">Jump to section:</p>
          {displayedRecord.map((entry, index) => (
            <button
              className="simple-links"
              onClick={() => handleLinkClick(index)}
            >
              <li>Recording #{totalRecords - index} {entry.title}</li>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Display;