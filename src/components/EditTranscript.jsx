import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EditTranscript(props) {
    const gotToken = localStorage.getItem("authToken");
    const [transcript, setTranscript] = useState("");
    const [texts, setTexts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { recordId } = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        axios
            .get(`${API_URL}/auth/editRecord/${recordId}`,{
                headers: { Authorization: `Bearer ${gotToken}` },
              })
            .then((res)=> {
                setTranscript(res.data.transcript);
                setTexts(res.data.writtenText);
                setIsLoading(false);
            })
            .catch((err)=>console.log(err))
    },[recordId, gotToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = { transcript, texts: texts };
        axios
            .put(`${API_URL}/auth/editRecord/${recordId}`, requestBody,{
                headers: { Authorization: `Bearer ${gotToken}` },
              })
            .then((response) => {
            window.alert('Text updated!');
            navigate(`/write/${recordId}`);
            });
    }

  return (
    <Layout>
    
      <>
        {isLoading ? (
            <p>Loading...</p>          
        ) : (         
          <div className="main-edit-record-div">
                <form onSubmit={handleSubmit}>
                    {/* Edit transcript */}
                    <div className="edit-mini-div">
                        <label className="login-label">Transcript:</label>
                        <textarea className="edit-record-input" type="text" name="transcript" value={transcript} onChange={(e) => setTranscript(e.target.value)}  />
                    </div>

          <div className="edit-buttons-div-row">

              <button className="blue-button" type="submit">Change and write something</button>
              <Link to={`/transcribe/${recordId}`}><button className="blue-button" type="submit">Go back</button></Link>
         </div>   
        </form>

        
            </div>
            )}
      </>
    </Layout>
  )
}

export default EditTranscript 
