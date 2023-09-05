import { useNavigate } from "react-router-dom"
import ShowAllLocations from "../../components/RestLocation/showAllLocations"

const ShowRestLocations = () => {

  const navigate = useNavigate();

  const navigatePage = (locationName) => {
    navigate(`/RestLocation/${locationName}`)
  }

  return (
    <><ShowAllLocations handleOnClick={navigatePage} /></>
  )
}

export default ShowRestLocations