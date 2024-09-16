import { useNavigate } from "react-router-dom"
import ShowAllLocations from "../../components/RestLocation/showAllLocations"
import { Button, Box } from "@mui/material";

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
      <Box display="flex" justifyContent="center" alignItems="center" gap={20} mt={2} style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Button onClick={handleNewLocation} variant="outlined" color='error'>
          NEW RESTING ZONE
        </Button>
        <Button onClick={handleGenerateReport} variant="outlined" color='error'>
          GENERATE REPORT
        </Button>
      </Box>
      <ShowAllLocations handleOnClick={navigatePage} />
    </>
  )
}

export default ShowRestLocations