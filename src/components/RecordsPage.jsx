import React from "react";
import { useLocation } from "react-router-dom";

function RecordsPage() {
  const location = useLocation();
  const { requestBody } = location.state;

  return (
    <div>
      <h1>Records Page</h1>
      <p><strong>TASK: </strong>{requestBody.task}</p>
      <p><strong>RECORD: </strong>{requestBody.record}</p>
    </div>
  );
}

export default RecordsPage;