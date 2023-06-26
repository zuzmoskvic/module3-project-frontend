import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddRecord() {
  const [task, setTask] = useState("");
  const [record, setRecord] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleTask = (e) => setTask(e.target.value);
  const handleRecord = (e) => setRecord(e.target.value);

  const handleAddRecord = (e) => {
    e.preventDefault();
    const requestBody = { task, record };

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
        <label>Task</label>
        <input type="text" name="task" value={task} onChange={handleTask} />

        <label>Record:</label>
        <input
          type="text"
          name="record"
          value={record}
          onChange={handleRecord}
        />

        <button type="submit">Submit your Record</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>
    
    </div>
  );
}

export default AddRecord;