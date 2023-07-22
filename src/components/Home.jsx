import Layout from "./Layout"

function Home() {
  
  return (
    <div>
        <Layout>
        <div className="home-leftdiv">
          <h1 className="home-h1"> <img className="star" src="https://upload.wikimedia.org/wikipedia/commons/1/18/Four-point_star_%28fixed_width%29.svg" alt="four pointed star"/>   Generate Text from Speech</h1>
          <button>Get started</button>
        </div>

        </Layout>

    </div>
  )
}

export default Home