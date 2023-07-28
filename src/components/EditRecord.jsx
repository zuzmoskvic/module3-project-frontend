import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditRecord(props) {
    const gotToken = localStorage.getItem("authToken");
    const [transcript, setTranscript] = useState("");
    const [texts, setTexts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { recordId } = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        axios
            .get(`${API_URL}/auth/record/${recordId}`,{
                headers: { Authorization: `Bearer ${gotToken}` },
              })
            .then((res)=> {
                console.log(res.data);
                console.log(res.data.writtenText); 
                setTranscript(res.data.transcript);
                setTexts(res.data.writtenText);
                setIsLoading(false);
            })
            .catch((err)=>console.log(err))
    },[recordId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = { transcript, texts: texts };
        console.log("requestBody", requestBody);
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
            <input className="edit-record-input" type="text" name="transcript" value={transcript} onChange={(e) => setTranscript(e.target.value )}/>

            {texts.map((text, index) => (
                <div key={index}>
                    <label>Written text {index + 1}:</label>
                    <input className="edit-record-input" type="text"
                    value={text.text}
                    onChange={(e) => {const updatedTexts = texts.map((textObj, idx) => idx === index ? { ...textObj, text: e.target.value } : textObj);
                    setTexts(updatedTexts)}}/>
                </div>
                ))}

            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </Layout>
  )
}

export default EditRecord
