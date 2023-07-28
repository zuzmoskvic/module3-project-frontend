import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditRecord(props) {
    const gotToken = localStorage.getItem("authToken");
    const [transcript, setTranscript] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const { recordId } = useParams();
    const navigate = useNavigate();
    console.log("recordId:", recordId);

    useEffect(()=> {
        axios
            .get(`${API_URL}/auth/record/${recordId}`,{
                headers: { Authorization: `Bearer ${gotToken}` },
              })
            .then((res)=> {
                console.log(res.data);
                console.log(res.data.transcript);
                setTranscript(res.data.transcript);
                setIsLoading(false);
            })
            .catch((err)=>console.log(err))
    },[recordId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = { transcript };
        axios
            .put(`${API_URL}/auth/edit/${recordId}`, requestBody,{
                headers: { Authorization: `Bearer ${gotToken}` },
              })
            .then((response) => {
            window.alert('Record updated!');
            navigate(`/display`)
            });
    }

  return (
    <Layout>
    
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : ( 
           
          <form onSubmit={handleSubmit}>
            
            <label>Transcript:</label>
            <input className="edit-record-input" type="text" name="transcript" value={transcript} onChange={(e) => setTranscript(e.target.value )}
            />

            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </Layout>
  )
}

export default EditRecord
