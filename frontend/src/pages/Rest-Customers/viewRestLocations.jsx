import Header from "../../components/Headers/header";
import ShowAllLocations from "../../components/RestLocation/showAllLocations"
import { useNavigate } from "react-router-dom"

const ViewRestLocations = () => {

  const navigate = useNavigate();

  const navigatePage = (locationName) => {
    navigate(`/Shopper/RestLocation/${locationName}`)
  }

  return (
    <>
      <Header />
      <ShowAllLocations handleOnClick={navigatePage} />
    </>
  )
}

export default ViewRestLocations