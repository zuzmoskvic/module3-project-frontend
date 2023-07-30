import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import sadUrl from "../img/sad.jpeg";
import { Link } from "react-router-dom";

function Display() {
  const gotToken = localStorage.getItem("authToken");
  const [displayedRecord, setDisplayedRecord] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [toggle, setToggle] = useState(false);

  // Fetch record information to display
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
  }, [toggle, gotToken]);

  // Handle delete button
  const handleDeleteTranscript = async (recordId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your transcript?"
    );
    if (confirmDelete && gotToken) {
      try {
        await axios.delete(`${API_URL}/auth//edit/${recordId}`,
          {
            headers: { Authorization: `Bearer ${gotToken}` },
          }
        );
        setDisplayedRecord((prevRecords) =>
          prevRecords.filter((record) => record._id !== recordId)
        );
        setToggle((current) => !current);
      } catch (err) {
        console.log("There was an error while deleting the transcript", err);
      }
    }
  };

  // Set up of clickable navigation
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
        {totalRecords === 0 ? (
          <div className="sad-image-div">
            <img className="sad-url" src={sadUrl} alt="sad" />
            <p className="bold">Nothing to see here yet. 😔 </p>
            <Link to="/profile">
              <button className="pink-button"> Record something</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="display-main-div-1">
              {fetching ? (
                <li>Loading transcript...</li>
              ) : (
                <div>
                  {/* Create a div table per each record */}
                  {displayedRecord.reverse().map((entry, index) => (
                    <div key={index} id={totalRecords - index - 1}>
                      {/* Title */}
                      <h3>
                        Recording #{totalRecords - index} {entry.title}
                      </h3>
                      {/* Transcript */}
                      <li>
                        <span className="bold">Transcript: </span>
                        {/* Split the transcript into paragraphs */}
                        {entry.transcript.split('\n\n').map((paragraph, paraIndex) => (
                          <p key={paraIndex}>{paragraph}</p>
                        ))}
                      </li>
                      {/* Written text */}
                      {entry.writtenText.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <div>
                          <li><span className="bold">Written text: </span></li>
                            {/* Split the written text into paragraphs */}
                            {item.text.split('\n\n').map((paragraph, paraIndex) => (
                              <p key={paraIndex}>{paragraph}</p>
                            ))}
                          </div>
                          {/* Delete button */}
                          <button className="red-button" onClick={() => handleDeleteTranscript(entry._id)}>Delete</button>
                          {/* Edit button */}
                          <Link to={`/edit/${entry._id}`}><button className="blue-button">Edit</button></Link>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Clickable navigation */}
            <div className="display-main-div-2">
              <p className="bold">Jump to section:</p>
              {displayedRecord.map((entry, index) => (
                <button key={index} className="simple-links" onClick={() => handleLinkClick(index)}>
                  <li>Recording #{totalRecords - index} {entry.title}</li>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Display;
