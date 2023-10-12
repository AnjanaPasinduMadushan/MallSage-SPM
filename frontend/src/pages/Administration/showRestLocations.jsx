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

  return (
    <>
      <Button onClick={handleGenerateReport}> Genarate Report</Button>
      <ShowAllLocations handleOnClick={navigatePage} />
    </>
  )
}

export default ShowRestLocations