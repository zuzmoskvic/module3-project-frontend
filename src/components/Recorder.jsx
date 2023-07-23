import axios from 'axios';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

function Recorder() {
    const recorderControls = useAudioRecorder();
    const navigate = useNavigate();

    const uploadAudioFile = async (blob) => {
      try {
        const gotToken = localStorage.getItem("authToken");
        const formData = new FormData();

        formData.append('audio', blob, 'recorded.wav');
        const response =  await axios.post('http://localhost:5005/auth/record',
          formData,
          {
            headers: { authorization: `Bearer ${gotToken}` },
          })
        // console.log('File uploaded successfully');
         const {data} = response;
        // console.log(response);
        navigate("/profile");
      } catch (error) {
        console.error('Error uploading file:', error);
      }
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);



    // // Select the existing div with class "audio-recorder"
    // const audioRecorderDiv = document.querySelector('.audio-recorder');

    // // Create a new <div> element
    // const newDiv = document.createElement('div');
    // newDiv.classList.add('new-audio-container'); // Optionally, you can add a class to the new <div> for styling purposes

    // // Append the audio element as a child to the new <div>
    // newDiv.appendChild(audio);

    // // Insert the new <div> as a sibling after the existing div with class "audio-recorder"
    // audioRecorderDiv.insertAdjacentElement('afterend', newDiv);

    // Call the function to upload the audio file to the backend
    uploadAudioFile(blob);
  };

  return (
    <Layout>
    <div>
      <div>
      <AudioRecorder 
        onRecordingComplete={(blob)  => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      {/* <button onClick={recorderControls.stopRecording}>Stop recording</button> */}
    </div>
    </div>
    </Layout>
  )
}

export default Recorder