import React, { useState } from "react";
import axios from "axios";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import MiniNavBar from "./MiniNavBar";
import { API_URL } from "../config/config.index";

function Recorder() {
  const recorderControls = useAudioRecorder();
  const navigate = useNavigate();
  const [recordedBlob, setRecordedBlob] = useState(null);

  const uploadAudioFile = async (blob) => {
    try {
      const gotToken = localStorage.getItem("authToken");
      const formData = new FormData();

      formData.append("audio", blob, "recorded.wav");
      const response = await axios.post(`${API_URL}/auth/record`, formData, {
        headers: { authorization: `Bearer ${gotToken}` },
      });
      navigate("/recordsPage");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const [isRecordingComplete, setRecordingComplete] = useState(false);

  const handleRecordingComplete = (blob) => {
    setRecordedBlob(blob);
    setRecordingComplete(true); // Set the state to indicate recording is complete
  };

  const handleUploadClick = () => {
    if (recordedBlob) {
      uploadAudioFile(recordedBlob);
    } else {
      console.log("No recorded audio to upload.");
    }
  };

  return (
    <Layout>
      <MiniNavBar />
      <div className="record-main-div">
        <h3 className="click-me-h3">Click me ↓ and tell me what to write: </h3>
        <div className="record-top-div">
          {!isRecordingComplete && (
            <div className="blob-div">
              <div className="audio-recorder">
                <AudioRecorder
                  onRecordingComplete={handleRecordingComplete}
                  recorderControls={recorderControls}
                />
              </div>
            </div>
          )}
          {recordedBlob && (
            <div className="record-middle-div">
              <audio
                className="recorded-audio"
                src={URL.createObjectURL(recordedBlob)}
                controls
              />
              <button className="pink-button" onClick={handleUploadClick}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Recorder;
