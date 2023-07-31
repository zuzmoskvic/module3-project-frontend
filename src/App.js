import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddRecord from "./components/AddRecord";
import Transcript from "./components/Transcript"
import ProfilePage from "./components/ProfilePage";
import PrivatePage from "./components/PrivatePage";
import WritenTextPage from "./components/WritenTextPage";
import EditUser from "./components/EditUser";
import Home from "./components/Home"
import Recorder from "./components/Recorder";
import Display from "./components/Display";
import DeleteUser from "./components/DeleteUser";
import EditRecord from "./components/EditRecord";
import EditTranscript from "./components/EditTranscript";
import EditWritenText from "./components/EditWritenText";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/addRecord"  element={<AddRecord />}/>
        <Route path="/record" element={<Recorder />} />

        <Route path="/transcribe/:recordId" element={<Transcript />} />
        <Route path="/write/:recordId" element={<WritenTextPage />} />

        <Route path="/profile" element={<PrivatePage> <ProfilePage /></PrivatePage>}/> 
        <Route path="/display" element={<Display />} />

        <Route path="/editUser/:userId" element={<EditUser />} />
        <Route path="/deleteUser/:userId" element={<DeleteUser />} />

        {/* Editing operations  */}
        <Route path="/editRecord/:recordId" element={<EditRecord/>} />
        <Route path="/editTranscript/:recordId" element={<EditTranscript/>} />
        <Route path="/editWrittenText/:recordId" element={<EditWritenText />} />

      </Routes>
    </div>
  );
}

export default App