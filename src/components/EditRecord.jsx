import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EditRecord(props) {
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
    },[recordId, gotToken ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = { transcript, texts: texts };
        axios
            .put(`${API_URL}/auth/editRecord/${recordId}`, requestBody,{
                headers: { Authorization: `Bearer ${gotToken}` },
              })
            .then((response) => {
            window.alert('Text updated!');
            navigate(`/display`);
            });
    }
    
    const generateNewText = async () => {
      axios
          .get(`${API_URL}/auth/writeText/${recordId}`, {
              headers: { Authorization: `Bearer ${gotToken}` },
            })
          .then((response) => {
            setTexts((prevTexts) => [...prevTexts, response]);
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

                    {/* Edit written texts, if multiple */}
                    {texts.map((text, index) => (
                        <div className="edit-mini-div" key={index}>
                            <label  className="login-label">Written text {index + 1}:</label>
                            <textarea className="edit-record-input" type="text"
                            value={text.text}
                            onChange={(e) => {const updatedTexts = texts.map((textObj, idx) => idx === index ? { ...textObj, text: e.target.value } : textObj);
                            setTexts(updatedTexts)}}/>
                        </div>
                        ))}

          <div className="edit-buttons-div-row">
              <Link to={"/display"}><button className="blue-button" type="submit">Back</button></Link>
              <button className="blue-button" type="submit">Update</button>

         </div>   
        </form>
        <button className="blue-button" onClick={ generateNewText }>Generate another text from same prompt</button>
        
        </div>
            )}
      </>
    </Layout>
  )
}

export default EditRecord
