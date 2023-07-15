import { useState, useEffect } from "react";
import axios from "axios";

function WritenTextPage() {
    const gotToken = localStorage.getItem("authToken");
    const [writtenText, setWrittenText] = useState("");
    const [fetching, setFetching] = useState(true);

    useEffect(() => {                               
    axios
        .get("http://localhost:5005/auth/write",
        {
            headers: { authorization: `Bearer ${gotToken}` }
          })
        .then((response) => {
            // console.log(response.data);
            const { text } = response.data;
            setWrittenText(text);  
            setFetching(false);
        });
    
    }, [] );

    return (
    <div>
        Written text:
        {fetching ? <p>Loading ...</p> : <p>{writtenText}</p>}
       

    </div>
    )
    }

    export default WritenTextPage;

//     function ParentComponent() {
//         return (
//           <div>
//             {/* Other content */}
//             <WritenTextPage />
  
            
//           </div>
//         );
//       }
      
// export default ParentComponent;


