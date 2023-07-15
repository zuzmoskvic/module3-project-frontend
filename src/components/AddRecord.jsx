import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";

function AddRecord() {
  const gotToken = localStorage.getItem("authToken");
  const [title, setTitle] = useState("");
  const [recordPath, setRecordPath] = useState("");
  const [transcription, setTranscription] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleTitle = (e) => setTitle(e.target.value);
  const handleRecordPath = (e) => setRecordPath(e.target.files[0]);

  const handleAddRecord = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("recordPath", recordPath);

    try {
      const response = await axios.post(
        "http://localhost:5005/auth/addRecord",
        formData,
        {
          headers: { authorization: `Bearer ${gotToken}` },
        }
      );
      const {data} = response;

      // this should be set up with setTransription; add a promise here?
      navigate("/recordsPage", { state: data.text });

    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };


  return (
    <div>
      <h1>Add Record</h1>

      <form onSubmit={handleAddRecord} encType="multipart/form-data">
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />

        <label>Record:</label>
        <input
          type="file"
          name="recordPath"
          id="recordPath"
          onChange={handleRecordPath}
        />

        <button type="submit">Submit your Record</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <p>Already have an account?</p>

      <Link to="/transcribe"> <button> Transcribe local file</button></Link> 
    </div>
  );
}

export default AddRecord;
