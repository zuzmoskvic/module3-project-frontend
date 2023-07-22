import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddRecord from "./components/AddRecord";
import RecordsPage from "./components/RecordsPage"
import ProfilePage from "./components/ProfilePage";
import PrivatePage from "./components/PrivatePage";
import Transcribe from "./components/Transcribe";
import WritenTextPage from "./components/WritenTextPage";
import EditUser from "./components/EditUser";
import Home from "./components/Home"
import Recorder from "./components/Recorder";
import Display from "./components/Display";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addRecord"  element={<AddRecord />}/>
        <Route path="/transcribe"  element={<Transcribe />}/>
        <Route path="/recordsPage" element={<RecordsPage />} />
        <Route path="/write" element={<WritenTextPage />} />
        <Route path="/record" element={<Recorder />} />
        <Route path="/display" element={<Display />} />
        <Route path="/editUser/:userId" element={<EditUser />} />
       
        <Route
          path="/profile"
          element={
            <PrivatePage>
              <ProfilePage />
            </PrivatePage>
          }
        />
      </Routes>
    </div>
  );
}

export default App