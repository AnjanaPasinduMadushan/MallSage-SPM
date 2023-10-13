import { useNavigate } from "react-router-dom"
import ShowAllLocations from "../../components/RestLocation/showAllLocations"
import { Button } from "@mui/material";

const ShowRestLocations = () => {

  const navigate = useNavigate();

  const navigatePage = (locationId) => {
    navigate(`/RestLocation/${locationId}`)
  }

  const handleGenerateReport = () => {
    navigate('/resting-report');
  };

  const handleNewLocation = () => {
    navigate('/admin/addRestLocation');
  };

  return (
    <>
      <Button onClick={handleNewLocation} variant="outlined">ADD A NEW RESTING LOCATION</Button>
      <Button onClick={handleGenerateReport} variant="outlined" color="info"> Genarate Report</Button>
      <ShowAllLocations handleOnClick={navigatePage} />
    </>
  )
}

export default ShowRestLocations