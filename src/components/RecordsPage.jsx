import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

const RecordPage = () => {
  const location = useLocation();
  const transcription = location.state;

  const [text, setText] = useState("");
  const [fetching, setFetching] = useState(true);
  const { user } = useContext(AuthContext);
 
  return (
    <div>
    <p> This is the transcription:  </p>
    <p> {transcription} </p>
    <Link to="/write"> <button> Write me something </button></Link> 
  </div>
  )
};

export default RecordPage;