import Layout from "./Layout";
import illustration from "../img/listening.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Layout>
        <div className="home-maindiv">
          <div className="home-leftdiv">
            <h1 className="home-h1">
              {" "}
              <img
                className="star"
                src="https://upload.wikimedia.org/wikipedia/commons/1/18/Four-point_star_%28fixed_width%29.svg"
                alt="four pointed star"
              />{" "}
              Generate Text from Speech
            </h1>
            
            <h2 className="home-h2">We listen and you tell us what to write</h2>
            <Link to="/signup">
              <button className="pink-button"> Get started</button>
            </Link>
          </div>

          <div className="home-rightdiv">
            <img
              className="illustration"
              src={illustration}
              alt="listener illustration"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
