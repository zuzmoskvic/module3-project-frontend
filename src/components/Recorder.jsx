import axios from 'axios';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import Layout from "./Layout";

function Recorder() {
    const recorderControls = useAudioRecorder();

    const uploadAudioFile = async (blob) => {
      try {
        const gotToken = localStorage.getItem("authToken");
        const formData = new FormData();

        formData.append('audio', blob, 'recorded.wav');
        await axios.post('http://localhost:5005/auth/record',
          formData,
          {
            headers: { authorization: `Bearer ${gotToken}` },
          })
        console.log('File uploaded successfully');
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