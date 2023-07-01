import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const { record } = response.data;
      const transcriptionId = response.data.transcriptionId;
      const generatedText = response.data.generatedText;

      // Handle the response data as needed
      console.log("Record:", record);
      console.log("Transcription ID:", transcriptionId);
      console.log("Generated Text:", generatedText);

      navigate("/recordsPage");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div>
      <h1>Add Record</h1>

      <form onSubmit={handleAddRecord} enctype="multipart/form-data">
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
    </div>
  );
}

export default AddRecord;
