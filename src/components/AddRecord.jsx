import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";
import MiniNavBar from "./MiniNavBar";

function AddRecord() {
  const gotToken = localStorage.getItem("authToken");
  const [title, setTitle] = useState("");
  const [recordPath, setRecordPath] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleTitle = (e) => setTitle(e.target.value);
  const handleRecordPath = (e) => setRecordPath(e.target.files[0]);

  const handleAddRecord = async (e) => {
    e.preventDefault();

    // Perform client-side validation for file format
    if (!recordPath || !recordPath.name.match(/\.(mp4|m4a|mp3|wav|mpeg)$/i)) {
      setErrorMessage(
        `Invalid file format. Please upload a mp4, m4a, mp3, wav or mpeg file.`
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("recordPath", recordPath);

    try {
      const response = await axios.post(`${API_URL}/auth/addRecord`, formData, {
        headers: { authorization: `Bearer ${gotToken}` },
      });
      const { recordId, text } = response.data;
      console.log("recordId", recordId);
      navigate(`/transcribe/${recordId}`, { state: text });
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <Layout>
      <MiniNavBar />
      <div className="LoginPage">
        <h1>Upload a recording</h1>

        <form
          className="login-form"
          onSubmit={handleAddRecord}
          encType="multipart/form-data"
        >
          <label className="login-label">Title</label>
          <input
            className="login-input"
            type="text"
            name="title"
            value={title}
            onChange={handleTitle}
          />

          <label className="login-label">Record</label>
          <input
            className="login-input"
            type="file"
            name="recordPath"
            id="recordPath"
            onChange={handleRecordPath}
          />

          <button className="pink-button" type="submit">Next </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </Layout>
  );
}

export default AddRecord;
