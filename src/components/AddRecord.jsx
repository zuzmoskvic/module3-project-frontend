import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddRecord() {
  const [title, setTitle] = useState("");
  const [recordPath, setRecordPath] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleTitle = (e) => setTitle(e.target.value);
  const handleRecordPath = (e) => setRecordPath(e.target.value);

  const handleAddRecord = (e) => {
    e.preventDefault();
    const requestBody = { title, recordPath };

    axios
      .post(`http://localhost:5005/auth/addRecord`, requestBody)
      .then(() => {
        navigate("/recordsPage", { state: { requestBody } });
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
      
  };

  return (
    <div >
      <h1>Add Record</h1>

      <form onSubmit={handleAddRecord}>
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />

        <label>Record:</label>
        <input
          type="file"
          name="recordPath"
          accept="image/png, image/jpg"
          id="recordPath"
          value={recordPath}
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