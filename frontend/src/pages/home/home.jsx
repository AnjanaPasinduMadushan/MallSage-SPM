import { useEffect } from "react"
import axios from 'axios'
axios.defaults.withCredentials = true;
import Header from "../../components/Headers/header";

const Home = () => {

  //Testing api call(line no 8 - 25)
  const userProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/User/profile', {
        withCredentials: true,
      })

      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userProfile();
  }, [])

  return (
    <>
      <Header />
      <center><h1>PLAY GROUND OF CUSTOMER</h1></center>
    </>
  )
}

export default Home