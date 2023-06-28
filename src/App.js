import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import AddRecord from "./components/AddRecord";
import PrivatePage from "./components/PrivatePage";
import RecordsPage from "./components/RecordsPage";
import Home from "./components/Home"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRecord" element={<AddRecord />} />
        <Route path="/recordsPage" element={<RecordsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <PrivatePage>
              <ProfilePage  />
              
            </PrivatePage>
          }
        />
         
      </Routes>
    </div>
  );
}

export default App;