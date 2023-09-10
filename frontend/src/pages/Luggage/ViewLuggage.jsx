import { Typography } from "@mui/material";
import ViewLuggageTable from "../../components/Table/ViewLuggageTable";

function ViewLuggage() {
  return (
    <div>
      <Typography variant="h1" gutterBottom style={{ fontSize: "24px", marginTop:"2%" }}>
        Your Available Baggage
      </Typography>
      <ViewLuggageTable />
    </div>
  );
}

export default ViewLuggage;
