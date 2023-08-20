import AdminHeader from "../../components/Headers/adminHeader";
import { useEffect } from "react"
import axios from 'axios'
axios.defaults.withCredentials = true;

export const AdminHome = () => {

  //Testing api call(line no 8 - 25)
  const userProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/profile", {
        withCredentials: true,
      })

      const data = res.data;
      console.log(data);
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
      <AdminHeader />
      <center><h1>PLAY GROUND OF ADMINISTRATION</h1></center>
    </>
  )
}
